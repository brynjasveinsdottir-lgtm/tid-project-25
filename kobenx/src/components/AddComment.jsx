import React, { useState } from "react";
import Parse from "parse";
import TextField from "./TextField";


export default function AddComment({ post, onCommentAdded }) {
    const [text, setText] = useState("");
  
    async function handleSubmit() {
      if (!text.trim()) return;

      const user = Parse.User.current();
      if (!user) return alert("You must be logged in to comment.");
  
      const Comment = Parse.Object.extend("Comments");
      const comment = new Comment();
  
      comment.set("text", text);
      comment.set("post", post);
      comment.set("authorUser", Parse.User.current());
  
      await comment.save();
  
      setText("");
      onCommentAdded?.();
    }
  
    return (
      <div className="add-comment">
        <TextField
          placeholderText="Write a comment..."
          onChange={setText}
        />
  
        <button className="comment-btn" onClick={handleSubmit}>
          Comment
        </button>
      </div>
    );
  }