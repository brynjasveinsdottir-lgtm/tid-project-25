import React from "react";
import "./Button.css";

export default function Button({
  variant = "primary", //default is primary, maybe it should be secondary?
  isSelected = false,
  isRounded = false,
  onClick,
  children,
  ...props
}) {
  // Define button classes based on variant and selection state e.g. [button, button--primary, button--primary--selected]
  const classes = [
    "button",
    `button--${variant}`,
    isRounded ? "button--rounded" : "",
    isSelected ? `button--${variant}-selected` : "",
  ].join(" ");

  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
