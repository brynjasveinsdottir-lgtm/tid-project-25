import React from "react";
import { useState, useEffect } from "react";
import Parse from "parse";
import PostTemplate from "../components/PostTemplate";
import { useParams } from "react-router-dom";

import AddComment from "../components/AddComment";



export default function ThreadOpen() {

  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  //Fetches the post
  useEffect(() => {
      async function getPost() {
        const Posts = Parse.Object.extend("Posts");
        const query = new Parse.Query(Posts);
        query.equalTo("objectId",id);
        query.include("author");
       

        const results = await query.first();
        setPost(results);
      }

      getPost();
    }, [id]);

     // Fetch comments for the current post
  async function fetchComments() {
    if (!post) return;
    const Comment = Parse.Object.extend("Comments");
    const query = new Parse.Query(Comment);
    query.equalTo("post", post);
    query.include("author"); // include UserPublic object
    query.ascending("createdAt"); // oldest first
    const results = await query.find();
    setComments(results);
  }

   // Fetch comments whenever the post is loaded
   useEffect(() => {
    if (post) fetchComments();
  }, [post]);
    

    if (!post) return


    return (
      <div className="page-structure">
        <h1 className="page-title">Thread</h1>
        <div className="centered">
          {/* Display the post */}
          <PostTemplate post={post} />
  
          {/* Add comment input */}
          <AddComment post={post} onCommentAdded={() => fetchComments()} />
  
          {/* Comments list */}
          <div className="comments-section">
            <h3>Comments</h3>
            {comments.length === 0 ? (
              <p>No comments yet. Be the first to comment!</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <p>
                    <strong>@{comment.get("author").get("username")}</strong>:{" "}
                    {comment.get("text")}
                  </p>
                  <p className="comment-time">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }