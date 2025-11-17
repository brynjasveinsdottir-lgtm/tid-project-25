import React from "react";
import { useState, useEffect } from "react";
import Parse from "parse";
import PostTemplate from "../components/PostTemplate";
import { useParams } from "react-router-dom";



export default function ThreadOpen() {

  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
      async function getPost() {
        const Posts = Parse.Object.extend("Posts");
        const query = new Parse.Query(Posts);
        query.equalTo("objectId",id);
        query.include("author");
        query.descending('createdAt')

        const results = await query.first();
        setPost(results);
      }

      getPost();
    }, [id]);
    
    if (!post) return <p>Loading</p>; // Wait for the fetch

//Gets only a single post

  return (
    <div className="page-structure">
      <h1 className="page-title">Thread</h1>
        <div className="centered">
        <PostTemplate post={post} />
      </div>
    </div>
  );
}