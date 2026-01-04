import { useState } from "react";
import Button from "../button/Button.jsx";

export default function FilterChip({ label, onToggle }) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    const activeState = !active;
    setActive(activeState);
    onToggle(activeState);
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
