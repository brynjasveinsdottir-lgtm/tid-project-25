import React from "react";
import { useState, useEffect } from "react";
import "./CommentStyle.css";
import "./SearchBar.css";
import Parse from "parse";
import { getPosts } from "../components/Services/getService";
import Post from "../components/PostTemplate";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const results = await getPosts({ type: "All" });
      setPosts(results);
    }
    fetchPosts();
  }, []);

  return (
    <div className="search">
      <div className="search bar">
        <input
          className="naked"
          placeholder="Search købenx..."
          onInput={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div className="postContainer">
        {searchInput.length >= 2 &&
          posts
            .filter((post) =>
              [
                post.get("postText"),
                post.get("postTitle"),
                post.get("eventCategory"),
                post.get("eventTime"),
                post.get("eventPlace"),
              ]
                .join(" ")
                .toLowerCase()
                .includes(searchInput.toLowerCase())
            )
            .map((post) => <Post key={post.id} post={post} />)}
      </div>
    </div>
  );
}
