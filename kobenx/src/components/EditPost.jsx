import ThreadForm from "./CreateThread";
import React, { useState, useRef, useEffect } from "react";
import "./CreatePost.css";

import { editPost } from "./Services/editService";
import { deletePost } from "./Services/deleteService";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import Button from "./Button";

export default function EditPost({ onClose, post }) {
  const postImage = post.get("image") ? post.get("image") : null;
  const postImageUrl = postImage ? postImage.url() : null;
  const currentData = { content: post.get("postText"), photo: postImageUrl };
  const [threadData, setThreadData] = useState({
    content: currentData.content,
    photo: currentData.photo,
  });
  const [errorMessage, setErrorMessage] = useState("");

  function handleClose() {
    setThreadData({ content: currentData.content, photo: currentData.photo });
    onClose();
  }
  async function handleDelete() {
    try {
      await deletePost({ postId: post.id });
      onClose();
     
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  async function handlePostUpdate() {
    try {
      await editPost({
        postId: post.id,
        newPostContent: threadData.content,
        newPostPhoto: threadData.photo,
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
        <Button variant="destructive icon-only" type="button" onClick={handleDelete}>
            <DeleteForeverIcon />
          </Button>

        <div className="button-dock">
          
          <Button variant="secondary" type="button" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            disabled={
              threadData.content.trim() === currentData.content.trim() &&
              threadData.photo === currentData.photo
            }
            variant="primary"
            type="submit"
          >
            Save
          </Button>
        </div>
        </div>
      </form>
    </div>
  );
}
