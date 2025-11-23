//reference: https://blog.back4app.com/how-to-upload-files-to-back4app/
//modified to not upload directly but send the file to parent component (then it gets uploaded to parse when the post is created)
//NEXT UP:modify to forward ref so we can trigger the file upload from a button or an icon in another component

import React, { useRef } from "react";

function FileUpload({ onSelect }) {
  //const inputRef = useRef();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    onSelect(file); //send the file to parent component
  };

  return (
    <form>
      <label htmlFor="file-upload" className="custom-file-upload">
        Choose File
      </label>
      <input
        id="file-upload"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />
    </form>
  );
}

export default FileUpload;
export const ForwardedFileUpload = React.forwardRef(FileUpload);
