import React, { useState } from "react";
import Parse from "parse";
import TextField from "./TextField";
import Button from "./Button";
import { getUserPublic } from "./Services/userService.js";

import "./CommentStyle.css";

export default function AddComment({ post, onCommentAdded }) {
  const [text, setText] = useState("");
  const [showInput, setShowInput] = useState(false);

  async function handleSubmit() {
    if (!text.trim()) return;

    try {
      const userPublic = await getUserPublic();

      const Comment = Parse.Object.extend("Comments");
      const comment = new Comment();

      comment.set("text", text);
      comment.set("post", post);
      comment.set("author", userPublic);

      await comment.save();
      setText("");
      onCommentAdded?.();
      setShowInput(false);
    } catch (error) {
      console.error("Failed to save comment:", error);
      alert(error.message);
    }
  }

  return (
    <>
      {!showInput && (
        <Button
          type="button"
          variant="primary"
          isRounded
          isBlock
          onClick={() => setShowInput(true)}
        >
          Add Comment
        </Button>
      )}

      {showInput && (
        <>
          <TextField
            placeholderText="Write a comment..."
            onChange={setText}
            value={text}
          
          />

          <div className="comment-action-buttons">
            <Button
              type="button"
              variant="primary"
              isRounded
              onClick={handleSubmit}
            >
              Submit
            </Button>

            <Button
              type="button"
              variant="secondary"
              isRounded
              onClick={() => {
                setShowInput(false);
                setText("");
              }}
            >
              Cancel
            </Button>
          </div>
        </>
      )}
    </>
  );
}
