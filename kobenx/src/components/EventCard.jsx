import React, { useState } from "react"
import "./CardStyle.css"
import MusicIcon from '@mui/icons-material/MusicNote'
import FoodIcon from '@mui/icons-material/Restaurant'

const eventIcons = {
  Music: MusicIcon,
  Food: FoodIcon,
};

export default function EventCard({ event }) {

    // Get the url for the image
    const eventImage = event.get("image")
    const eventImageUrl = eventImage?.url?.()

    // Get the event icon based on which category it is
    const EventIcon = eventIcons[event.get('eventCategory')]

    // Structuring the eventTime for the event card
    const eventTime = `${event.get('eventTime').toLocaleString('en-Gb', {weekday:'short'})}, ${event.get('eventTime').toLocaleString('en-Gb', {day:'numeric', month:'short'})} at ${event.get('eventTime').toLocaleString('en-US', {hour:'numeric', minute:'numeric', hour12: false})}`

    // Calculating timeSincePosted for the event card and gives it a proper unit
    const timeSincePost = () => {
        const timeDiff = ((Date.now() - event.createdAt) / 1000)
        let value, unit

        if (timeDiff < 60) {
            value = Math.round((Date.now() - event.createdAt) / 1000)
            unit = 'second'
        } else if (timeDiff < 3600) {
            value = Math.round((Date.now() - event.createdAt) / (1000*60))
            unit = 'minute'
        } else if (timeDiff < 86400) {
            value = Math.round((Date.now() - event.createdAt) / (1000*60*60))
            unit = 'hour'
        } else if (timeDiff < 2629743) {
            value = Math.round((Date.now() - event.createdAt) / (1000*60*60*24))
            unit = 'day'
        } else {
            value = Math.round((Date.now() - event.createdAt) / (1000*60*60*24*30))
            unit = 'month'
        }
        const multiple = value > 1 ? 's' : ''
        return `${value} ${unit}${multiple} ago`
    }

    // Structuring the event card
    return (
        <article className="card event_card">
        <header className="event_card_header">
            <EventIcon fontSize='large' className={`event-icon ${event.get('eventCategory')}`} />
            <h1 className={`title ${event.get('eventCategory')}`}>{event.get('postTitle')}</h1>
        </header>
        <p className="date_time">
            {" "}
            {eventTime}{" "}
        </p>
        <p className="location"> {event.get('eventPlace')} </p>
        <img src={eventImageUrl} className="card_image"></img>
        <p className="post_info">
            {" "}
            Posted by @{event.get('author').get('username')} • {timeSincePost()}{" "}
        </p> 
        </article>
    );
}
