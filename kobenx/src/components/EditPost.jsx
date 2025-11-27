import ThreadForm from "./CreateThread";
import React, { useState, useRef, useEffect } from "react";
import "./CreatePost.css";

import { editPost } from "./Services/editService";

import Button from "./Button";

export default function EditPost({ onClose, post }) {
  const currentData = { content: post.get("postText"), photo: null };
  const [threadData, setThreadData] = useState({
    content: post.get("postText"),
    photo: null,
  });
  const [errorMessage, setErrorMessage] = useState("");

  function handleClose() {
    setThreadData({ content: "", photo: null });
    onClose();
  }

  async function handlePostUpdate() {
    try {
      await editPost({
        postId: post.id,
        newPostContent: threadData.content,
      });
      handleClose();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }
  return (
    <div className="dialog-content">
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form
        className="form-container"
        onSubmit={(e) => {
          e.preventDefault();
          handlePostUpdate();
        }}
      >

        <ThreadForm data={threadData} setData={setThreadData} />

        <div className="button-dock">
          <Button
            disabled={
              threadData.content.trim() === currentData.content.trim() &&
              threadData.photo === currentData.photo
            }
            variant="primary"
            type="submit"
            isBlock
          >
            Post
          </Button>
        </div>
      </form>
    </div>
  );
}
