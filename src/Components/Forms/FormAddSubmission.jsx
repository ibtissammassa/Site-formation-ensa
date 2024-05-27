"use client";

import { fileSchema } from "@/schema/zodFormSchema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { removeExtension } from "@/lib/utils";
import axios from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/extension/button";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useRouter } from "next/navigation";
const submissionSchema = z.object({
  submissions: z
    .union([
      fileSchema,
      z
        .array(fileSchema)
        .max(5, { message: "Cannot upload more than 5 files" }),
    ])
    .optional(),
});

function FormAddSubmission() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { edgestore } = useEdgeStore();
  const form = useForm({
    resolver: zodResolver(submissionSchema),
  });
  async function onSubmit(values) {
    try {
      setLoading(true);
      // add files to the bucket
      const formattedSubmissions = [];
      if (values.submissions) {
        console.log("in loop");
        if (values.submissions instanceof File) {
          const res = await edgestore.publicFiles.upload({
            file: values.submissions,
          });
          formattedSubmissions.push({
            title: removeExtension(values.submissions.name),
            url: res.url,
          });
        } else {
          values.submissions.map(async (file) => {
            const res = await edgestore.publicFiles.upload({
              file,
            });
            formattedSubmissions.push({
              title: removeExtension(file.name),
              url: res.url,
            });
          });
        }
      }
      // add the ressources data to the database
      const resourceObjs = await axios.post("/api/ressource", {
        ressources: formattedSubmissions,
      });
      // fromat the soumession data object
      const data = {
        travail: slug,
        submissionDate: Date.now(),
        student: user.id,
        ressources: resourceObjs.data.savedRessources.map((res) => res._id),
      };
      // add travailAR to the database
      const newSoummession = await axios.post("/api/submissions", data);
      router.refresh();
      console.log("formated submissions : ", formattedSubmissions);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }
  const handleFileChange = (e, field) => {
    const files = Array.from(e.target.files);
    field.onChange(files.length === 1 ? files[0] : files);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="submissions"
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
        <Button type="submit" size="lg" disabled={loading ? true : false}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <></>}
          {loading ? "Attendez" : "Soummetre"}
        </Button>
      </form>
    </Form>
  );
}

export default FormAddSubmission;
