import React from "react";
import "./Dialog.css";
import ReactDOM from "react-dom";

//importing icons
import CloseIcon from "@mui/icons-material/Close";

//subcomponents only for dialog
export function DialogHeader({ title, onClose, isDismissible, divider}) {
  return (
    <div className={`dialog-header ${divider ? "divider" : ""}`}>      <h2 className="dialog-title">{title}</h2>
      {isDismissible && (
        <CloseIcon className="close-button" onClick={onClose}></CloseIcon>
      )}
    </div>
  );
}

export default function Dialog({
  isOpen,
  onClose,
  closeOnOutsideClick,
  title,
  isDismissible,
  children,
  divider,
  size = "md", //default size
}) {
  //Return statements
  if (!isOpen) {
    return null; // Do not render anything if the dialog should not be open
  }

  return ReactDOM.createPortal(
    <div className="blanket" onClick={closeOnOutsideClick ? onClose : null}>
      <div  className={`dialog dialog--${size}`} onClick={(e) => e.stopPropagation()}>
        <DialogHeader
          title={title}
          isDismissible={isDismissible}
          divider={divider}
          onClose={onClose}
        />
        {children}
      </div>
    </div>,
    document.body

  );
}
