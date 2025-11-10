import React from "react"
import { useEffect, useState } from "react";
import Parse from "parse"
import ThreadCard from '/src/components/ThreadCard.jsx';



export default function Threads() {

    const [threads, setThreads] = useState([])

    // Get all posts that have category '' from class 'Posts' in database using Parse
    useEffect(() => {
        async function getPosts() {
            const Posts = Parse.Object.extend("Posts");
            const query = new Parse.Query(Posts);
            query.equalTo("category", "Threads");
            /* query.greaterThanOrEqualTo('eventTime', 0) */
            query.include("author");
            query.ascending('eventTime')
            const results = await query.find();
            listEvents(results)
        }
        getPosts()
    }, [])



  return (
    <div className="page-structure">
      <h1 className="page-title">Threads</h1>
        <div className="centered">
          {threads.map((thread, id) => (
            <ThreadCard key={id} thread={thread} />
          ))}
      </div>
    </div>
  );
}