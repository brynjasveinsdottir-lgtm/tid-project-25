// using ThreadCard (and events) code as reference but creating a more generic post type that can support all types of posts
// also testing out props for threads

import React, { useState } from "react";
import "./CardStyle.css";

import MusicIcon from "@mui/icons-material/MusicNote";
import FoodIcon from "@mui/icons-material/Restaurant";
import UserDisplay from "./UserDisplay";
import PostInteractions from "./PostInteractions";

const eventIcons = {
  Music: MusicIcon,
  Food: FoodIcon,
};

export default function Post({ post }) {
  //variables

  const postImage = post.get("image") ? post.get("image") : null;
  const postImageUrl = postImage ? postImage.url() : null;

  const EventIcon = eventIcons[post.get("eventCategory")];

  const text = post.get("postText") ? post.get("postText") : "sorry no text";


  const [liked, setLiked] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [repostet, setRepostet] = useState(false);

  const handleLike = () => setLiked(!liked);
  const handleComment = () => setShowComment(!showComment);
  const handleBookmark = () => setBookmarked(!bookmarked);
  const handleRepost = () => setRepostet(!repostet);


  //functions
  const timeSincePost = () => {
    const timeDiff = (Date.now() - post.createdAt) / 1000;
    let value, unit;

    if (timeDiff < 60) {
      value = Math.round((Date.now() - post.createdAt) / 1000);
      unit = "second";
    } else if (timeDiff < 3600) {
      value = Math.round((Date.now() - post.createdAt) / (1000 * 60));
      unit = "minute";
    } else if (timeDiff < 86400) {
      value = Math.round((Date.now() - post.createdAt) / (1000 * 60 * 60));
      unit = "hour";
    } else if (timeDiff < 2629743) {
      value = Math.round((Date.now() - post.createdAt) / (1000 * 60 * 60 * 24));
      unit = "day";
    } else {
      value = Math.round(
        (Date.now() - post.createdAt) / (1000 * 60 * 60 * 24 * 30)
      );
      unit = "month";
    }
    const multiple = value > 1 ? "s" : "";
    return `${value} ${unit}${multiple} ago`;
  };

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
    .toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    })}`;

    return (
      <article className="card event_card2">
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
          Posted by @{post.get("author").get("username")} • {timeSincePost()}{" "}
        </p>
      </article>
    );
  }

  return (
    <article className="card">
      <UserDisplay userInfoParse={post.get("author")} time={timeSincePost()} />
      <p className="threadText">{text}</p>
      {postImageUrl && <img src={postImageUrl} className="card_image"></img>}

      <div className="PostInteractions">

      <PostInteractions
        liked={liked}
        bookmarked={bookmarked}
        repostet={repostet}
        onLike={handleLike}
        onComment={() => {
          handleComment();
          navigate("/threadOpen");
        }}
        onBookmark={handleBookmark}
        onRepost={handleRepost}
      />

      </div>
      
    </article>

    
  );
}
