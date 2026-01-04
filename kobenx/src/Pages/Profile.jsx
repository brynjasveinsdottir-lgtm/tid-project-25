import React, { useState, useEffect } from "react";
import Parse from "parse";

import FileUpload from "../components/services/uploadService";
import { getUserPublic } from "../components/services/userService";

import Button from "../components/button/Button";
import UserDisplay from "../components/userDisplay/UserDisplay";

import PersonIcon from "@mui/icons-material/Person";

export default function Profile() {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const fileUploadRef = React.useRef(null);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [unsaved, setUnsaved] = React.useState(false);

  //getting the user info
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const userPublic = await getUserPublic();
      setUser(userPublic);
    }
    getUser();
  }, []);

  //function for saving the profile photo to parse backend
  const handleSaveChanges = async () => {
    if (!profilePhoto) {
      setErrorMessage("Please select a photo first");
      return;
    }

    try {
      // Create a Parse File from the photo
      const parseFile = new Parse.File(profilePhoto.name, profilePhoto);

      user.set("profilePicture", parseFile);
      await user.save();

      setErrorMessage("");
      setSuccessMessage("Profile photo updated successfully!");
      setUnsaved(false); // reset unsaved state
    } catch (error) {
      console.error("Error updating profile photo:", error);
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };
  return (
    <div className="page-structure">
      <h1 className="page-title">Profile</h1>
      <div className="column-layout">
        <UserDisplay userInfoParse={user}></UserDisplay>

        {profilePhoto && (
          <img
            src={URL.createObjectURL(profilePhoto)}
            alt="preview"
            className="profile-photo"
          />
        )}
        <Button
          variant="secondary"
          onClick={() => {
            fileUploadRef.current?.triggerSelect();
          }}
        >
          <PersonIcon /> Change profile photo
        </Button>
        <FileUpload
          ref={fileUploadRef}
          onSelect={(file) => {
            if (file) {
              setProfilePhoto(file);
              setUnsaved(true); // mark that there are unsaved changes
            }
          }}
        />
        {unsaved && (
          <div className="row-layout">
            <Button variant="primary" onClick={handleSaveChanges}>
              Save changes
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setProfilePhoto(null);
                setUnsaved(false);
              }}
            >
              Cancel
            </Button>
          </div>
        )}

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
}
