import Parse from 'parse'
import { useState, useEffect } from "react";



export async function getPosts() {

    const [posts, setPosts] = useState([]);

    const Posts = Parse.Object.extend("Posts");
    const query = new Parse.Query(Posts);
    query.include("author");
    query.descending('createdAt')
    
    const results = await query.find();
    setPosts(results)
    
    return

}