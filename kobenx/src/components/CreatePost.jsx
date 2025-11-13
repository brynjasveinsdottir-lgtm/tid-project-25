import React, { useState } from "react";
import Parse from "parse";
import "./CreatePost.css";

//importing components
import ToggleButtonGroup from "../components/ToggleButtonGroup";
import TextField from "./TextField";
import Button from "./Button";
import CloseIcon from "@mui/icons-material/Close";

// The CreatePost component (dialog with the inputs for creating a post)
export default function CreatePost({ isOpen, onClose }) {
  const toggleOptions = ["Thread", "Event", "Place"]; //options for the toggle button group (post types or "category" in the database)
  const [selectedToggle, setSelectedToggle] = useState(toggleOptions[0]); //default to first option "Thread" (maybe this could be different if you post from the events page - if we want to support that)
  const placeholder = `Create a new ${selectedToggle} post...`; //Add later a function that changes the placeholder based on the selected toggle OR at least make the toggle label lowercase to fit in the sentence better
  const [postContent, setPostContent] = useState("");
  const [postPhoto, setPostPhoto] = useState(null);

  async function handlePosting(e) {
    //getting the user info (lets try to see if we can do this only once when the app loads instead of every time we post to save calls to the database)
    const currentUser = Parse.User.current();
    if (!currentUser) {
      alert("No user logged in!"); // should not happen (I think our login/signup flow handles this, but maybe good to have a fallback)
      return;
    }

    const UserPublic = Parse.Object.extend("UserPublic");
    const userQuery = new Parse.Query(UserPublic);
    userQuery.equalTo("userIdPrivate", currentUser); // match pointer to _User (currently logged in user)
    const userPublic = await userQuery.first(); // should only be one matching UserPublic

    if (!userPublic) {
      alert("No matching UserPublic found for this user."); // also should not happen
      return;
    }
    // Creating the post
    const Posts = Parse.Object.extend("Posts");
    const newPost = new Posts();
    newPost.set("category", selectedToggle);
    newPost.set("postText", postContent);
    newPost.set("author", userPublic);

    //only set the image if there is one
    // TEMP: Convert imported .jpg to File for testing (The fetch and blob part is not needed when we implement file upload properly)
    if (postPhoto) {
        const response = await fetch(postPhoto);
        const blob = await response.blob();
        const parseFile = new Parse.File("bike.jpg", blob);
        newPost.set("image", parseFile);
    }


    //newPost.set("image", postPhoto); // if there is a photo it will be added here (need to fix the object type when I implement with the file upload, code above is temporary for the sample photo...)

    //saving the post (also having an alert for both success and error, maybe remove or design better later)
    await newPost.save().then(
      (newObj) => {
        //alert("Post created!" + newObj.id); //removed the alert for better UX
        // window.location.reload(); //reload to show the new post in the feed (is there a better way to make the new post appear without reloading the whole page?)
      },
      (error) => {
        alert(error.message);
      }
    );
  }
  async function handlePostSubmit(e) {
    await handlePosting(e); //

    //write in console (for testing purposes)
    console.log("Post submitted:", {
      type: selectedToggle,
      content: postContent,
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
        <TextField
          placeholderText={placeholder}
          onChange={(text) => setPostContent(text)}
          onPhotoChange={(photo) => setPostPhoto(photo)}
        />

        <div className="button-dock">
          <Button
            disabled={!postContent.trim() || selectedToggle !== "Thread"} //disable for events for now (since we dont have the required input and it will crash if we try to render events without it)
            variant="primary"
            onClick={() => handlePostSubmit(postContent)}
            isBlock={true}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}
