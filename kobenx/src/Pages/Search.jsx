import React from "react";
import { useState, useEffect } from "react";
import Parse from "parse";
import SearchBar from "../components/SearchBar";

export default function Search() {
  return (
    <div className="page-structure">
      <h1 className="page-title">Search</h1>
        <SearchBar></SearchBar>
    </div>
  );
}
