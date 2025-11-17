import React, { useState } from "react";
import Parse from "parse";
import "./CreatePost.css";

//importing components
import ToggleButtonGroup from "../components/ToggleButtonGroup";
import TextField from "./TextField";
import Button from "./Button";
import CloseIcon from "@mui/icons-material/Close";

//import services
import { createPost } from "./Services/postService";

// The CreatePost component (dialog with the inputs for creating a post)
export default function CreatePost({ isOpen, onClose }) {
  const toggleOptions = ["Thread", "Event", "Place"]; //options for the toggle button group (post types or "category" in the database)
  const [selectedToggle, setSelectedToggle] = useState(toggleOptions[0]); //default to first option "Thread" (maybe this could be different if you post from the events page - if we want to support that)
  const placeholder = `Create a new ${selectedToggle} post...`; //Add later a function that changes the placeholder based on the selected toggle OR at least make the toggle label lowercase to fit in the sentence better
  const [postContent, setPostContent] = useState("");
  const [postPhoto, setPostPhoto] = useState(null);
  const [postTitle, setPostTitle] = useState("");

  
  async function handlePostSubmit() {
    await createPost({
        selectedToggle,
        postContent,
        postPhoto,
        postTitle
      });

    // clear the content and close the dialog after submitting
    setPostContent("");
    onClose();
  }
  if (!isOpen) {
    return null; // Do not render anything if the dialog is not open
  }

  return (
    <div className="dialog" onClick={onClose}>
      {/* Also closing if you click outside */}
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        {/* Prevent closing when clicking inside the dialog content area */}
        <div className="dialog-header">
          <h2 className="dialog-title">Create Post</h2>
          <CloseIcon className="close-button" onClick={onClose}></CloseIcon>
        </div>

        <ToggleButtonGroup
          buttonList={toggleOptions}
          onToggleChange={setSelectedToggle}
          firstSelected={toggleOptions[0]}
        />
        {/* rendering different inputs based on selected toggle button*/}
        {selectedToggle == "Event" ? (
          <input type="text" placeholder="Event Title" onChange={(e) => setPostTitle(e.target.value)} />
        ) : null}

        {selectedToggle == "Thread" ? (
          <TextField
            placeholderText="What's on your mind?"
            onChange={(text) => setPostContent(text)}
            onPhotoChange={(photo) => setPostPhoto(photo)}
          />
        ) : null}

        {selectedToggle == "Place" ? (
          <div className="input-container">
            <input type="text" placeholder="Place Name" />
            <p className="dev-description">
              -- Sorry we do not support this yet...---{" "}
            </p>
          </div>
        ) : null}

        <div className="button-dock">
          <Button
            disabled={(!postContent.trim() && selectedToggle==="Thread") || (postTitle==="" && selectedToggle==="Event") || selectedToggle==="Place"} //disable for events for now (since we dont have the required input and it will crash if we try to render events without it)
            variant="primary"
            onClick={() => handlePostSubmit()}
            isBlock={true}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}
