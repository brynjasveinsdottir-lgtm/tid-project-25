import { useState, useEffect } from "react";
import { getPosts } from "../components/Services/getService.js";
import "./PageStyle.css";

import PostTemplate from "../components/post/PostTemplate";

export default function Threads() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const results = await getPosts({ type: "Threads" });
      setPosts(results);
    }
    fetchPosts();
  }, []);

  return (
    <div className="page-structure">
      <h1 className="page-title">Threads</h1>
      <div className="thread-card-container">
        {posts.map((post) => (
          <PostTemplate key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
