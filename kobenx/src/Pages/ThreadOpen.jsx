import React from "react";
import ThreadCard from '/src/components/ThreadCard.jsx';
import { userA } from "/src/UserInfoData";

export default function Threads() {

    
  
  const threadTestA = {
    author: userA,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  };


  const threads = [threadTestA];

  return (
    <div className="page-structure">
      <h1 className="page-title">Threads</h1>
        <div className="centered">
          {threads.map((thread, index) => (
            <ThreadCard key={index} thread={thread} />
          ))}
      </div>
    </div>
  );
}