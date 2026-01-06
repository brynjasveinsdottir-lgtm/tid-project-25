import { useState, useEffect } from "react";
import { getPosts } from "../components/services/getService.js";
import "./PageStyle.css";

import PostTemplate from "../components/post/PostTemplate";

export default function Threads() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      const results = await getPosts({ type: "Threads" });
      setPosts(results);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

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
