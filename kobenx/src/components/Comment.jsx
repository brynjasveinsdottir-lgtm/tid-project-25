import React from "react";
import UserDisplay from "./UserDisplay";

import "./Comment.css";

export default function Comment({ comment }) {
    const author = comment.get("author");

  // For timestamp of the comment
  const timeUploaded = new Date(comment.createdAt).toLocaleString();


    return (
        <div className="comment">
          <div className="comment-header">
          <UserDisplay
          userInfoParse={author}
          time={timeUploaded}
           />
        </div>
          <p className="comment-text">{comment.get("text")}</p>

        </div>
      );
    }