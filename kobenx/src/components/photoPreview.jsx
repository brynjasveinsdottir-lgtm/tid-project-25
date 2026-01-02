import React from "react";
import Button from "./Button";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import CancelIcon from "@mui/icons-material/Cancel";
import "./photoPreview.css";

export default function PhotoPreview({ photo, handleEdit, handleDelete }) {
  if (!photo) {
    return null;
  }
  const src = photo instanceof File ? URL.createObjectURL(photo) : photo;

  return (
    <div className="photo-preview-container">
      <img className="photo-preview" src={src} alt="preview" />
      <div className="icon-overlay">
        <Button type="Button" variant="secondary" size="sm" onClick={handleEdit}>
          <EditSquareIcon />
          Edit
        </Button>
        <Button type="Button" variant="destructive" size="sm" onClick={handleDelete}>
          <CancelIcon />
          Delete
        </Button>
      </div>
    </div>
  );
}
