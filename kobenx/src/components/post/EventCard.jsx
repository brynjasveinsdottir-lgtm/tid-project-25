import React, { useState, useEffect } from "react";
import "./CardStyle.css";
import "../goingElement/GoingElement.css";

import MusicIcon from "@mui/icons-material/MusicNote";
import FoodIcon from "@mui/icons-material/Restaurant";
import SocialIcon from "@mui/icons-material/PeopleAlt";
import SportIcon from "@mui/icons-material/DirectionsRun";
import CultureIcon from "@mui/icons-material/TheaterComedy";
import OtherIcon from "@mui/icons-material/Event";
import GoingElement from "../goingElement/GoingElement.jsx";
import EventPl from "/src/assets/EventPl.png";
import EventSignupButton from "./EventSignupButton.jsx";
import { timeSincePost } from "../Services/timeService.js";
import { getSignups } from "../Services/getService.js";

const eventIcons = {
  Music: MusicIcon,
  Food: FoodIcon,
  Other: OtherIcon,
  Social: SocialIcon,
  Sport: SportIcon,
  Culture: CultureIcon,
};

export default function EventCard({ event }) {
  const timePost = timeSincePost({ post: event });

  const [signups, listSignups] = useState([]);

  async function fetchSignups() {
    const results = await getSignups({ post: event });
    listSignups(results);
  }

  useEffect(() => {
    fetchSignups();
  }, [event]);

  //Gets the three newest sign ups for the avatars
  const threeNewest = signups.slice(-3);

  // Get the url for the image
  const eventImage = event.get("image") ? event.get("image") : null;
  const eventImageUrl = eventImage ? eventImage.url() : EventPl;

  // Get the event icon based on which category it is
  const EventIcon = eventIcons[event.get("eventCategory")] || OtherIcon;

  // Structuring the eventTime for the event card
  const eventTime = `${event
    .get("eventTime")
    .toLocaleString("en-Gb", { weekday: "short" })}, ${event
    .get("eventTime")
    .toLocaleString("en-Gb", { day: "numeric", month: "short" })} at ${event
    .get("eventTime")
    .toLocaleString("en-Gb", {
      hour: "numeric",
      minute: "numeric",
    })}`;

  const signupCount = () => {
    const count = signups.length;

    if (count === 0) {
      return <p> 0 going </p>;
    } else if (count < 4) {
      return <p className="under3"> {`${count} going`} </p>;
    } else {
      return <p className="over3"> {`+${count - 3} going`} </p>;
    }
  };

  // Structuring the event card
  return (
    <article className="card event_card">
      <header className="event_card_header">
        <EventIcon
          fontSize="large"
          className={`event-icon ${event.get("eventCategory")}`}
        />
        <h1 className={`title ${event.get("eventCategory")}`}>
          {event.get("postTitle")}
        </h1>
      </header>
      <div className="date-signup">
        <p className="date_time"> {eventTime} </p>
        <EventSignupButton event={event} refreshSignups={fetchSignups} />
      </div>
      <p className="location"> {event.get("eventPlace")} </p>
      <img
        src={eventImageUrl ? eventImageUrl : EventPl}
        className="card_image"
      ></img>
      <div className="footer-container">
        <p className="post_info">
          {" "}
          Posted by @{event.get("author").get("username")} • {timePost}{" "}
        </p>
        <div className="going-container">
          <div className="picture-container">
            {threeNewest.map((going) => (
              <GoingElement key={going.id} going={going} />
            ))}
          </div>
          <div className="others-container">{signupCount()}</div>
        </div>
      </div>
    </article>
  );
}
