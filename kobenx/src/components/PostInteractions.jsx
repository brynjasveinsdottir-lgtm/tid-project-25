import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import './PostInteractions.css';

export default function PostInteractions ({

liked,
bookmarked,
reposted,
onLike,
onComment,
onBookmark,
onRepost

}) {
    return (
      <div className="PostInteractions">
  
        <button onClick={onLike} className="likeButton">
          {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </button>
  
        <button onClick={onComment} className="commentButton">
          <ModeCommentOutlinedIcon />
        </button>
  
        <button onClick={onBookmark} className="bookmarkButton">
          {bookmarked ? <BookmarkOutlinedIcon /> : <BookmarkBorderOutlinedIcon />}
        </button>
  
        <button onClick={onRepost} className="repostButton">
          <LoopOutlinedIcon />
        </button>
  
      </div>
    );
  }