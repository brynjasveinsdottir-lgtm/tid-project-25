import React, { useState, useRef } from "react";
import "./CreatePost.css";

// Components
import ToggleButtonGroup from "../components/ToggleButtonGroup";
import TextField from "./TextField";
import Button from "./Button";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AddLinkIcon from "@mui/icons-material/AddLink";

// Services
import { createPost } from "./Services/postService";
import FileUpload from "./Services/uploadService";

export default function CreatePost({ onClose }) {
  const toggleOptions = ["Thread", "Event", "Place"];
  const [selectedToggle, setSelectedToggle] = useState(toggleOptions[0]);

  // Thread state
  const [postContent, setPostContent] = useState("");
  const [postPhoto, setPostPhoto] = useState(null);

  // Event state
  const [postTitle, setPostTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [eventTime, setEventTime] = useState("");

  // UI state
  const [errorMessage, setErrorMessage] = useState("");
  const fileUploadRef = useRef(null);

  const validators = {
    Thread: () => !!postContent.trim(),
    Event: () =>
      !!postTitle.trim() &&
      !!location.trim() &&
      !!category.trim() &&
      !!eventTime,
    Place: () => false,
  };

  function handleClose() {
    setPostContent("");
    setCategory("");
    setLocation("");
    setEventTime("");
    setPostPhoto(null);
    setSelectedToggle(toggleOptions[0]);
    setErrorMessage("");
    onClose();
  }

  async function handlePostSubmit() {
    try {
      await createPost({
        selectedToggle,
        postContent,
        postPhoto,
        postTitle,
        category,
        location,
        eventTime,
      });
      handleClose();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  // Helper to render forms based on selectedToggle
  const renderForm = () => {
    switch (selectedToggle) {
      case "Thread":
        return (
          <TextField
            placeholderText="What's on your mind?"
            onChange={setPostContent}
            onPhotoChange={setPostPhoto}
            value={postContent}
          />
        );

      case "Event":
        return (
          <div className="input-container">
            <input
              type="text"
              placeholder="Event Title"
              onChange={(e) => setPostTitle(e.target.value)}
              value={postTitle}
              required
            />
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              required
            >
              <option value="">Select category</option>
              <option value="Music">Music</option>
              <option value="Food">Food</option>
              <option disabled value="Other">
                Other
              </option>
            </select>
            <select
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              required
            >
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
          </div>
        );

      case "Place":
        return (
          <div className="input-container">
            <input type="text" placeholder="Place Name" />
            <p className="dev-description">
              -- Sorry we do not support this yet --
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dialog-content">
      <ToggleButtonGroup
        buttonList={toggleOptions}
        onToggleChange={setSelectedToggle}
        firstSelected={selectedToggle}
      />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form
        className="form-container"
        onSubmit={(e) => {
          e.preventDefault(); // prevent default page reload
          handlePostSubmit();
        }}
      >
        {renderForm()}

        <div className="button-dock">
          <Button
            disabled={!validators[selectedToggle]()}
            variant="primary"
            type="submit" // ensures Enter key submits the form
            isBlock
          >
            Post
          </Button>
        </div>
      </form>
    </div>
  );
}
