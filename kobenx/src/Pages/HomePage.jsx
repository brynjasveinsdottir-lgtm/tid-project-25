import React from "react";
import { useState, useEffect } from "react";
import Parse from "parse";

import CreatePost from "../components/CreatePost";
import Filters from "../components/Filters";
import Post from "../components/PostTemplate";
import Button from "../components/Button";
import TrendingEvents from "../components/TrendingEvents";
import parse from "parse";



import "/src/assets/Manrope.ttf";
import "/src/index.css";
import "./PageStyle.css";
import { getUserPublic } from "../components/Services/userService";


export default function Home() {


  const filters = ["Event", "Thread", "Place", "Popular", "New"];
  const [posts, setPosts] = useState([]);

  const [selectedFilters, setSelectedFilters] = useState([]);

  //FILTER LOGIC
  const filterLogic = {
    category: (post, value) => post.get("category") === value,

    new: (post) => {
      const created = post.get("createdAt");
      const now = new Date();
      return (now - created) / (1000 * 60 * 60 * 24) <= 7;
    },

    popular: (post) => {
      const likes = post.get("likes") || 0;
      return likes >= 20;
    }

 };

  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [reloadPosts, setReloadPosts] = useState(false);

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
    setReloadPosts(false);
  }, [reloadPosts]);

  // Handle filter chip toggles
  function handleFilterChange(filterObj, isActive) {
    setSelectedFilters((prev) => {
      if (isActive) {
        return [...prev, filterObj];
      } else {
        return prev.filter(
          (f) =>
            !(f.type === filterObj.type && f.value === filterObj.value)
        );
      }
    });
  }

 const filteredPosts =
    selectedFilters.length > 0
      ? posts.filter((post) =>
          selectedFilters.every((filter) => {
            const fn = filterLogic[filter.type];
            return fn ? fn(post, filter.value) : false;
          })
        )
      : posts;

    return (
      <div className="home-layout">
        {/* LEFT COLUMN: feed */}
        <div className="home-left">
          <h1 className="page-title">Home</h1>
          <p className="dev-description">
            -- Click this button to open a dialog to create a new post (this will be
            replaced by a simple textField later to match design)---
          </p>
    
          <Button onClick={() => setOpenCreatePost(true)}>Create Post</Button>
        
    
          <CreatePost
            isOpen={openCreatePost}
            onClose={() => { setOpenCreatePost(false); setReloadPosts(true); }}
          />
    
          <p className="dev-description">
            -- The part below this is primarly for testing new posts appearing in
            feed and a filter function --- 
          </p>
    
          <Filters filterList={filters} onFilterChange={handleFilterChange} />
    
          <div className="postContainer">
            {filteredPosts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>
    
        {/* RIGHT COLUMN: trending events */}
        <aside className="home-right">
          <TrendingEvents />
          {/* here we will add Trending Topics eventually /> */}
        </aside>
      </div>
    );
}



