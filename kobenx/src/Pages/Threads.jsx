import React from "react";
import { useState, useEffect } from "react";
import Parse from "parse";

import "/src/assets/Manrope.ttf";
import "/src/index.css";
import "./PageStyle.css";

import ThreadCard from "../components/ThreadCard";

export default function Threads () {

  const [posts, setPosts] = useState([]);
 // Get all posts that have category 'Event' from class 'Posts' in database using Parse
  useEffect(() => {
    async function getPosts() {
      const Posts = Parse.Object.extend("Posts");
      const query = new Parse.Query(Posts);
      query.equalTo("category", "Thread");
      /* query.greaterThanOrEqualTo('eventTime', 0) */
      query.include("author");
      query.descending('createdAt')
      const results = await query.find();
      setPosts(results);
    }
    getPosts();
  }, []);


  return (
    <div className="page-structure">
      <h1 className="page-title">Threads</h1>
        <div className="centered">
          {posts.map((post) => (
            <ThreadCard key={post.id} thread={post} />
          ))}
      </div>
    </div>
  );
}