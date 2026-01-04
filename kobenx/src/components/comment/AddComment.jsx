import { useState } from "react";
import "./CommentStyle.css";

import TextField from "../textField/TextField.jsx";
import Button from "../button/Button.jsx";
import { addComment } from "../services/commentService.js";

export default function AddComment({ post, onCommentAdded }) {
  const [text, setText] = useState("");

  async function handleSubmit() {
    if (!text.trim()) return;

    try {
      const { comment, count } = await addComment({ post, text });
      setText("");
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
