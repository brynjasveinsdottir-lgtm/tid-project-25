import React from "react";
import { useState, useEffect } from "react";
import Parse from "parse";
import { useParams } from "react-router-dom";


import PostTemplate from "../components/PostTemplate";
import AddComment from "../components/AddComment";
import CommentList from "../components/CommentList";
import "./PageStyle.css";
import "/src/assets/Manrope.ttf";

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

    query.include("author"); 
    query.descending("createdAt"); // descending: newest comments appear first
    
    
    const results = await query.find();
    setComments(results);
  
  }

   // Fetch comments whenever the post is loaded
   useEffect(() => {
    if (post) fetchComments();
  }, [post]);
    

    if (!post) return null
    


    return (
      <div className="page-structure">
      <h1 className="page-title">Thread</h1>
      
      <div className="thread-open-container">
        <PostTemplate post={post} />
        <AddComment post={post} onCommentAdded={fetchComments} />
        <h2 className="section-title">Comments</h2>
        <CommentList comments={comments}
        onCommentsUpdated={fetchComments} />
      </div>
    </div>
    
  
    );
  }