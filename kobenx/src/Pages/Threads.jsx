import React from "react";
import { useState, useEffect } from "react";
import { getPosts } from "../components/Services/getService";

import "/src/assets/Manrope.ttf";
import "/src/index.css";
import "./PageStyle.css";

import PostTemplate from "../components/PostTemplate";

export default function Threads () {

  const [posts, setPosts] = useState([]);
 // Get all posts that have category 'Event' from class 'Posts' in database using Parse
  useEffect(() => {
    async function fetchPosts() {
      const results = await getPosts({type:'Threads'});
      setPosts(results);
    }
    fetchPosts();
  }, []);


  return (
    <div className="page-structure">
      <h1 className="page-title">Threads</h1>
        <div className="thread-card-container">
        {posts.map((post) => (
  
  <div key={post.id}>
    <PostTemplate post={post} />
  
  </div>
))}

          
      </div>
    </div>
  );
}