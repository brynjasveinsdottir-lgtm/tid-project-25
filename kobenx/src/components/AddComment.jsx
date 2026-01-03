import Parse from "parse";
import TextField from "./TextField";
import Button from "./Button";
import { getUserPublic } from "./Services/userService.js";
import { addComment } from "./Services/commentService.js";

import "./CommentStyle.css";
import { useState } from "react";

export default function AddComment({ post, onCommentAdded }) {
  const [text, setText] = useState("");
  const [showInput, setShowInput] = useState(false);

  async function handleSubmit() {
    if (!text.trim()) return;

    try {
      const { comment, count } = await addComment({ post, text });
      setText("");
      setShowInput(false);
      onCommentAdded?.(comment, count);
    } catch (error) {
      console.error("Failed to save comment:", error);
    }
  }

  return (
    <div className="comment-input-wrapper">
      <TextField
        placeholderText="Write a comment..."
        onChange={setText}
        value={text}
      />
      <Button
        className="submit-button"
        type="button"
        variant="primary"
        isRounded
        onClick={handleSubmit}
        disabled={!text.trim()}
      >
        Submit
      </Button>
    </div>
  );
}
