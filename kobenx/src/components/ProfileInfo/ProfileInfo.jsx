import React from "react";
import Avatar from "@mui/material/Avatar";
import "./ProfileInfo.css";

export default function ProfileInfo({userInfo}) {
    return (
      <div className="profile-info">
        <Avatar alt={userInfo.name} src={userInfo.image} />
        <div className="profile-text">
          <p className="profile-name">{userInfo.name}</p>
          <p className="profile-username">{userInfo.handle}</p>
        </div>
      </div>
    );
}