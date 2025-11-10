import React from "react";
import TextField from "../components/TextField";

import FilterChip from "../components/FilterChip";

import Filters from "../components/Filters";

import { useState, useEffect } from "react";
import Parse from "parse";
import EventCard from "../components/EventCard";
import Post from "../components/PostTemplate";

import "/src/assets/Manrope.ttf";
import "/src/index.css";
import "./PageStyle.css";

export default function Home() {
  const filters = ["Social", "Food", "Housing", "Language", "Transport"];
  const [posts, setPosts] = useState([]);

  // Get all posts that have category 'Event' from class 'Posts' in database using Parse
  useEffect(() => {
    async function getPosts() {
      const Posts = Parse.Object.extend("Posts");
      const query = new Parse.Query(Posts);
      /* query.greaterThanOrEqualTo('eventTime', 0) */
      query.include("author");
      const results = await query.find();
      setPosts(results);
    }
    getPosts();
  }, []);

  return (
    <div className="page-structure">
      <h1 className="page-title">Home</h1>
      <TextField />

      <FilterChip> Testing single chip </FilterChip>

      <Filters filterList={filters} />
      <div>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
