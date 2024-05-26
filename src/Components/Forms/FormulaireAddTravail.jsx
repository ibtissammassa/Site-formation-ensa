"use client";

import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
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
import axios from "axios";
import { Textarea } from "../ui/textarea";
import slugify from "slugify";
import { useEdgeStore } from "@/lib/edgestore";
import { removeExtension } from "@/lib/utils";
import { addTARSchema } from "@/schema/zodFormSchema";
import { ModuleSelect } from "./ModuleSelect";
import { useState } from "react";
import { useRouter } from "next/navigation";

function FormulaireAddTravail() {
  const { edgestore } = useEdgeStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(addTARSchema),
  });

  async function onSubmit(values) {
    try {
      setLoading(true);
      const formattedResources = [];
      if (values.resources) {
        console.log("in loop");
        if (values.resources instanceof File) {
          const res = await edgestore.publicFiles.upload({
            file: values.resources,
          });
          formattedResources.push({
            title: removeExtension(values.resources.name),
            url: res.url,
          });
        } else {
          values.resources.map(async (file) => {
            const res = await edgestore.publicFiles.upload({
              file,
            });
            formattedResources.push({
              title: removeExtension(file.name),
              url: res.url,
            });
          });
        }
      }
      // add the ressources data to the database
      const resourceObjs = await axios.post("/api/ressource", {
        ressources: formattedResources,
      });
      // fromat the TravailAR data object
      const data = {
        title: values.title,
        slug: slugify(values.title) + Math.floor(Math.random() * 9001) + 1000,
        moduleName: values.module,
        delais: values.limitDateAndTime,
        rendu: 0,
        detail: values.description,
        ressources: resourceObjs.data.savedRessources.map((res) => res._id),
      };
      // add travailAR to the database
      const newTAR = await axios.post("/api/travailAR", data);
      router.push("/my/travail-a-rendre");
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
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
        <RedButton type="submit" size="lg" disabled={loading ? true : false}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <></>}
          {loading ? "Attendez" : "Ajouter"}
        </RedButton>
      </form>
    </Form>
  );
}

export default FormulaireAddTravail;
