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
