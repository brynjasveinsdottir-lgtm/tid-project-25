import React, { Children } from "react";
import Button from "./Button";

import { useState } from "react";

export default function FilterChip({children}) {

    const [applied, setApplied] = useState(false); // whether filter is applied

    const handleApplied = () => setApplied(!applied); // toggle filter applied state (creating a toggle button for the filter chið)


    return (
        <Button variant="secondary" onClick={handleApplied} isSelected={applied}  isRounded={true} >
            {children}
        </Button>
        
    );
}