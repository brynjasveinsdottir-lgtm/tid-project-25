import React, { useState, useEffect } from "react";
import Parse from "parse";
import UserDisplay from "./UserDisplay";
import { getUserPublic } from "./Services/userService";
import "./CommentStyle.css";


export default function Comment({ comment, onCommentsUpdated }) {
  const author = comment.get("author");

  const authorId = author?.id || author?.objectId;
  const currentUserId = getUserPublic().id;
  const [isMine, setIsMine] = useState(false) 
 
  
  const canDelete = currentUserId && authorId && currentUserId === authorId;

  useEffect (() => {
  async function getUserItem () {
  
    const Comments = Parse.Object.extend ('Comments')
    const publicUser = await getUserPublic();
    const query = new Parse.Query(Comments)
    query.equalTo ('author', publicUser)
    query.equalTo ('objectId', comment.id)
    const canBeDeleted = await query.find()
    setIsMine(canBeDeleted.length > 0) 
  
  }
  

  getUserItem();
  }, [])

  const handleDelete = async () => {
    try {
      const commentObj = new Parse.Object("Comments");
      commentObj.set("objectId", object.id); // use object.id
      await commentObj.destroy();

      if (onCommentsUpdated) onCommentsUpdated(); // refresh list
      alert("Comment deleted!");
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert(`Error deleting comment: ${error.message}`);
    }
  };

  const timeUploaded = new Date(comment.createdAt).toLocaleString();

  console.log("Current user id:", currentUserId, "Author id:", authorId, "Can delete?", isMine);

  return (
    <div className="comment">
      <UserDisplay userInfoParse={author} time={timeUploaded} />

      <p className="comment-text">{comment.get("text")}</p>

      {isMine && <button onClick={handleDelete}>Delete</button>}
    </div>
  );
}
