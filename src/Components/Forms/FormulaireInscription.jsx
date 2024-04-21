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
import { FormInscriptionSchema } from "@/schema/FormSchema";
import { useRouter } from "next/navigation";

function FormulaireInscription() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormInscriptionSchema),
  });

  function onSubmit(values) {
    console.log(values);
    router.push("/my");
  }
  return (
    <div id="SignUp" className="border bordre-gray-100 rounded shadow-lg p-4">
      <h1 className="mb-4 text-xl font-bold">Formulaire d'Inscription</h1>
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
                    <Input placeholder="shadcn" {...field} />
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
                    <Input placeholder="shadcn" {...field} />
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
                    <Input placeholder="shadcn" {...field} />
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
                    <Input placeholder="shadcn" {...field} />
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
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmationEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmation Email</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
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
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmationMotDePass"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmaion Mot De Pass</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

function HorizontalInputGroup({ children }) {
  return (
    <div className="sm:flex sm:flex-row sm:gap-4 sm:mb-4">
      {children.map((element, index) => (
        <div className="sm:w-1/2" key={index}>
          {element}
        </div>
      ))}
    </div>
  );
}

export default FormulaireInscription;
