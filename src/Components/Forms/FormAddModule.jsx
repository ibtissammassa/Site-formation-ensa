"use client";

import { FromModuleSchema } from "@/schema/zodFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import slugify from "slugify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Button as RedButton } from "../ui/extension/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import ProfSelect from "./ProfSelect";
import { useEdgeStore } from "@/lib/edgestore";
import axios from "axios";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

function FormAddModule() {
  const [chapitres, setChapitres] = useState([]);
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { edgestore } = useEdgeStore();
  const form = useForm({
    resolver: zodResolver(FromModuleSchema),
  });

  async function onSubmit(values) {
    // add module to db
    try {
      setLoading(true);
      // add image to bucket
      const image = values.cover_image;
      const moduleCover = await edgestore.moduleCovers.upload({
        file: image,
      });
      // create module object
      const module = {
        name: values.name,
        slug: slugify(values.name),
        objectif: values.objectif,
        date_debut: values.date_debut,
        date_fin: values.date_fin,
        volume_horaire: {
          total:
            Number(values.volumeCours) +
            Number(values.volumeTd) +
            Number(values.volumeTp),
          cours: Number(values.volumeCours),
          td: Number(values.volumeTd),
          tp: Number(values.volumeTp),
        },
        chapitres: [],
        prof: {
          profId: values.prof._id,
          firstname: values.prof.firstname,
          lastname: values.prof.lastname,
          Image: values.prof.Image,
        },
        semester: Number(values.semester),
        progress: 0,
        coverImage: moduleCover.url,
      };

      const response = await axios.post("/api/module", module);
      console.log("module added succesfully");
      console.log(response.data);
      router.refresh();
      toast({
        description: "Module a été ajouté avec succée.",
        variant: "success",
      });
    } catch (error) {
      console.log("Error adding module:", error);
    } finally {
      setLoading(false);
    }
    console.log(module);
  }

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    field.onChange(file instanceof File ? file : null);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 p-4 m-4"
        >
          <FormField
            control={form.control} // Corrected spelling here
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom Module</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="objectif"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Objectif de module</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="L'objectif attendu de cette module"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date_debut"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date Debut De Module</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Choisir une date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      className="bg-white"
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date_fin"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date Fin De Module</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Choisir une date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      className="bg-white"
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="sm:flex sm:flex-row sm:w-full sm:justify-start sm:gap-6 gap-2 my-4">
            <FormField
              control={form.control}
              name="volumeCours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Volume horaire de cours</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="volumeTd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Volume horaire TD</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="volumeTp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Volume horaire TP</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="prof"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Encadrent</FormLabel>
                <FormControl>
                  <ProfSelect onValueChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="semester"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Semestre</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Semestre de module" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    <SelectItem value="1">semestre 1</SelectItem>
                    <SelectItem value="2">semestre 2</SelectItem>
                    <SelectItem value="3">semestre 3</SelectItem>
                    <SelectItem value="4">semestre 4</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cover_image"
            onChange={(e) => {
              const file = e.target.files[0];
              field.onChange(file instanceof File ? file : null);
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Image</FormLabel>
                <FormControl>
                  <Input
                    id="image"
                    type="file"
                    onChange={(e) => handleFileChange(e, field)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <RedButton type="submit" size="lg" disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <></>
            )}
            {loading ? "Attendez" : "Ajouter Module"}
          </RedButton>
        </form>
      </Form>
    </>
  );
}

export default FormAddModule;
