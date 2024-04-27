"use client";
import Image from "next/image";
import { Button } from "@/Components/ui/extension/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import ensa_logo from "../../../public/ensa_agadir_logo.svg";
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import CarteProfile from "@/Components/ui/CarteProfile";
import { Bell, Menu, Settings, X } from "lucide-react";
import BurgerMenu from "./BurgerMenu";

export default function NavBar() {
  const session = {};
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // if scrolling down, hide the navbar
        setShowNav(false);
      } else {
        // if scrolling up, showNav the navbar
        setShowNav(true);
      }

      // remember the current page location for the next move
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  const translation = showNav ? "translate-y-0" : "-translate-y-full";

  return (
    <>
      <div
        className={
          translation +
          " transition-transform duration-300 transform flex justify-between py-5 items-center px-12 border-b shadow-sm sticky top-0 bg-white z-50"
        }
      >
        <Link href="/">
          <Image src={ensa_logo} width={45} alt="logo" />
        </Link>
        {!session ? (
          <ul className="hidden lg:block">
            <Link
              href="/"
              className="text-sm hover:text-red-600 inline-block mx-5"
            >
              Home
            </Link>
            <Link
              href="/#Programme"
              className="text-sm hover:text-red-600 inline-block mx-5"
            >
              Programme
            </Link>
            <Link
              href="/#Enseignants"
              className="text-sm hover:text-red-600 inline-block mx-5"
            >
              Enseignants
            </Link>
            <Link
              href="/"
              className="text-sm hover:text-red-600 inline-block mx-5"
            >
              Forum
            </Link>
          </ul>
        ) : (
          <></>
        )}
        {session ? (
          <div className="flex flex-row gap-6 items-center">
            <Settings />
            <Bell />
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>TM</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <CarteProfile />
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <>
            <div className="lg:inline-flex gap-2 hidden">
              <Button className="px-7" href="/Inscription">
                S'inscrire
              </Button>
              <Button variant="ghost" href="/Login">
                Log in
              </Button>
            </div>
            <div className="lg:hidden">
              <div>
                {showMenu ? (
                  <Button
                    onClick={() => {
                      setShowMenu(!showMenu);
                    }}
                    variant="ghost"
                    size="icon"
                  >
                    <X />
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      setShowMenu(!showMenu);
                    }}
                    variant="ghost"
                    size="icon"
                  >
                    <Menu />
                  </Button>
                )}
              </div>
              <div
                className={
                  (showMenu ? "flex " : "hidden ") +
                  "flex-col p-7 gap-5 absolute top-20 py-9 bg-white w-full shadow-md z-50"
                }
              >
                <ul className="flex flex-col gap-3">
                  <Link
                    href="/"
                    className=" hover:text-red-600 inline-block mx-5"
                  >
                    Home
                  </Link>
                  <Link
                    href="/#Programme"
                    className=" hover:text-red-600 inline-block mx-5"
                  >
                    Programme
                  </Link>
                  <Link
                    href="/#Enseignants"
                    className=" hover:text-red-600 inline-block mx-5"
                  >
                    Enseignants
                  </Link>
                  <Link
                    href="/"
                    className=" hover:text-red-600 inline-block mx-5"
                  >
                    Forum
                  </Link>
                </ul>
                <div className="flex flex-col gap-2 px-5">
                  <Button className="px-7" href="/Inscription">
                    S'inscrire
                  </Button>
                  <Button variant="ghost" href="/Login">
                    Log in
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
