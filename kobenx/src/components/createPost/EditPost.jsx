import ThreadForm from "./CreateThread.jsx";
import React, { useState } from "react";
import "./CreatePost.css";

import { editPost } from "../services/editService.js";
import { deletePost } from "../services/deleteService.js";

import Button from "../button/Button.jsx";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function EditPost({ onClose, post, onDeleted }) {
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
      onDeleted?.();
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
          <Button variant="destructive" type="button" onClick={handleDelete}>
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
