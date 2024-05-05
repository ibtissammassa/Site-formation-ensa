"use client";
import { useState, useEffect } from "react";
import { useStore } from "@/store/zustand";
import { getDataFromToken } from "@/app/actions";
import { X } from "lucide-react";
import { Button } from "@/Components/ui/button";

export default function myLayout({ children }) {
  const [showVerifyMessage, setShowVerifyMessage] = useState(true);
  const setUser = useStore((state) => state.setUser);
  const user = useStore((state) => state.user);
  const setIsLoading = useStore((state) => state.setIsLoading);
  useEffect(() => {
    setIsLoading(true);
    getDataFromToken()
      .then((rs) => {
        setUser(rs);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
        setIsLoading(false);
      });
  }, [setUser, setIsLoading]);
  console.log("user : ", user);
  return (
    <>
      {user.isVerified === true && showVerifyMessage ? (
        <></>
      ) : (
        <div className="flex flex-row justify-between items-center bg-amber-200 text-gray-700 capitalize p-4 text-sm">
          <p>
            Vous avez encoure pas verifier votre email :{" "}
            <span className="underline"> {user.email}</span>
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-amber-100"
            onClick={() => {
              setShowVerifyMessage(false);
            }}
          >
            <X width={20} height={20} />
          </Button>
        </div>
      )}
      {children}
    </>
  );
}
