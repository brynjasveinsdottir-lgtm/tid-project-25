import React from "react";
import ThreadCard from '/src/components/ThreadCard.jsx'
import { userA } from "/src/UserInfoData";

export default function Threads() {

  const threadTest = {
    author: userA,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  }

  return (
    <div className="page-structure">
      <h1 className="page-titles">Threads</h1>
      <ThreadCard thread={threadTest}/>
    </div>
  );
}