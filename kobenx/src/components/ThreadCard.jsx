import React from "react";
import "./CardStyle.css";
import Ellipse from "/src/assets/Ellipse.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserDisplay from "./UserDisplay";

function ThreadCard({ thread }) {
  return (
    <article className="card">
        <UserDisplay userInfo={thread.author}/>
      <div className="threadContent">
        <p className="thread_text">{thread.text}</p>
      </div>
    </article>
  );
}

export default ThreadCard;