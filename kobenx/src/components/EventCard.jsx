import React, {useState, usestate} from 'react'
import "./CardStyle.css"
import Ellipse from "/src/assets/Ellipse.png"

export default function EventCard({event}) {


        return (
            <article className="card event_card">
                <header className="header">
                    <img src={event.icon} className="event_icon" alt="Music event icon"/>
                    <h1 className={`title ${event.category}`}>{event.name}</h1>
                </header>
                
                <div className="date_time_div">
                    <p className="date_time"> {event.date} at {event.time} </p>
                </div>

                <div className="location_div">
                    <p className="location"> {event.location} </p>
                </div>

                <div>
                    <img src={event.image} className="card_image"></img>
                </div>

                <footer className="footer">
                    <p className="post_info"> Posted by @{event.user} • {event.timeUploaded} </p>
                </footer>
            </article>
        )
}