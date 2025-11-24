import Parse from 'parse'
import { useState, useEffect } from "react";



export async function getPosts({type}) {
    const Posts = Parse.Object.extend("Posts");
    const query = new Parse.Query(Posts);
    query.include("author");
    query.descending('createdAt')
    
    const results = await query.find();   
    if (type === 'Event') {
        const filteredResults = results.filter(post => post.get("category") === "Event");
        return filteredResults;
    }
    else {
    return results};
}