// using ThreadCard (and events) code as reference but creating a more generic post type that can support all types of posts
// also testing out props for threads

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CardStyle.css";

import MusicIcon from "@mui/icons-material/MusicNote";
import FoodIcon from "@mui/icons-material/Restaurant";
import EventIcon from "@mui/icons-material/Event";
import UserDisplay from "./UserDisplay";
import PostInteractions from "./PostInteractions";
import { timeSincePost } from "./Services/timeService";

const eventIcons = {
  Music: MusicIcon,
  Food: FoodIcon,
  Other: EventIcon,
};

export default function Post({ post }) {
  //variables

  const postImage = post.get("image") ? post.get("image") : null;
  const postImageUrl = postImage ? postImage.url() : null;

  const EventIcon = eventIcons[post.get("eventCategory")?post.get("eventCategory"):"Other"];

  const text = post.get("postText") ? post.get("postText") : "sorry no text";
  
  const timePost = timeSincePost({post: post})

  const [liked, setLiked] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [repostet, setRepostet] = useState(false);

  const handleLike = () => setLiked(!liked);
  const handleComment = () => setShowComment(!showComment);
  const handleBookmark = () => setBookmarked(!bookmarked);
  const handleRepost = () => setRepostet(!repostet);

  const navigate = useNavigate();

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
        minute: "numeric"
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
          Posted by @{post.get("author").get("username")} • {timePost}{" "}
        </p>
      </article>
    );
  }

  return (
    <article className="card"onClick={() => navigate(`/threadOpen/${post.id}`)}>
      <UserDisplay userInfoParse={post.get("author")} time={timePost} />
      <p className="threadText">{text}</p>
      {postImageUrl && <img src={postImageUrl} className="card_image"></img>}

      <div className="PostInteractions">


      <PostInteractions
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

    </article>

    
  );
}
