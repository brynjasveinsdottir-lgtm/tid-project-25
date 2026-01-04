import { forwardRef, useImperativeHandle, useRef } from "react";

const FileUpload = forwardRef(function FileUpload({ onSelect }, ref) {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    triggerSelect() {
      inputRef.current.click();
    },
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
