import React, { useState, useEffect } from "react";
import Parse from "parse";
import UserDisplay from "./UserDisplay";
import { getUserPublic } from "./Services/userService";
import { timeSincePost } from "./Services/timeService"
import "./CommentStyle.css";


export default function Comment({ comment, onCommentsUpdated }) {
  const author = comment.get("author");

  const authorId = author?.id || author?.objectId;
  const currentUserId = getUserPublic().id;
  const [isMine, setIsMine] = useState(false) 

  const timeComment = timeSincePost({post: comment})
 
  useEffect(() => {
    async function checkOwnership() {
      const user = await getUserPublic();
      setIsMine(user.id === comment.get("author")?.id); 
    } //compare ID without sending a parse query
    checkOwnership(); 
  }, [comment]);
  

  const handleDelete = async () => {
    try {
      await comment.destroy();
      onCommentsUpdated?.(comment.id); 
    } catch (error) {
      console.error("Error deleting comment:", error);
      
    }
  };


  console.log("Current user id:", currentUserId, "Author id:", authorId, "Can delete?", isMine);

  console.log("DELETE USING ID:", comment.id,)
  console.log("REFETCHING COMMENTS...");

  

  return (
    <div className="comment">
      <UserDisplay userInfoParse={author} time={timeComment} />

      <p className="comment-text">{comment.get("text")}</p>

      {isMine && <button onClick={handleDelete}>Delete</button>}
    </div>

    
  );
}
