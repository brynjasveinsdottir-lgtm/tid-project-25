import { useState } from "react";
import "./CardStyle.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import UserDisplay from "./UserDisplay";
import TextField from "./TextField";


function ThreadCard({ thread }) {

const [liked, setLiked] = useState(false);
const [showCommentBox, setShowCommentBox] = useState(false);
const [bookmarked, setBookmarked] = useState(false);
const [repostet, setRepostet] = useState(false);

const handleLike = () => setLiked(!liked);
const handleComment = () => setShowCommentBox(!showCommentBox);
const handleBookmark = () => setBookmarked(!bookmarked);
const handleRepost = () => setRepostet(!repostet);



  return (
    <article className="card">
        <UserDisplay userInfo={thread.author}/>
      <div className="threadContent">
        <p className="threadText">{thread.text}</p>
        </div>
      
     
      <div className="threadActions">

      {/* Like Button */}
      <button onClick={handleLike} className="likeButton">
      {liked? <FavoriteIcon /> : <FavoriteBorderIcon/>}
      </button>
      
      {/* Comment Button */}
      <button onClick={handleComment} className="commentButton">
      { <ModeCommentOutlinedIcon />}
      </button>

      {/* Bookmark Button */}
      <button onClick={handleBookmark} className="bookmarkButton">
      {bookmarked? <BookmarkOutlinedIcon /> : <BookmarkBorderOutlinedIcon/>}
      </button>

      {/* Repost Button */}
      <button onClick={handleRepost} className="repostButton">
      {<LoopOutlinedIcon />}
      </button>

      </div>

      {showCommentBox ? <TextField /> : null}
      
    </article>
  );
}

export default ThreadCard;