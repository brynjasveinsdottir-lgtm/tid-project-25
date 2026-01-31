import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CardStyle.css";

import { timeSincePost } from "../services/timeService.js";

import UserDisplay from "../userDisplay/UserDisplay.jsx";
import PostInteractions from "../postInteractions/PostInteractions.jsx";
import Button from "../button/Button.jsx";
import Dialog from "../dialog/Dialog.jsx";
import EditPost from "../createPost/EditPost.jsx";

import EditNoteIcon from "@mui/icons-material/EditNote";

import MusicIcon from "@mui/icons-material/MusicNote";
import FoodIcon from "@mui/icons-material/Restaurant";
import SocialIcon from "@mui/icons-material/PeopleAlt";
import SportIcon from "@mui/icons-material/DirectionsRun";
import CultureIcon from "@mui/icons-material/TheaterComedy";
import OtherIcon from "@mui/icons-material/Event";

const eventCategoryIcons = {
  Music: MusicIcon,
  Food: FoodIcon,
  Other: OtherIcon,
  Social: SocialIcon,
  Sport: SportIcon,
  Culture: CultureIcon,
};

export default function Post({ post, onDeleted, currentUser }) {
  //variables
  const postImage = post.get("image") ? post.get("image") : null;
  const postImageUrl = postImage ? postImage.url() : null;

  const EventCategoryIcon = eventCategoryIcons[post.get("eventCategory")]
    ? eventCategoryIcons[post.get("eventCategory")]
    : eventCategoryIcons["Other"];

  const text = post.get("postText") ? post.get("postText") : "sorry no text";

  const timePost = timeSincePost({ post: post });

  const [liked, setLiked] = useState(false);
  const handleLike = () => setLiked(!liked);

  const [openDialogEdit, setOpenDialogEdit] = useState(false); // for edit dialog

  const navigate = useNavigate();

  //check if the user is the post author
  const [isMine, setIsMine] = useState(false);
  useEffect(() => {
    setIsMine(currentUser === post.get("author")?.id);
  }, [post]);

  //return statements
  //for event posts
  if (post.get("category") === "Event") {
    // Structuring the eventTime for the event card
    const eventTime = `${post
      .get("eventTime")
      .toLocaleString("en-Gb", { weekday: "short" })}, ${post
      .get("eventTime")
      .toLocaleString("en-Gb", { day: "numeric", month: "short" })} at ${post
      .get("eventTime")
      .toLocaleString("en-Gb", {
        hour: "numeric",
        minute: "numeric",
      })}`;

    return (
      <article className="card home">
        <header className="event_card_header">
          <EventCategoryIcon
            fontSize="large"
            className={`event-icon ${post.get("eventCategory")}`}
          />
          <h1 className={`title ${post.get("eventCategory")}`}>
            {post.get("postTitle")}
          </h1>
        </header>
        <p className="date_time"> {eventTime} </p>
        <p className="location"> {post.get("eventPlace")} </p>
        {postImageUrl && <img src={postImageUrl} className="card_image"></img>}
        <p className="post_info">
          {" "}
          Posted by @{post.get("author").get("username")} • {timePost}{" "}
        </p>
      </article>
    );
  }
  //otherwise return normal post (for threads)
  return (
    <article
      className="card home"
      onClick={() => navigate(`/threadOpen/${post.id}`)}
    >
      <div className="thread-header">
        <UserDisplay userInfoParse={post.get("author")} time={timePost} />
        {isMine && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setOpenDialogEdit(true);
            }}
            variant="secondary"
            size="sm"
          >
            <EditNoteIcon /> Edit post
          </Button>
        )}
      </div>
      <p className="thread-text">{text}</p>
      {postImageUrl && <img src={postImageUrl} className="card_image"></img>}

      <div className="PostInteractions">
        <PostInteractions
          postId={post.id}
          liked={liked}
          onLike={(e) => {
            e.stopPropagation();
            handleLike();
          }}
          onComment={() => navigate(`/threadOpen/${post.id}`)}
        />
      </div>

      {/*EDIT DIALOG*/}
      <Dialog
        isOpen={openDialogEdit}
        isDismissible
        title="Edit post"
        onClose={() => {
          setOpenDialogEdit(false);
        }}
      >
        <EditPost
          post={post}
          onDeleted={() => {
            onDeleted?.(post.id); // remove from UI list
            setOpenDialogEdit(false); // close dialog
          }}
          onClose={() => setOpenDialogEdit(false)}
        />
      </Dialog>
    </article>
  );
}
