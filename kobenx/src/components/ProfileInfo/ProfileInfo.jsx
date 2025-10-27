import React from "react";
import Avatar from "@mui/material/Avatar";
import "./ProfileInfo.css";

const ProfileInfo = ({ name, username, avatar }) => {
  return (
    <div className="profile-info">
      <Avatar alt={name} src={avatar} />
      <div className="profile-text">
        <p className="profile-name">{name}</p>
        <p className="profile-username">@{username}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;