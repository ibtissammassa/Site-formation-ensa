import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/extension/button";
import { Menu, X } from "lucide-react";
function BurgerMenu() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
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
          <Link href="/" className=" hover:text-red-600 inline-block mx-5">
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
          <Link href="/" className=" hover:text-red-600 inline-block mx-5">
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
    </>
  );
}

export default BurgerMenu;
