import React, { useState } from "react";
import "./UserDisplay.css";
import Avatar from "./Avatar";
import { timeSinceMoved } from "./Services/timeService";

export default function UserDisplay({ userInfoParse, time }) {
  if (userInfoParse) {
    const profilePic = userInfoParse ? userInfoParse.get("profilePicture") : null;
    const profilePicUrl = profilePic ? profilePic?.url?.() : null;

    const timeInCph = timeSinceMoved({user: userInfoParse})

    return (
      <div className="user_display">
        <Avatar
          alt={
            userInfoParse.get("firstName")
              ? userInfoParse.get("firstName")
              : "XX"
          }
          src={profilePicUrl}
        />
        <div className="column">
          <div className="row">
            <p className="username">
              {" "}
              {userInfoParse.get("firstName")
                ? userInfoParse.get("firstName")
                : "FirstName"}{" "}
              {userInfoParse ? userInfoParse.get("lastName") : "User name"}{" "}
            </p>
            <div className="tag"> {timeInCph} </div>{" "}
            {/* How long the user has lived in CPH */}
            {time && (<p className="subtle">• {time}</p>)} {/* Timestamp */}
          </div>

          <p className="subtle">
            {userInfoParse.get("occupation")
              ? userInfoParse.get("occupation")
              : "bio"}
          </p>
        </div>
      </div>
    );
  } 
}
