"use client";
import axios from "axios";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import React from "react";
const ProfSelect = ({ onValueChange }) => {
  const [loading, setLoading] = useState(false);
  const [profs, setProfs] = useState([]);
  const [fetched, setFetched] = useState(false); // New state to track if data has been fetched

  const fetchProfs = async () => {
    if (fetched) return; // Prevent fetching again if already fetched

    setLoading(true);
    try {
      const response = await axios.get(`/api/prof`);
      const data = response.data;

      setProfs(data.profs);
      setFetched(true); // Mark as fetched
    } catch (error) {
      console.log("Error fetching modules:", error.message);
      setProfs([]);
    }
    setLoading(false);
  };

  const handleChange = (value) => {
    const prof = profs.find((prof) => prof.lastname === value);
    onValueChange(prof);
  };

  return (
    <Select
      onOpenChange={(isOpen) => isOpen && fetchProfs()}
      onValueChange={handleChange}
    >
      <SelectTrigger className="w-[400px]">
        <SelectValue placeholder="Select a module" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          <SelectLabel>Encadrent de module</SelectLabel>
          {loading ? (
            <span>Loading...</span>
          ) : profs.length > 0 ? (
            profs.map((prof) => (
              <SelectItem
                key={prof.id}
                value={prof.lastname}
                className="cursor-pointer"
              >
                {prof.lastname}
              </SelectItem>
            ))
          ) : (
            <span>No prof found</span>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default ProfSelect;
