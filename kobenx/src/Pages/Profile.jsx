import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import PersonIcon from "@mui/icons-material/Person";
import FileUpload from "../components/Services/uploadService";
import { getUserPublic } from "../components/Services/userService";
import Parse from "parse";
import UserDisplay from "../components/UserDisplay";
import Avatar from "../components/Avatar";

export default function Profile() {
  const [profilePhoto, setProfilePhoto] = React.useState(null);
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
      const userPublic = await getUserPublic();

      // Create a Parse File from the photo
      const parseFile = new Parse.File(profilePhoto.name, profilePhoto);

      userPublic.set("profilePicture", parseFile);
      await userPublic.save();

      setErrorMessage("");
      setSuccessMessage("Profile photo updated successfully!");
      setUnsaved(false); // reset unsaved state
    } catch (error) {
      console.error("Error updating profile photo:", error);
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  //page UI 
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
        <Button
          variant="primary"
          onClick={handleSaveChanges}
        >
          Save changes
        </Button>
        <Button
          variant="secondary"
          onClick={() => {setProfilePhoto(null); setUnsaved(false);}} //for some reason after doing this, you cannot select the same file again and trigger onSelect (bug?)
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
