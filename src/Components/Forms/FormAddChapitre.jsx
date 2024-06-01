"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { z } from "zod";
import { Button } from "../ui/button";
import { Button as RedButton } from "../ui/extension/button";
import AddChapElementForm from "./AddChapElementForm";
import { fileSchema } from "@/schema/zodFormSchema";
import { useEdgeStore } from "@/lib/edgestore";
import axios from "axios";
import { removeExtension } from "@/lib/utils";

const FormChapitreSchema = z.object({
  title: z.string(),
  description: z.string(),
  ressources: z
    .union([
      fileSchema,
      z
        .array(fileSchema)
        .max(5, { message: "Cannot upload more than 5 files" }),
    ])
    .optional(),
});

const FormAddChapitre = ({ slug }) => {
  const { edgestore } = useEdgeStore();
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(FormChapitreSchema),
  });
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      console.log("submitting ...");
      const formattedResources = [];
      if (data.ressources) {
        console.log("in loop");
        if (data.ressources instanceof File) {
          const res = await edgestore.publicFiles.upload({
            file: data.ressources,
          });
          console.log("file uploaded");
          formattedResources.push({
            title: removeExtension(data.ressources.name),
            url: res.url,
          });
        } else {
          data.ressources.map(async (file) => {
            const res = await edgestore.publicFiles.upload({
              file,
            });
            console.log("file uploaded");
            formattedResources.push({
              title: removeExtension(file.name),
              url: res.url,
            });
          });
        }
        // add the ressources data to the database
        const resourceObjs = await axios.post("/api/ressource", {
          ressources: formattedResources,
        });
        console.log("ressources added successfuly");
        const chapitre = {
          num: 3,
          title: data.title,
          description: data.description,
          elements,
          ressources: resourceObjs.data.savedRessources.map((res) => res._id),
        };
        const res = await axios.post(`/api/module/${slug}`, { chapitre });
        console.log(res.data);
        console.log("chapitre added successfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleFileChange = (e, field) => {
    const files = Array.from(e.target.files);
    field.onChange(files.length === 1 ? files[0] : files);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 p-4 m-4"
      >
        <FormField
          control={form.control} // Corrected spelling here
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre chapitre</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description Chapitre</FormLabel>
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
        <div>
          {elements.length > 0 ? (
            <div className="mb-4">
              <div className="mb-2 text-md font-semibold">Elements :</div>
              {elements.map((element, index) => (
                <div key={index}>- {element}</div>
              ))}
            </div>
          ) : (
            <div className="mb-2 text-sm">pas d'element</div>
          )}
          <Dialog>
            <DialogTrigger>
              <Button variant="outline">Ajouté element</Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle className="mb-4">Ajouté un element</DialogTitle>
                <DialogDescription>
                  <AddChapElementForm
                    elements={elements}
                    setElements={setElements}
                  />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <FormField
          control={form.control}
          name="ressources"
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
        <RedButton type="submit" size="lg" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <></>}
          {loading ? "Attendez" : "Ajouter"}
        </RedButton>
      </form>
    </Form>
  );
};

export default FormAddChapitre;
