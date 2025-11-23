import React from "react";
import { useState, useEffect } from "react";
import Parse from "parse";
import PostTemplate from "../components/PostTemplate";
import { useParams } from "react-router-dom";

import AddComment from "../components/AddComment";



export default function ThreadOpen() {

  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
      async function getPost() {
        const Posts = Parse.Object.extend("Posts");
        const query = new Parse.Query(Posts);
        query.equalTo("objectId",id);
        query.include("authorUser");
        query.descending('createdAt')

        const results = await query.first();
        setPost(results);
      }

      getPost();
    }, [id]);
    
    if (!post) return

//Gets only a single post

  return (
    <div className="page-structure">
      <h1 className="page-title">Thread</h1>
        <div className="centered">
        <PostTemplate post={post} />
        <AddComment post={post}
        onCommentAdded={() => fetchComments(post)} // refresh comments after submit
/>
      </div>
    </div>
  );
}