import { useState } from "react";
import "./CardStyle.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import UserDisplay from "./UserDisplay";


function ThreadCard({ thread }) {

const [liked, setLiked] = useState(false);
const [bookmarked, setBookmarked] = useState(false);
const [repostet, setRepostet] = useState(false);

const handleLike = () => setLiked(!liked);
const handleBookmark = () => setBookmarked(!bookmarked);
const handleRepost = () => setRepostet(!repostet);



  return (
    <article className="card">
        <UserDisplay userInfo={thread.author}/>
      <div className="threadContent">
        <p className="threadText">{thread.text}</p>
        </div>
      
      {/* Like Button */}
      <div className="threadActions">
      <button onClick={handleLike} className="likeButton">
      {liked? <FavoriteIcon color="error" /> : <FavoriteBorderIcon/>}
      </button>
      
      {/* Bookmark Button */}
      <button onClick={handleBookmark} className="bookmarkButton">
      {bookmarked? <BookmarkOutlinedIcon color="error" /> : <BookmarkBorderOutlinedIcon/>}
      </button>

      {/* Repost Button */}
      <button onClick={handleRepost} className="repostButton">
     {repostet ? <LoopOutlinedIcon sx={{ color: "#444" }} /> : <LoopOutlinedIcon sx={{ color: "#e53935" }} />}
      </button>


      </div>

    </article>
  );
}

export default ThreadCard;