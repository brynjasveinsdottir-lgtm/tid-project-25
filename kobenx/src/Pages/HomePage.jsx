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
import { getPosts } from "../components/Services/getService";

//new dialog test
import Dialog from "../components/Dialog";
import EditPost from "../components/EditPost";

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
      return (now - created) / (1000 * 60 * 60 * 24) <= 3;
    },

    popular: (post) => {
      const likes = post.get("likes") || 0;
      return likes >= 2;
    },
  };

  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [reloadPosts, setReloadPosts] = useState(true);

  // Get all posts that have category 'Event' from class 'Posts' in database using Parse
  useEffect(() => {
    async function fetchPosts() {
      const results = await getPosts({ type: "All" });
      setPosts(results);
      setReloadPosts(false); // reset reloadPosts
    }
    fetchPosts();
  }, [reloadPosts]);

  // Handle filter chip toggles
  function handleFilterChange(filterObj, isActive) {
    setSelectedFilters((prev) => {
      if (isActive) {
        return [...prev, filterObj];
      } else {
        return prev.filter(
          (f) => !(f.type === filterObj.type && f.value === filterObj.value)
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

        <input
          placeholder="Create new post"
          onClick={() => setOpenDialog(true)}
        ></input>

        <Button onClick={() => setOpenDialog(true)}>Create new post</Button>

        <Dialog
          isOpen={openDialog}
          isDismissible
          title="Create post"
          onClose={() => {
            setOpenDialog(false);
          }}
        >
          <CreatePost
            onClose={() => {
              setOpenDialog(false);
              setReloadPosts(true);
            }}
          ></CreatePost>
        </Dialog>

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
