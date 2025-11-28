import Parse from 'parse'
import { useState, useEffect } from "react";



export async function getPosts({type}) {
    const Posts = Parse.Object.extend("Posts");
    const query = new Parse.Query(Posts);
    query.include("author");
    query.descending('createdAt')

    if (type === 'Events' || type === 'UpcomingEvents') {
        query.equalTo("category", "Event");
        query.greaterThanOrEqualTo('eventTime', new Date())
        query.ascending('eventTime')
    } else if (type === 'Threads'){
        query.equalTo("category", "Thread");
    }
    
    if (type === 'UpcomingEvents'){
        query.limit(4);
    }

    const results = await query.find()
    return results
}

export async function getSignups({post}) {
    const Signups = Parse.Object.extend("Signups");
    const query = new Parse.Query(Signups);
    query.equalTo("post", post);
    query.include("user");
    const results = await query.find()
    return results
}

export async function getSinglePost({postId}) {
    const Posts = Parse.Object.extend("Posts");
    const query = new Parse.Query(Posts);
    query.include("author");
    query.equalTo("objectId", postId);
    const result = await query.first()
    return result
}