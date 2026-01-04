import React, { useState, useRef } from "react";
import "./CreatePost.css";
import { createPost } from "../services/postService.js";

import ToggleButtonGroup from "../toggleButtonGroup/ToggleButtonGroup.jsx";
import Button from "../button/Button.jsx";

import ThreadForm from "./CreateThread";
import EventForm from "./CreateEvent";
import PlaceForm from "./CreatePlace";

import ThreadIcon from "@mui/icons-material/QuestionAnswer";
import EventIcon from "@mui/icons-material/Event";
import PlaceIcon from "@mui/icons-material/FmdGood";

export default function CreatePost({ onClose, draft, setDraft }) {
  const toggleOptions = [
    { label: "Thread", icon: <ThreadIcon /> },
    { label: "Event", icon: <EventIcon /> },
    { label: "Place", icon: <PlaceIcon /> },
  ];
  const [selectedToggle, setSelectedToggle] = useState(toggleOptions[0].label);
  const fileUploadRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false); // To prevent multiple submissions

  //Data objects for each post type
  const [threadData, setThreadData] = useState({
    content: draft || "",
    photo: null,
  });
  const [eventData, setEventData] = useState({
    title: "",
    category: "",
    location: "",
    time: "",
    photo: null,
  });
  const [placeData, setPlaceData] = useState({ location: "", photo: null }); //Reserved for future use

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
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");
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
      if (selectedToggle === "Thread") {
        setDraft("");
        localStorage.removeItem("postDraft");
      }
      handleClose();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  // Render form inputs based on selected toggle
  const renderForm = () => {
    switch (selectedToggle) {
      case "Thread":
        return (
          <ThreadForm
            data={threadData}
            setData={setThreadData}
            onDraftChange={setDraft}
          />
        );

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
            loading={isSubmitting}
          >
            {isSubmitting ? "Posting…" : "Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}
