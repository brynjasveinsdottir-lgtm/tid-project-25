import React, { useState, useEffect } from "react"
import "./CardStyle.css"
import MusicIcon from '@mui/icons-material/MusicNote'
import FoodIcon from '@mui/icons-material/Restaurant'
import GoingElement from "./GoingElement"
import '../components/GoingElement.css'
import Parse from "parse";
import Food0 from '/src/assets/Food0.png'
import Food1 from '/src/assets/Food1.png'
import Food2 from '/src/assets/Food2.png'
import Music0 from '/src/assets/Music0.png'
import Music1 from '/src/assets/Music1.png'
import Music2 from '/src/assets/Music2.png'


const eventIcons = {
  Music: MusicIcon,
  Food: FoodIcon,
};

const plImages ={
    Food0,
    Food1,
    Food2,
    Music0,
    Music1,
    Music2
}

export default function EventCard({ event }) {
    
  const [signups, listSignups] = useState([]);

  useEffect(() => {
    async function getSignups() {
      const Signups = Parse.Object.extend("Signups");
      const query = new Parse.Query(Signups);
      query.equalTo("post", event);
      query.include("user");
      const results = await query.find();
      const count = await query.count()
      listSignups(results);
    }
    getSignups();
  }, []);

  const eventImagePl = `${event.get('eventCategory')}${Math.floor(Math.random()*3)}`
  const plEventImg = plImages[eventImagePl]

  //Gets the three newest sign ups for the avatars
  const threeNewest = signups.slice(-3)

  // Get the url for the image
  // Make a placeholder image
  const eventImage = event.get("image") ? event.get("image") : null;
  const eventImageUrl = eventImage ? eventImage.url() : plEventImg;

  // Get the event icon based on which category it is
  const EventIcon = eventIcons[event.get("eventCategory")];

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

  // Calculating timeSincePosted for the event card and gives it a proper unit
  /*
    const timeSincePost = () => {
        const timeDiff = (Date.now() - event.createdAt) / 1000;
        let value, unit;

        if (timeDiff < 60) {
        value = Math.round((Date.now() - event.createdAt) / 1000);
        unit = "second";
        } else if (timeDiff < 3600) {
        value = Math.round((Date.now() - event.createdAt) / (1000 * 60));
        unit = "minute";
        } else if (timeDiff < 86400) {
        value = Math.round((Date.now() - event.createdAt) / (1000 * 60 * 60));
        unit = "hour";
        } else if (timeDiff < 2629743) {
        value = Math.round(
            (Date.now() - event.createdAt) / (1000 * 60 * 60 * 24)
        );
        unit = "day";
        } else {
        value = Math.round(
            (Date.now() - event.createdAt) / (1000 * 60 * 60 * 24 * 30)
        );
        unit = "month";
        }
        const multiple = value > 1 ? "s" : "";
        return `${value} ${unit}${multiple} ago`;
    };
    */

    const timeSincePost = () => {
        const timeDiff = (Date.now() - event.createdAt) / 1000;
        let value, unit;

        if (timeDiff < 60) {
        value = Math.round((Date.now() - event.createdAt) / 1000);
        unit = "s";
        } else if (timeDiff < 3600) {
        value = Math.round((Date.now() - event.createdAt) / (1000 * 60));
        unit = "m";
        } else if (timeDiff < 86400) {
        value = Math.round((Date.now() - event.createdAt) / (1000 * 60 * 60));
        unit = "h";
        } else {
        value = event.get('eventTime').toLocaleString("en-Gb", { day: "numeric", month: "short" })
        unit = ''
        }

        return `${value}${unit}`;
    };

    const signupCount = () => {
        const count = signups.length

        if (count === 0) {
            return <p className="others-container"> 0 going </p>
        } else if (count < 4) {
            return <p className="others-container under3"> {`${count} going`} </p>
        } else {
            return <p className="others-container over3"> {`+${count - 3} going`} </p>
        }
    }

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
        <p className="date_time"> {eventTime} </p>
        <p className="location"> {event.get("eventPlace")} </p>
        <img src={eventImageUrl} className="card_image"></img>
        <div className="footer-container">
            <p className="post_info">
                {" "}
                Posted by @{event.get("author").get("username")} • {timeSincePost()}{" "}
            </p>
            <div className="going-container">
                <div className="picture-container">
                    {threeNewest.map((going) => (
                    <GoingElement
                        key={going.id}
                        going={going}
                    />
                    ))}
                </div>
                <div className="others-container">
                    {signupCount()}
                </div>
            </div>
        </div>
    </article>
  );
}
