import React, { useState } from "react";
import "./UserDisplay.css";
import Avatar from "./Avatar";

export default function UserDisplay({ userInfoParse, time }) {
  if (userInfoParse) {
    const profilePic = userInfoParse ? userInfoParse.get("profilePicture") : null;
    const profilePicUrl = profilePic ? profilePic?.url?.() : null;

    //time since moved function
    const timeSinceMoved = () => {
      const movedDate = new Date(userInfoParse.get("dateMovedToCph"));
      const now = new Date();

      // Calculate differences
      const diffTime = now - movedDate;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      let value, unit;

      if (diffDays < 30) {
        value = diffDays;
        unit = "day";
      } else if (diffDays < 365) {
        value = Math.floor(diffDays / 30);
        unit = "month";
      } else {
        value = Math.floor(diffDays / 365);
        unit = "year";
      }

      const multiple = value !== 1 ? "s" : "";
      return `${value} ${unit}${multiple} in CPH`;
    };

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
            <div className="tag"> {timeSinceMoved()} </div>{" "}
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
