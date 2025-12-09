import React from "react";
import Button from "./Button";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AddLinkIcon from "@mui/icons-material/AddLink";

import FileUpload from "./Services/uploadService";
import PhotoPreview from "./photoPreview";

export default function EventForm({ data, setData, fileUploadRef }) {
  const handleDelete = () => {
    setData((prev) => ({ ...prev, photo: null }));
  };
  const handleEdit = () => {
    fileUploadRef.current?.triggerSelect();
  };
  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Event Title"
        value={data.title}
        onChange={(e) =>
          setData((prev) => ({ ...prev, title: e.target.value }))
        }
        required
      />
      <select
        value={data.category}
        onChange={(e) =>
          setData((prev) => ({ ...prev, category: e.target.value }))
        }
        required
      >
        <option value="">Select category</option>
        <option value="Music">Music</option>
        <option value="Food">Food</option>
        <option value="Social">Social</option>
        <option value="Culture">Culture</option>
        <option value="Sport">Sport</option>
        <option value="Other">Other</option>
      </select>
      <select
        value={data.location}
        onChange={(e) =>
          setData((prev) => ({ ...prev, location: e.target.value }))
        }
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
        value={data.time}
        onChange={(e) => setData((prev) => ({ ...prev, time: e.target.value }))}
        required
      />

      <div className="button-dock">
        <Button
          type="button"
          variant="secondary"
          onClick={() => fileUploadRef.current?.triggerSelect()}
        >
          <AddPhotoAlternateIcon /> Add Photo
        </Button>
        <FileUpload
          ref={fileUploadRef}
          onSelect={(photo) => setData((prev) => ({ ...prev, photo }))}
        />
        <Button type="button" variant="secondary">
          <AddLinkIcon /> Add Signup Link
        </Button>
      </div>

      {data.photo && (
        <PhotoPreview
          photo={data.photo}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        ></PhotoPreview>
      )}
    </div>
  );
}
