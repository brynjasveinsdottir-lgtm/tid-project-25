// using ThreadCard (and events) code as reference but creating a more generic post type that can support all types of posts
// also testing out props for threads

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CardStyle.css";

import MusicIcon from "@mui/icons-material/MusicNote";
import FoodIcon from "@mui/icons-material/Restaurant";
import SocialIcon from "@mui/icons-material/PeopleAlt";
import SportIcon from "@mui/icons-material/DirectionsRun";
import CultureIcon from "@mui/icons-material/TheaterComedy";
import OtherIcon from "@mui/icons-material/Event";
import UserDisplay from "../userDisplay/UserDisplay.jsx";
import PostInteractions from "../postInteractions/PostInteractions.jsx";
import { timeSincePost } from "../Services/timeService.js";

import Button from "../button/Button.jsx";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { getUserPublic } from "../Services/userService.js";
import Parse, { setLocalDatastoreController } from "parse";
import Dialog from "../dialog/Dialog.jsx";
import EditPost from "../createPost/EditPost.jsx";

const eventIcons = {
  Music: MusicIcon,
  Food: FoodIcon,
  Social: SocialIcon,
  Sport: SportIcon,
  Culture: CultureIcon,
  Other: OtherIcon,
};

export default function Post({ post, onDeleted }) {
  //variables

  const postImage = post.get("image") ? post.get("image") : null;
  const postImageUrl = postImage ? postImage.url() : null;

  const EventIcon = eventIcons[post.get("eventCategory")]
    ? eventIcons[post.get("eventCategory")]
    : eventIcons["Other"];

  const text = post.get("postText") ? post.get("postText") : "sorry no text";

  const timePost = timeSincePost({ post: post });

  const [liked, setLiked] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [repostet, setRepostet] = useState(false);

  const handleLike = () => setLiked(!liked);
  const handleComment = () => setShowComment(!showComment);
  const handleBookmark = () => setBookmarked(!bookmarked);
  const handleRepost = () => setRepostet(!repostet);

  const navigate = useNavigate();

  //Get user item (reusing same code as in comment so lets move to service maybe)
  const [isMine, setIsMine] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false); // for testing edit dialog

  useEffect(() => {
    async function getUserItem() {
      const Post = Parse.Object.extend("Posts");
      const publicUser = await getUserPublic();
      const query = new Parse.Query(Post);
      query.equalTo("author", publicUser);
      query.equalTo("objectId", post.id);
      const isAuthor = await query.find();
      setIsMine(isAuthor.length > 0);
      console.log("isMine:", isMine);
    }

    getUserItem();
  }, []);

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
      <article className="card">
        <header className="event_card_header">
          <EventIcon
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

  return (
    <article
      className="card"
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
            {" "}
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
          bookmarked={bookmarked}
          repostet={repostet}
          onLike={(e) => {
            e.stopPropagation();
            handleLike();
          }}
          onBookmark={(e) => {
            e.stopPropagation();
            handleBookmark();
          }}
          onRepost={(e) => {
            e.stopPropagation();
            handleRepost();
          }}
          onComment={() => navigate(`/threadOpen/${post.id}`)}
        />
      </div>

      {/*EDIT DIALOG (should open over whole page*/}
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
