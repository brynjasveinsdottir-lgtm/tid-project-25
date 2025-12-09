import React from "react";
import {useEffect, useState} from 'react'
import Parse from "parse"
import EventCard from '/src/components/EventCard.jsx'
import '/src/assets/Manrope.ttf'
import '/src/index.css'
import './PageStyle.css'
import { getPosts } from "../components/Services/getService"
import EventSection from "../components/EventSections";

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

    const eventCategories = posts.map(item => item.get('eventCategory'))
    const uniqueCategories = [...new Set(eventCategories)]

    let orderedCategories = [...uniqueCategories]

    const hasOther = orderedCategories.includes('Other')
    orderedCategories = orderedCategories.filter(removeOther =>
        removeOther !== 'Other'
    )

    if (hasOther) {
        orderedCategories.push('Other')
    }

    // Structuring the events page
    // Remove individual categories
    return (
        <div className="page-structure">
            <h1 className="page-title">Events</h1>
            <div className='event-section-column'>
                {orderedCategories.map((category) => {
                    const categoryEvents = posts.filter((post) =>
                        post.get("eventCategory") === category
                    )

                    return (
                        <EventSection
                        key={category}
                        category={category}
                        events={categoryEvents}
                        />
                    )
                })}
            </div>
        </div>
    );
}