import React from "react";
import UserDisplay from "./UserDisplay";
import { timeSincePost } from "./Services/timeService";
import "./Comment.css";

export default function Comment({ comment }) {
    const author = comment.get("author");
    const timeComment = timeSincePost({post: comment})


    return (
        <div className="comment">
          <UserDisplay
          userInfoParse={author}
          time={timeComment}
           />
        
        <p className="comment-text">{comment.get("text")}</p>
        
    </div>
      );
    }