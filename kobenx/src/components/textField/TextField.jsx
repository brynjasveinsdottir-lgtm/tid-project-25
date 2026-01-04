import React, { useState, useEffect } from "react";
import "./TextField.css";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import FileUpload from "../services/uploadService.jsx";
import PhotoPreview from "../photoPreview/photoPreview.jsx";

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
    <div className="text-box">
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
