import React, { useState } from "react";
import Parse from "parse";
import TextField from "./TextField";
import Button from "./Button";
import { getUserPublic } from "./Services/userService.js";

import "./AddComment.css";



export default function AddComment({ post, onCommentAdded }) {
    const [text, setText] = useState("");
  
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
    } catch (error) {
      console.error("Failed to save comment:", error);
      alert(error.message);
    }
  }

  
  return (
    <div className="add-comment">
      <TextField
        placeholderText="Write a comment..."
        onChange={setText}  
        value={text} 
      />

      <Button
        type="button"
        variant="primary"
        isRounded
        isBlock
        onClick={handleSubmit}
      >
        Add comment
      </Button>
    </div>
  );
}