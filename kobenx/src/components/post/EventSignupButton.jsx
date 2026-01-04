import React, { useState, useEffect } from "react";
import Parse from "parse";
import "./CardStyle.css";

import { getUserPublic } from "../services/userService.js";

import Button from "../button/Button.jsx";

export default function EventSignupButton({ event, refreshSignups }) {
  const [isSignedUp, setIsSignedUp] = useState(false);

  useEffect(() => {
    async function getUserSignups() {
      const Signups = Parse.Object.extend("Signups");
      const publicUser = await getUserPublic();
      const query = new Parse.Query(Signups);
      query.equalTo("user", publicUser);
      query.equalTo("post", event);
      const signupItem = await query.find();
      setIsSignedUp(signupItem.length > 0);
    }

    getUserSignups();
  }, []);

  async function eventSignup() {
    const Signups = Parse.Object.extend("Signups");
    const publicUser = await getUserPublic();

    if (isSignedUp === false) {
      const newSignup = new Signups();
      newSignup.set("user", publicUser);
      newSignup.set("post", event);

      await newSignup.save();
      refreshSignups();
      setIsSignedUp(true);
    } else {
      const query = new Parse.Query(Signups);
      query.equalTo("user", publicUser);
      query.equalTo("post", event);
      const signupItem = await query.first();
      await signupItem.destroy();
      refreshSignups();
      setIsSignedUp(false);
    }
  }

  return (
    <Button
      variant="primary"
      isSelected={isSignedUp}
      isRounded={true}
      className="event-signup-button"
      onClick={eventSignup}
    >
      {isSignedUp ? "Signed up" : "Sign up"}
    </Button>
  );
}
