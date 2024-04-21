"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormConnectionSchema } from "@/schema/FormSchema";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function FormulaireLogin() {
  const form = useForm({
    resolver: zodResolver(FormConnectionSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
                  <Input placeholder="***********" {...field} />
                </FormControl>
                <FormDescription>Entrer votre mot de passe.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Connecter</Button>
        </form>
      </Form>
    </div>
  );
}
