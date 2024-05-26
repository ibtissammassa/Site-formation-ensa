"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/Components/ui/button";
import { Button as RedButton } from "@/Components/ui/extension/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/Components/ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { TimePickerDemo } from "../ui/extension/time-picker-demo";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { useEffect, useState } from "react";
import axios from "axios";
import { useStore } from "@/store/zustand";
import { Textarea } from "../ui/textarea";
import slugify from "slugify";

function removeExtension(fileName) {
  // Find the last occurrence of '.' to get the position of the file extension
  const dotIndex = fileName.lastIndexOf(".");

  // If a dot is found and it's not the first character (i.e., not a hidden file), remove the extension
  if (dotIndex !== -1 && dotIndex > 0) {
    return fileName.substring(0, dotIndex);
  }

  // If no extension found or the dot is the first character (hidden file), return the original file name
  return fileName;
}

const fileSchema = z.instanceof(File).refine(
  (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    return file.size <= maxSize;
  },
  {
    message: "Each file must be less than 5MB",
  }
);

const addTARSchema = z.object({
  title: z.string().min(5, { message: "Title is required" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description must be less than 500 characters" }),
  limitDateAndTime: z.date().refine((date) => date >= new Date(), {
    message: "Date must be in the future",
  }),
  resources: z
    .union([
      fileSchema,
      z
        .array(fileSchema)
        .max(5, { message: "Cannot upload more than 5 files" }),
    ])
    .optional(),
  module: z.string(),
});

function FormulaireAddTravail() {
  const form = useForm({
    resolver: zodResolver(addTARSchema),
  });

  async function onSubmit(values) {
    // const { title, slug, moduleName, delais, rendu, detail, ressources }
    const formattedResources =
      values.resources.length > 0
        ? values.resources instanceof File
          ? [
              {
                title: removeExtension(values.resources.name),
                url: values.resources.name,
              },
            ]
          : values.resources.map((file) => {
              return {
                title: removeExtension(file.name),
                url: file.name,
              };
            })
        : [];
    // add the resources and get the ids
    const resourceObjs = await axios.post("/api/ressource", {
      ressources: formattedResources,
    });

    // console.log(formattedResources);
    const data = {
      title: values.title,
      slug: slugify(values.title) + Math.floor(Math.random() * 9001) + 1000,
      moduleName: values.module,
      delais: values.limitDateAndTime,
      rendu: 0,
      detail: values.description,
      resources: resourceObjs.data.savedRessources.map((res) => res._id),
    };

    // console.log(data);
    const newTAR = await axios.post("/api/travailAR", data);
    console.log(newTAR);
  }

  // Custom onChange handler to convert FileList to Array of Files
  const handleFileChange = (e, field) => {
    const files = Array.from(e.target.files);
    field.onChange(files.length === 1 ? files[0] : files);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>The title of the assignment</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                The description of the assignment
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="module"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Module</FormLabel>
              <FormControl>
                <ModuleSelect onValueChange={field.onChange} />
              </FormControl>
              <FormDescription>Module de travail a rendre</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="limitDateAndTime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-left">Deadline</FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP HH:mm:ss")
                      ) : (
                        <span>Select date and time</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                </FormControl>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    className="bg-white"
                    initialFocus
                  />
                  <div className="p-3 border-t border-border bg-white">
                    <TimePickerDemo
                      setDate={field.onChange}
                      date={field.value}
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <FormMessage />
              <FormDescription>The deadline for the assignment</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="resources"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resources</FormLabel>
              <FormControl>
                <Input
                  id="resources"
                  type="file"
                  multiple
                  onChange={(e) => handleFileChange(e, field)}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                The resources needed for the assignment
              </FormDescription>
            </FormItem>
          )}
        />
        <RedButton type="submit">Add</RedButton>
      </form>
    </Form>
  );
}

const ModuleSelect = ({ onValueChange }) => {
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

export default FormulaireAddTravail;
