import React from "react";
import EventCard from '/src/components/EventCard.jsx'
import '/src/assets/Manrope.ttf'
import MusicEventIcon from "/src/assets/MusicEventIcon.png"
import FoodEventIcon from '/src/assets/FoodIcon.png'
import EventCardImage from "/src/assets/EventCardImage.png"
import '/src/index.css'



export default function Events() {

    const events = [{
        category: "music",
        name: "The Bird",
        date: "Thu, 9th Oct",
        time: "21:00",
        location: "Refshalevej 173, København K",
        user: "username",
        timeUploaded: "30m",
        icon: MusicEventIcon,
        image: EventCardImage,
        },
        {
        category: "food",
        name: "Street Food",
        date: "Thu, 9th Oct",
        time: "21:00",
        location: "Refshalevej 173, København K",
        user: "username",
        timeUploaded: "30m",
        icon: FoodEventIcon,
        image: EventCardImage,
        },
    ];

    return (
        <div className="events">
            <h2 className="page-titles">Events</h2>
            <div className='row'>
                {events.map((event, index) => (
                    <EventCard key = {index} event = {event} />
                ))}
            </div>
        </div>
    );
}