import React from "react";
import "./Button.css";

export default function Button({
  variant = "primary", //default is primary, maybe it should be secondary?
  isSelected = false,
  isRounded = false,
  isBlock = false,
  disabled = false,
  onClick,
  children,
  className = '',
  ...props
}) {
  // Define button classes based on variant and selection state e.g. [button, button--primary, button--primary--selected]
  const classes = [
    "button",
    `button--${variant}`,
    isRounded ? "button--rounded" : "",
    isBlock ? "button--isBlock" : "",
    isSelected ? `button--${variant}-selected` : "",
    className,
  ].join(" ");

  return (
    <button className={classes} onClick={onClick} {...props} disabled={disabled}>
      {children}
    </button>
  );
}
