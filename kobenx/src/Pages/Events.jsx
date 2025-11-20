import React from "react";
import {useEffect, useState} from 'react'
import Parse from "parse"
import EventCard from '/src/components/EventCard.jsx'
import '/src/assets/Manrope.ttf'
import '/src/index.css'
import './PageStyle.css'

export default function Events() {

    const [events, listEvents] = useState([])

    // Get all posts that have category 'Event' from class 'Posts' in database using Parse
    useEffect(() => {
        async function getPosts() {
            const Posts = Parse.Object.extend("Posts");
            const query = new Parse.Query(Posts);
            query.equalTo("category", "Event");
            query.greaterThanOrEqualTo('eventTime', new Date())
            query.include("author");
            query.ascending('eventTime')
            const results = await query.find();
            listEvents(results)
        }
        getPosts()
    }, [])
    
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