import React, { useState } from "react";
import Parse from "parse";
import "./CreatePost.css";

//importing components
import ToggleButtonGroup from "../components/ToggleButtonGroup";
import TextField from "./TextField";
import Button from "./Button";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AddLinkIcon from "@mui/icons-material/AddLink";

//import services
import { createPost } from "./Services/postService";
import FileUpload from "./Services/uploadService";

// The CreatePost component (dialog with the inputs for creating a post)
export default function CreatePost({ isOpen, onClose }) {
  const toggleOptions = ["Thread", "Event", "Place"]; //options for the toggle button group (post types or "category" in the database)
  const [selectedToggle, setSelectedToggle] = useState(toggleOptions[0]); //default to first option "Thread" (maybe this could be different if you post from the events page - if we want to support that)
  const placeholder = `Create a new ${selectedToggle} post...`; //Add later a function that changes the placeholder based on the selected toggle OR at least make the toggle label lowercase to fit in the sentence better
  //content for threads
  const [postContent, setPostContent] = useState("");
  const [postPhoto, setPostPhoto] = useState(null);

  //For file upload
  const fileUploadRef = React.useRef(null);

  //content for events
  const [postTitle, setPostTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [eventTime, setEventTime] = useState(undefined);

  async function handlePostSubmit() {
    await createPost({
      selectedToggle,
      postContent,
      postPhoto,
      postTitle,
      category,
      location,
      eventTime,
    });

    // clear the content and close the dialog after submitting
    setPostContent("");
    setCategory("");
    setLocation("");
    setEventTime(null);
    setPostPhoto(null);
    setSelectedToggle(toggleOptions[0]); //reset to default toggle option (or do we want to keep the last selected one?)
    onClose();
  }

  //Return statements
  if (!isOpen) {
    return null; // Do not render anything if the dialog should not be open
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
          firstSelected={selectedToggle}
        />
        {/* rendering different inputs based on selected toggle button*/}
        {selectedToggle == "Event" ? (
          <div className="input-container">
            <input
              type="text"
              placeholder="Event Title"
              onChange={(e) => setPostTitle(e.target.value)}
              required
            />
            <select onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Select category</option>
              <option value="Music">Music</option>
              <option value="Food">Food</option>
              <option disabled={true} value="Other">
                Other
              </option>
            </select>

            <select onChange={(e) => setLocation(e.target.value)} required>
              <option value="">Select location</option>
              <option value="Tivoli">Tivoli Gardens</option>
              <option value="Nyhavn">Nyhavn</option>
              <option value="Refshaleøen">Refshaleøen</option>
              <option value="Nørrebrogade">Nørrebrogade</option>
              <option value="Nørrebro market">Nørrebro market</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="datetime-local"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
            />
            <div className="button-dock">
              {" "}
              <Button
                variant="secondary"
                onClick={() => fileUploadRef.current?.triggerSelect()}
              >
                <AddPhotoAlternateIcon /> Add Photo
              </Button>
              <FileUpload ref={fileUploadRef} onSelect={setPostPhoto} />
              <Button variant="secondary">
                <AddLinkIcon /> Add Signup Link
              </Button>
            </div>

            {postPhoto && (
              <img
                src={URL.createObjectURL(postPhoto)}
                alt="preview"
                style={{ width: 200, marginTop: 10 }}
              />
            )}

            <div className="dev-description">
              {" "}
              Do we want just buttons or also have a textfield like in figma??{" "}
            </div>
            <TextField
              placeholderText="What's on your mind?"
              value={postContent} // <-- pass the parent state
              onChange={setPostContent} // <-- update parent state
              onPhotoChange={setPostPhoto}
            />
          </div>
        ) : null}

        {selectedToggle == "Thread" ? (
          <TextField
            placeholderText="What's on your mind?"
            onChange={(text) => setPostContent(text)}
            onPhotoChange={setPostPhoto}
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
            disabled={
              (!postContent.trim() && selectedToggle === "Thread") ||
              (postTitle === "" && selectedToggle === "Event") ||
              selectedToggle === "Place"
            } //disable for empty content or title, IMPORTANT: need to fix that when you change the toggle then the input is cleared but the variables are not!!
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
