"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import HorizontalInputGroup from "../ui/extension/horizontalInputGroup";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../Components/ui/form";
import { Input } from "../../Components/ui/input";
import { FormInscriptionSchema } from "@/schema/zodFormSchema";
import { useRouter } from "next/navigation";
import { Button } from "../ui/extension/button";
import PasswordInput from "../ui/extension/passwordInput";
import UserRoles from "@/schema/userRoles";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

function FormulaireInscription() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormInscriptionSchema),
  });

  async function onSubmit(values) {
    const { nom, prenom, numeroTele, cin, email, motDePass } = values;
    const role = UserRoles.UnverifiedStudent;
    const semester = 1;
    const newUser = {
      nom,
      prenom,
      numeroTele,
      cin,
      email,
      motDePass,
      role,
      semester,
    };
    try {
      setLoading(true);
      await axios.post("/api/user", newUser);
      toast({
        description:
          "Vous avez terminé la pre-inscription avec succes, vouz pouvez accédez votre espace connecté.",
        variant: "success",
      });
      router.push("/Login");
    } catch (error) {
      console.log(error);
      if (error.response.status === 400)
        form.setError("email", { message: "Ce email est deja enregistré !" });
      else if (error.response.status === 500)
        form.setError("email", {
          message:
            "Une probleme a étais rencontré pendant l'inscription, ressayé puls tards.",
        });
    } finally {
      setLoading(false);
    }
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
            name="confirmationEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmation Email</FormLabel>
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
            name="confirmationMotDePass"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmaion Mot De Pass</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="lg" disabled={loading ? true : false}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <></>
            )}
            {loading ? "Attendez" : "Inscrire"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default FormulaireInscription;
