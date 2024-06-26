"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/extension/button";
import axios from "axios";
import { LogOutIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "@/store/zustand";

function CarteProfile() {
  const user = useStore((state) => state.user);
  const isLoading = useStore((state) => state.isLoading);
  const [signingOut, setSigningOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setSigningOut(true);
      await axios.get("/api/logout");
      router.refresh();
    } catch (error) {
      console.log(error.message);
    } finally {
      setSigningOut(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center gap-2 text-center">
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <>
          <h3 className="text-sm font-meduim text-gray-900">{user.email}</h3>
          <Avatar className="h-[80px] w-[80px]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>TM</AvatarFallback>
          </Avatar>
          <h1 className="text-lg font-bold">
            {user.firstname} {user.lastname}
          </h1>
          <h2 className="text-sm font-medium text-gray-500">
            Cybersecurity & Intelligence Artificielle
          </h2>
          <span className="text-xs text-muted-foreground">
            Première année, Semester 2
          </span>

          <Button
            variant="ghost"
            className="w-full border-t mt-2"
            onClick={handleLogout}
            disabled={signingOut}
          >
            {signingOut ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LogOutIcon />
            )}
            Déconnecter
          </Button>
        </>
      )}
    </div>
  );
}

export default CarteProfile;
