import React, { useState } from "react";
import Button from "./Button";
import "./ToggleButtonGroup.css";

export default function ToggleButtonGroup({ buttonList, onToggleChange, firstSelected }) {
  const [activeButton, setActiveButton] = useState(firstSelected || null);

  const handleClick = (buttonName) => {
    const newSelection = buttonName === activeButton ? activeButton: buttonName;
    setActiveButton(newSelection);
    onToggleChange(newSelection);
  };

  return (
    <div className="toggle-button-group">
      {buttonList.map((button, index) => (
        <Button
          key={index}
          variant="secondary"
          isSelected={button === activeButton}
          isRounded={true}
          onClick={() => handleClick(button)}
        >
          {button}
        </Button>
      ))}
    </div>
  );
}
