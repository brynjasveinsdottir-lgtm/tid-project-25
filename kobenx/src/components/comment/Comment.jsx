import React, { useState, useEffect } from "react";
import "./CommentStyle.css";

import { getUserPublic } from "../services/userService.js";
import { timeSincePost } from "../services/timeService.js";
import { deleteComment } from "../services/commentService.js";

import UserDisplay from "../userDisplay/UserDisplay.jsx";
import Button from "../button/Button.jsx";

import CloseIcon from "@mui/icons-material/Close";

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
          className="delete-button" /* absolute positioning of the button*/
          type="button"
          size="sm"
          variant="destructiveGhost"
          isRounded
          onClick={handleDelete}
        >
          <CloseIcon />
        </Button>
      )}
    </div>
  );
}
