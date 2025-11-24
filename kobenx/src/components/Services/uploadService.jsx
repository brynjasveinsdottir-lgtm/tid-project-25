//reference: https://blog.back4app.com/how-to-upload-files-to-back4app/
//modified to not upload directly but send the file to parent component (then it gets uploaded to parse when the post is created)
//modified to forward ref so we can trigger the file upload from a button or an icon in another component

import React, { forwardRef, useImperativeHandle, useRef } from "react";

const FileUpload = forwardRef(function FileUpload({ onSelect }, ref) {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    triggerSelect() {
      inputRef.current.click();
    }
  }));

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) onSelect(file);
  };

  return (
    <input
      ref={inputRef}
      type="file"
      style={{ display: "none" }}
      onChange={handleFileUpload}
    />
  );
});

export default FileUpload;


