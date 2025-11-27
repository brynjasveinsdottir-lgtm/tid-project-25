import React, { useState, useRef } from "react";
import "./CreatePost.css";

import ToggleButtonGroup from "../components/ToggleButtonGroup";
import Button from "./Button";
import ThreadForm from "./CreateThread";
import EventForm from "./CreateEvent";
import PlaceForm from "./CreatePlace";

import { createPost } from "./Services/postService";

export default function CreatePost({ onClose }) {
  const toggleOptions = ["Thread", "Event", "Place"];
  const [selectedToggle, setSelectedToggle] = useState(toggleOptions[0]);
  const fileUploadRef = useRef(null);

  //Data objects for each post type
  const [threadData, setThreadData] = useState({ content: "", photo: null });
  const [eventData, setEventData] = useState({
    title: "",
    category: "",
    location: "",
    time: "",
    photo: null,
  });
  const [placeData, setPlaceData] = useState({ location: "", photo: null }); //Not used currently but reserved for future use

  // Validators
  const validators = {
    Thread: () => !!threadData.content.trim(),
    Event: () =>
      !!eventData.title.trim() &&
      !!eventData.location.trim() &&
      !!eventData.category.trim() &&
      !!eventData.time,
    Place: () => false,
  };
  const [errorMessage, setErrorMessage] = useState("");

  // Close dialog and reset all state
  function handleClose() {
    setThreadData({ content: "", photo: null });
    setEventData({
      title: "",
      category: "",
      location: "",
      time: "",
      photo: null,
    });
    setSelectedToggle(toggleOptions[0]);
    setErrorMessage("");
    onClose();
  }

  // Submit post
  async function handlePostSubmit() {
    try {
      await createPost({
        selectedToggle,
        postContent: selectedToggle === "Thread" ? threadData.content : "",
        postPhoto:
          selectedToggle === "Thread"
            ? threadData.photo
            : selectedToggle === "Event"
            ? eventData.photo
            : null,
        postTitle: selectedToggle === "Event" ? eventData.title : "",
        category: selectedToggle === "Event" ? eventData.category : "",
        location: selectedToggle === "Event" ? eventData.location : "",
        eventTime: selectedToggle === "Event" ? eventData.time : "",
      });
      handleClose();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  // Render form inputs based on selected toggle
  const renderForm = () => {
    switch (selectedToggle) {
      case "Thread":
        return <ThreadForm data={threadData} setData={setThreadData} />;

      case "Event":
        return (
          <EventForm
            data={eventData}
            setData={setEventData}
            fileUploadRef={fileUploadRef}
          />
        );

      case "Place":
        return <PlaceForm data={placeData} setData={setPlaceData} />;

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
          e.preventDefault();
          handlePostSubmit();
        }}
      >
        {renderForm()}

        <div className="button-dock">
          <Button
            disabled={!validators[selectedToggle]()}
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
