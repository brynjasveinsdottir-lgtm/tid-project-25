import React from "react";
import FilterChip from "./FilterChip";
import "./Filters.css";

import { useState } from "react";

export default function Filters({ }) {


    return (   
        <div className="filters">
            <FilterChip  />
            <FilterChip  />
            <FilterChip  />
            <FilterChip  />
        </div>

    );
}