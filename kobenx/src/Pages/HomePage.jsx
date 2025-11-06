import React from "react";
import TextField from "../components/TextField";

import FilterChip from "../components/FilterChip";

import Filters from "../components/Filters";

export default function Home() {
  return (
    <div className="page-structure">
      <h1 className="page-title">Home</h1>
      <TextField />

      <FilterChip />

      <Filters />


    </div>
  );
}