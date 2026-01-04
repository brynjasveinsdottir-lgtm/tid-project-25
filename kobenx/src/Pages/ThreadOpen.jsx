import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Parse from "parse";
import "./PageStyle.css";

import { getSinglePost } from "../components/Services/getService.js";

import PostTemplate from "../components/post/PostTemplate";
import AddComment from "../components/comment/AddComment";
import CommentList from "../components/comment/CommentList";
import Button from "../components/button/Button";

export default function ThreadOpen() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchPost() {
      const result = await getSinglePost({ postId: id });
      setPost(result);
    }

    fetchPost();
  }, [id]);

  // Fetch comments for the current post
  async function fetchComments() {
    if (!post) return;

    const Comment = Parse.Object.extend("Comments");
    const query = new Parse.Query(Comment);

    query.equalTo("post", post);

    query.include("author");
    query.descending("createdAt"); // newest comments at the top

    const results = await query.find();
    setComments(results);
  }

  // Fetch comments whenever the post is loaded
  useEffect(() => {
    if (post) fetchComments();
  }, [post]);

  if (!post) {
    return <div className="loading">Loading thread...</div>;
  }

  return (
    <div className="page-structure">
      <h1 className="page-title">Thread</h1>
      <Button
        className="back-button"
        type="button"
        variant="secondary"
        isRounded
        onClick={() => {
          navigate("/threads");
        }}
      >
        Back
      </Button>
      <div className="thread-open-container">
        <PostTemplate post={post} />
        <AddComment post={post} onCommentAdded={fetchComments} />
        <h2 className="section-title">Comments</h2>
        <CommentList comments={comments} onCommentsUpdated={fetchComments} />
      </div>
    </div>
  );
}
