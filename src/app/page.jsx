import Image from "next/image";
import Hero from "@/Components/Sections/Hero";
import Pourquoi from "@/Components/Sections/Pourquoi";
import Programme from "@/Components/Sections/Programme";
import Temoignage from "@/Components/Sections/Temoignage";
import Enseignants from "@/Components/Sections/Enseignants";
import { Button } from "@/Components/ui/button";
import Footer from "@/Components/Sections/Footer";
import TeaserVideo from "@/Components/Sections/TeaserVideo";

export default function Home() {
  return (
    <>
      <Hero />
      <Pourquoi />
      <TeaserVideo />
      <Programme />
      <Temoignage />
      <Enseignants />
      <div className="w-full flex h-56 px-28 justify-between items-center">
        <h1 className="font-bold text-3xl">Investissez dans votre avenir en toute confiance.</h1>
        <Button className="text-base" href='#' >Postulez Maintenant</Button>
      </div>
      <Footer />
    </>
  );
}
