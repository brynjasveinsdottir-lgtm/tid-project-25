import React, { useState } from "react";
import FilterChip from "./FilterChip";
import "./Filters.css";
import { getUserPublic } from "./Services/userService";

//This map translates filter labels to filter objects used in filtering logic (in the HomePage component), The shown filters depend on the filterList prop though.
const filterMap = {
  Event:   { type: "category", value: "Event" },
  Thread:  { type: "category", value: "Thread" },
  Place:   { type: "category", value: "Place" },

  Popular: { type: "popular", value: true },
  New:     { type: "new", value: true },
};

export default function Filters({ filterList, onFilterChange }) {
  const handleToggle = (label, isActive) => {
    const filterObj = filterMap[label];
    onFilterChange(filterObj, isActive);
  };

  return (
    <div className="filters">
      {filterList.map((label, i) => (
        <FilterChip
          key={i}
          label={label}
          onToggle={(state) => handleToggle(label, state)}
        />
      ))}
    </div>
  );
}