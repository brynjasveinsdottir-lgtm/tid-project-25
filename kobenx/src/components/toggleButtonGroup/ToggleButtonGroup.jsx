import React, { useState } from "react";
import "./ToggleButtonGroup.css";
import Button from "../button/Button.jsx";

export default function ToggleButtonGroup({
  buttonList,
  onToggleChange,
  firstSelected,
}) {
  const [activeButton, setActiveButton] = useState(firstSelected || null);

  const handleClick = (label) => {
    const newSelection = label === activeButton ? activeButton : label;
    setActiveButton(newSelection);
    onToggleChange(newSelection);
  };

  return (
    <div className="toggle-button-group">
      {buttonList.map((option, index) => (
        <Button
          key={option.label ?? index}
          variant="ghost"
          size="lg"
          isSelected={option.label === activeButton}
          isRounded={true}
          onClick={() => handleClick(option.label)}
        >
          {option.icon}
          {option.label}
        </Button>
      ))}
    </div>
  );
}
