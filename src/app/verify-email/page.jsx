"use client";
import { Button } from "@/Components/ui/extension/button";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
function VerificationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const verifyUser = async () => {
    try {
      const respounce = await axios.get(`/api/verifyemail?token=${token}`);
      return respounce;
    } catch (error) {
      console.log("error :", error);
    }
  };
  const updateToken = async () => {
    try {
      await axios.post("/api/change-token", {
        isVerified: true,
      });
    } catch (error) {
      console.log("error :", error);
    }
  };
  useEffect(() => {
    try {
      const res = verifyUser();
      console.log("api call respounse : ", res);
      updateToken();
    } catch (error) {
      console.log("error : ", error);
    }
  }, []);
  return (
    <div className="h-[80vh] flex justify-center items-center">
      <div className="py-4 text-center">
        <p>
          Vous avez verifier votre addresse email{" "}
          <span className="underline">{email}</span> avec success !
        </p>
        <span>
          vous pouvez fermer cette page et retourner a votre espace connecté.
        </span>
        <Button variant="link" href="/" className="text-red-400">
          {" "}
          Retourner au dashboard
        </Button>
      </div>
    </div>
  );
}

export default VerificationPage;
