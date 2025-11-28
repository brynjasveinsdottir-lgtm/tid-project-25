import React from "react";
import {useEffect, useState} from 'react'
import Parse from "parse"
import EventCard from '/src/components/EventCard.jsx'
import '/src/assets/Manrope.ttf'
import '/src/index.css'
import './PageStyle.css'
import { getPosts } from "../components/Services/getService"

export default function Events() {

    const [posts, setPosts] = useState([]);
    // Get all posts that have category 'Event' from class 'Posts' in database using Parse
    useEffect(() => {
        async function fetchPosts() {
        const results = await getPosts({type:'Events'});
        setPosts(results);
        }
        fetchPosts();
    }, []);
    
    // Filter based on 'Music' and 'Food'. Will update to add more for more event categories.
    const music = posts.filter(event =>
        event.get("eventCategory") === 'Music'
    );
    const food = posts.filter(event =>
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