import React, { useState } from "react";
import Button from "./Button";

export default function FilterChip({ children, onToggle }) {
  const [applied, setApplied] = useState(false);

  const handleApplied = () => {
    const newState = !applied;
    setApplied(newState);

    // Notify parent
    if (onToggle) {
      onToggle(children, newState);
    }
  };

  return (
    <Button
      variant="secondary"
      onClick={handleApplied}
      isSelected={applied}
      isRounded={true}
    >
      {children}
    </Button>
  );
}