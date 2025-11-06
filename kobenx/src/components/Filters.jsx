import React from "react";
import FilterChip from "./FilterChip";
import "./Filters.css";

import { useState } from "react";

export default function Filters({ filterList}) {


    return (   
        <div className="filters">

            {filterList.map((filter, index) => (
                <FilterChip key={index}>
                    {filter}
                </FilterChip>
            ))}

        </div>

    );
}