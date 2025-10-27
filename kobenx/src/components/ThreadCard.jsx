import React from "react";
import "./CardStyle.css";
import Ellipse from "/src/assets/Ellipse.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function ThreadCard({ username, bio, text, timestamp }) {
  return (
    <article className="card">
      <header className="usercontainer">
        <div className="userIcon">
          <AccountCircleIcon fontSize="large" />
        </div>
        <div className="userInfo">
          <div className="usernameRow">
            <span className="username">{username}</span>
            <img src={Ellipse} className="ellipse"/>
            <span className="timestamp">{timestamp}</span>
          </div>
          <p className="bio">{bio}</p>
        </div>
      </header>

      <div className="threadContent">
        <p className="thread_text">{text}</p>
      </div>
    </article>
  );
}

export default ThreadCard;
