import React, { useState, useEffect } from "react";
import "./TextField.css";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import FileUpload from "./Services/uploadService";
import PhotoPreview from "./photoPreview";

//Updated to make the parent fully control the component, (fixing bug with input and post content not syncing properly)
export default function TextField({
  placeholderText,
  value,
  onChange,
  onPhotoChange,
  photo,
}) {
  const [inputPhoto, setInputPhoto] = useState(photo || null);
  const fileUploadRef = React.useRef(null);

  const handleChange = (e) => {
    const text = e.target.value;
    onChange?.(text);
  };

  const handleAddPhoto = () => {
    fileUploadRef.current?.triggerSelect();
  };

  const handleDelete = () => {
    setInputPhoto(null);
    onPhotoChange?.(null);
  };

  const handleEdit = () => {
    fileUploadRef.current?.triggerSelect();
  };

  useEffect(() => {
    setInputPhoto(photo || null);
  }, [photo]);

  return (
    <div className="comment-box">
      <textarea
        className="naked"
        placeholder={placeholderText}
        value={value} // controlled by parent
        onChange={handleChange}
      />

      {inputPhoto && (
        <PhotoPreview
          photo={photo}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        ></PhotoPreview>
      )}

      <div className="icon-container">
        <AddPhotoAlternateOutlinedIcon
          className="icon"
          onClick={handleAddPhoto}
        />
        <EmojiEmotionsOutlinedIcon className="icon--disabled" />
        <LinkOutlinedIcon className="icon--disabled" />
      </div>

      <FileUpload
        ref={fileUploadRef}
        onSelect={(file) => {
          setInputPhoto(file);
          onPhotoChange?.(file);
        }}
      />
    </div>
  );
}
