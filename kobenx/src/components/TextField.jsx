import React, { useState } from "react";
import "./TextField.css";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import FileUpload from "./Services/uploadService";

//Updated to make the parent fully control the component, (fixing bug with input and post content not syncing properly)
export default function TextField({
    placeholderText,
    value,        
    onChange,
    onPhotoChange,
  }) {
    const [inputPhoto, setInputPhoto] = useState(null);
    const fileUploadRef = React.useRef(null);
  
    const handleChange = (e) => {
      const val = e.target.value;
      onChange?.(val);
    };
  
    const handleAddPhoto = () => {
      fileUploadRef.current?.triggerSelect();
    };
  
    return (
      <div className="comment-box">
        <textarea
          className="naked"
          placeholder={placeholderText}
          value={value}   // controlled by parent
          onChange={handleChange}
        />
  
        {inputPhoto && (
          <img
            src={URL.createObjectURL(inputPhoto)}
            className="photo"
            onClick={() => setInputPhoto(null)}
          />
        )}
  
        <div className="icon-container">
          <AddPhotoAlternateOutlinedIcon className="icon" onClick={handleAddPhoto} />
          <EmojiEmotionsOutlinedIcon className="icon--disabled" />
          <LinkOutlinedIcon className="icon--disabled"/>
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
  