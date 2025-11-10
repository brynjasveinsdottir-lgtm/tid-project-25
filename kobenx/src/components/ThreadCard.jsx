import { useState } from "react";
import { NavLink } from 'react-router-dom'
import "./CardStyle.css";
import UserDisplay from "./UserDisplay";
import TextField from "./TextField";
import './ProfileInfo/ProfileInfo.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';


function ThreadCard({ thread }) {

const [liked, setLiked] = useState(false);
const [showComment, setShowComment] = useState(false);
const [bookmarked, setBookmarked] = useState(false);
const [repostet, setRepostet] = useState(false);

const handleLike = () => setLiked(!liked);
const handleComment = () => setShowComment(!showComment);
const handleBookmark = () => setBookmarked(!bookmarked);
const handleRepost = () => setRepostet(!repostet);



  return (

    <article className="card">

        <UserDisplay userInfo={thread.author}/>
        
       <NavLink to="/profile" > 
      <div className="threadContent">
        <p className="threadText">{thread.text}</p>
        {thread.image && (
        <img src={thread.image} alt="Thread content" className="threadImage" />

)}
        </div>
        </NavLink>
     
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


      {showComment && (
  <div className="comments">
    <p className="comment">User: Looks great</p>
    <p className="comment">User: I was there too</p>

    {/* Comment input box */}
    <TextField /> 
  </div>
)}
  
    </article>
  
  );
}

export default ThreadCard;