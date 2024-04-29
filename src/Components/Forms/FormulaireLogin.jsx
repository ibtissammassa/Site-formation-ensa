"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/extension/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../Components/ui/form";
import { Input } from "../../Components/ui/input";
import { FormConnectionSchema } from "@/schema/zodFormSchema";
import axios from "axios";
import PasswordInput from "../ui/extension/passwordInput";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

export function FormulaireLogin() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(FormConnectionSchema),
  });

  async function onSubmit(values) {
    try {
      setLoading(true);
      const responce = await axios.post("/api/login", values);
      toast({
        description: "Bienvenue dans votre espace connecté.",
        variant: "success",
      });
      router.refresh();
    } catch (error) {
      if (error.response.status === 400) {
        form.setError("email", { message: "Vous étes pas inscrit." });
      } else if (error.response.status === 401) {
        form.setError("password", { message: "Mot de passe invalide." });
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border border-gray-300 shadow-lg rounded-lg w-3/4 p-6">
      <h1 className="mb-4 text-xl font-bold">Connection</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormDescription>Entrer votre email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot De Passe</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormDescription>Entrer votre mot de passe.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button type="submit" disabled={loading}>
              {" "}
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <></>
              )}
              Connecter
            </Button>
            <p className="text-sm text-gray-600">
              Vous avez{" "}
              <Link href="#" className="underline">
                oublié le mot de passe
              </Link>
              ?
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
