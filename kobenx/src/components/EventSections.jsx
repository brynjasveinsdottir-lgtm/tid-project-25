import React from "react";
import {useEffect, useState} from 'react'
import Parse from "parse"
import EventCard from '/src/components/EventCard.jsx'
import '/src/assets/Manrope.ttf'
import '/src/index.css'
import './PageStyle.css'

export default function EventSection() {
    
    // Filter based on 'Music' and 'Food'. Will update to add more for more event categories.
    const music = events.filter(event =>
        event.get("eventCategory") === 'Music'
    );
    const food = events.filter(event =>
        event.get("eventCategory") === 'Food'
    );

    // Structuring the events page
    // Remove individual categories
    return (
        <div className="page-structure">
            <h1 className="page-title">Events</h1>
            <h2 className="category-header">
                Music
            </h2>
            <div className='category-row'>
                <div className='event-row'>
                    {music.map((post) => (
                        <EventCard key = {post.id} event = {post} />
                    ))}
                </div>
            </div>
           <h2 className="category-header">
                Food
            </h2>
            <div className='category-row'>
                <div className='event-row'>
                    {food.map((post) => (
                        <EventCard key = {post.id} event = {post} />
                    ))}
                </div>
            </div>
        </div>
    );
}