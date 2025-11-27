import React from "react";
import TextField from "./TextField";

export default function ThreadForm({ data, setData }) {
    return (
      <TextField
        placeholderText="What's on your mind?"
        onChange={(text) => setData((prev) => ({ ...prev, content: text }))}
        onPhotoChange={(photo) => setData((prev) => ({ ...prev, photo }))}
        value={data.content}
        photo={data.photo}
      />
    );
  }
