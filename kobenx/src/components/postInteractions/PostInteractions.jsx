import { useState, useEffect } from "react";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";

import "./PostInteractions.css";

import {
  toggleLike,
  getLikesCount,
  userHasLiked,
} from "../services/likeService.js";
import { getCommentsCount } from "../services/commentService.js";

export default function PostInteractions({ postId, onComment }) {
  const [liked, setLiked] = useState(false); // user liked?
  const [likesCount, setLikesCount] = useState(0); // total number of likes
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    async function loadCounts() {
      if (!postId) return;

      const hasLiked = await userHasLiked(postId);
      const likeCount = await getLikesCount(postId);
      const commentCount = await getCommentsCount(postId);

      setLiked(hasLiked);
      setLikesCount(likeCount);
      setCommentsCount(commentCount);
    }

    loadCounts();
  }, [postId]);

  async function handleLike() {
    // UI update without waiting DB
    setLiked((prev) => !prev);

    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));

    await toggleLike(postId);
  }

  return (
    <div className="PostInteractions">
      {/* wrapper icon + number */}
      <span className="likeWrapper">
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevents redirect to ThreadsOpen page
            handleLike();
          }}
          className="likeButton"
        >
          {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </button>

        {likesCount > 0 && <span className="likesCount">{likesCount}</span>}
      </span>
      <span className="commentWrapper">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onComment();
          }}
          className="commentButton"
        >
          <ModeCommentOutlinedIcon />
        </button>
        {commentsCount > 0 && (
          <span className="commentsCount">{commentsCount}</span>
        )}
      </span>
    </div>
  );
}
