import React, { useState } from "react";
import Button from "../button/Button.jsx";

export default function FilterChip({ label, onToggle }) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    const next = !active;
    setActive(next);
    onToggle(next); // sender kun aktiv-boolean tilbage
  };

  return (
    <Button
      variant="secondary"
      isRounded={true}
      isSelected={active}
      onClick={handleClick}
    >
      {label}
    </Button>
  );
}
