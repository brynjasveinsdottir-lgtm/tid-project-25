import React, { useState } from "react";
import "./CreatePost.css";

//importing components
import ToggleButtonGroup from "../components/ToggleButtonGroup";
import TextField from "./TextField";
import Button from "./Button";
import CloseIcon from "@mui/icons-material/Close";

export default function CreatePost({ isOpen, onClose }) {
  const toggleOptions = ["Thread", "Event", "Place"];
  const [selectedToggle, setSelectedToggle] = useState(toggleOptions[0]);
  const placeholder = `Create a new ${selectedToggle} post...`;

  const [postContent, setPostContent] = useState(""); //for now just showing the text entered below (temporary!!) this does not reset if you close the dialog...

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
          <TextField
            placeholderText={placeholder}
            onChange={(text) => setPostContent(text)}
          />
        
          <div className="button-dock">
            <Button
              disabled={!postContent.trim()}
              variant="primary"
              onClick={onClose} 
              isBlock={true}
            >
              Post
            </Button>
          
        </div>
      </div>
    </div>
  );
}
