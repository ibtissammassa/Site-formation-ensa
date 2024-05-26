"use client";
import { useStore } from "@/store/zustand";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { useState } from "react";
export const ModuleSelect = ({ onValueChange }) => {
  const user = useStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [modules, setModules] = useState([]);
  const [fetched, setFetched] = useState(false); // New state to track if data has been fetched

  const fetchModules = async () => {
    if (fetched) return; // Prevent fetching again if already fetched

    setLoading(true);
    try {
      const response = await axios.get(`/api/module?prof=${user.id}`);
      const data = response.data;

      setModules(data.modules);
      setFetched(true); // Mark as fetched
    } catch (error) {
      console.log("Error fetching modules:", error.message);
      setModules([]);
    }
    setLoading(false);
  };

  return (
    <Select
      onOpenChange={(isOpen) => isOpen && fetchModules()}
      onValueChange={onValueChange}
    >
      <SelectTrigger className="w-[400px]">
        <SelectValue placeholder="Select a module" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          <SelectLabel>Your Modules</SelectLabel>
          {loading ? (
            <span>Loading...</span>
          ) : modules.length > 0 ? (
            modules.map((module) => (
              <SelectItem
                key={module.id}
                value={module.name}
                className="cursor-pointer"
              >
                {module.name}
              </SelectItem>
            ))
          ) : (
            <span>No modules found</span>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
