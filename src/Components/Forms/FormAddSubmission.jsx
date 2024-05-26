import { fileSchema } from "@/schema/zodFormSchema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
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
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(submissionSchema),
  });
  async function onSubmit(values) {
    try {
      setLoading(true);
      // add files to the bucket

      // format the data
      // add soummession
      const formattedsum = [];
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
      console.log(values.submissions);
    } catch (error) {
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
