"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/store/zustand";
import { getDataFromToken } from "@/app/actions";
import { Loader2Icon, X } from "lucide-react";
import { Button } from "@/Components/ui/button";

export default function MyLayout({ children }) {
  const router = useRouter();
  const path = usePathname();
  const [hideVerifyMessage, setHideVerifyMessage] = useState(false);
  const { setUser, setUserRole, user, setIsLoading, isLoading } = useStore(
    (state) => ({
      isLoading: state.isLoading,
      setUser: state.setUser,
      setUserRole: state.setUserRole,
      user: state.user,
      setIsLoading: state.setIsLoading,
    })
  );

  useEffect(() => {
    setIsLoading(true);
    getDataFromToken()
      .then((res) => {
        setUser(res);
        setUserRole(res.role);
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        if (path !== "/my/unverified") setIsLoading(false);
      });
  }, [setUser, setUserRole, setIsLoading]);

  // Redirect unverified users immediately after loading user information
  useEffect(() => {
    if (user.role === "unverified student") {
      router.push("/my/unverified");
      if (path === "/my/unverified") {
        setIsLoading(false);
      }
    }
  }, [user, path]);

  if (isLoading) {
    return (
      <div className="h-[80vh] w-full flex justify-center items-center">
        <Loader2Icon className="h-9 w-9 animate-spin" />
      </div>
    );
  }

  return (
    <>
      {!user.isVerified && !hideVerifyMessage ? (
        <div className="flex flex-row justify-between items-center bg-amber-200 text-gray-700 capitalize p-4 text-sm">
          <p>
            Vous avez encore pas verifié votre email:{" "}
            <span className="underline">{user.email}</span>
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-amber-100"
            onClick={() => setHideVerifyMessage(!hideVerifyMessage)}
          >
            <X width={20} height={20} />
          </Button>
        </div>
      ) : (
        <></>
      )}
      {children}
    </>
  );
}
