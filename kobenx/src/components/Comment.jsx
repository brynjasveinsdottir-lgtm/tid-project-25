import React, { useState, useEffect } from "react";
import Parse from "parse";
import UserDisplay from "./UserDisplay";
import { getUserPublic } from "./Services/userService";
import { timeSincePost } from "./Services/timeService.js";
import { deleteComment } from "./Services/commentService.js";

import "./CommentStyle.css";
import Button from "./Button";

export default function Comment({ comment, onCommentsUpdated }) {
  const author = comment.get("author");
  const [isMine, setIsMine] = useState(false);
  const timeComment = timeSincePost({ post: comment });

  useEffect(() => {
    async function checkOwnership() {
      const user = await getUserPublic();
      setIsMine(user.id === comment.get("author")?.id);
    } //compare ID without sending a parse query
    checkOwnership();
  }, [comment]);

  const handleDelete = async () => {
    try {
      const newCount = await deleteComment(comment.id, comment.get("post")?.id);
      onCommentsUpdated?.(comment.id, newCount);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="comment">
      <UserDisplay userInfoParse={author} time={timeComment} />

      <p className="comment-text">{comment.get("text")}</p>

      {isMine && (
        <Button
          className="delete-button"
          type="button"
          variant="secondary"
          isRounded
          onClick={handleDelete}
        >
          X
        </Button>
      )}
    </div>
  );
}
