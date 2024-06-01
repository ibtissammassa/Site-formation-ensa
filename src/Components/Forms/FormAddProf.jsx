"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import HorizontalInputGroup from "../ui/extension/horizontalInputGroup";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../Components/ui/form";
import { Input } from "../../Components/ui/input";
import { FormProfSchema } from "@/schema/zodFormSchema";
import { Button } from "../ui/extension/button";
import PasswordInput from "../ui/extension/passwordInput";
import UserRoles from "@/schema/userRoles";
import { useEdgeStore } from "@/lib/edgestore";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

function FormAddProf() {
  const { edgestore } = useEdgeStore();
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(FormProfSchema),
  });

  async function onSubmit(values) {
    try {
      setLoading(true);
      // add image to edge bucket
      const image = values.Image;
      const profileImage = await edgestore.profilePictures.upload({
        file: image,
      });
      // get url
      values.Image = profileImage.url;
      const data = { ...values, role: UserRoles.Teacher };
      const res = await axios.post("/api/prof", data);
      router.refresh();
      toast({
        description: "Prof a été ajouté avec succée.",
        variant: "success",
      });
      console.log("prof added succesfully");
      console.log(res.data);
    } catch (error) {
      console.log("Source FromAddProf : ", error);
    } finally {
      setLoading(false);
    }
  }

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    field.onChange(file instanceof File ? file : null);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <HorizontalInputGroup>
          <FormField
            control={form.control}
            name="nom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prenom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prenom</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </HorizontalInputGroup>
        <HorizontalInputGroup>
          <FormField
            control={form.control}
            name="numeroTele"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numero de telephone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CIN</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </HorizontalInputGroup>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="motDePass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot De Pass</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Image"
          onChange={(e) => {
            const file = e.target.files[0];
            field.onChange(file instanceof File ? file : null);
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image de profile</FormLabel>
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
        <Button type="submit" size="lg" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <></>}
          {loading ? "Attendez" : "Ajouter Prof"}
        </Button>
      </form>
    </Form>
  );
}

export default FormAddProf;
