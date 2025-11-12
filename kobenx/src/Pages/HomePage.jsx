import React from "react";
import TextField from "../components/TextField";
import CreatePost from "../components/CreatePost";


import Filters from "../components/Filters";

import { useState, useEffect } from "react";
import Parse from "parse";
import Post from "../components/PostTemplate";



import "/src/assets/Manrope.ttf";
import "/src/index.css";
import "./PageStyle.css";
import Button from "../components/Button";

export default function Home() {


  const filters = ["Event", "Thread", "Place", "Popular", "New"];
  const [posts, setPosts] = useState([]);

  const [selectedFilter, setSelectedFilter] = useState(null);

  const [openCreatePost, setOpenCreatePost] = useState(false);

  // Get all posts that have category 'Event' from class 'Posts' in database using Parse
  useEffect(() => {
    async function getPosts() {
      const Posts = Parse.Object.extend("Posts");
      const query = new Parse.Query(Posts);
      /* query.greaterThanOrEqualTo('eventTime', 0) */
      query.include("author");
      query.descending('createdAt')
      const results = await query.find();
      setPosts(results);
    }
    getPosts();
  }, []);

  // Handle filter chip toggles
  const handleFilterChange = (filterName, isApplied) => {
    if (isApplied) {
      setSelectedFilter(filterName);
    } else {
      setSelectedFilter(null); // if unselected, clear filter
    }
  };

  const filteredPosts = selectedFilter
    ? posts.filter((post) => post.get("category") === selectedFilter)
    : posts;

  return (
    <div className="page-structure">
      <h1 className="page-title">Home</h1>
      <TextField />
      <Button onClick={() => setOpenCreatePost(true)}>Create Post</Button>
      
      <CreatePost 
      isOpen={openCreatePost}
      onClose={() => setOpenCreatePost(false)}
      />

      <Filters filterList={filters} onFilterChange={handleFilterChange} />

      <div className="postContainer">
        {filteredPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
