import Image from "next/image";
import Hero from "@/Components/Sections/Hero";
import Pourquoi from "@/Components/Sections/Pourquoi";
import Programme from "@/Components/Sections/Programme";
import Temoignage from "@/Components/Sections/Temoignage";
import Enseignants from "@/Components/Sections/Enseignants";
import { Button } from "@/Components/ui/button";
import TeaserVideo from "@/Components/Sections/TeaserVideo";

export default function Home() {
  return (
    <>
      <Hero />
      <Pourquoi />
      <TeaserVideo />
      <Programme format="cards" />
      <Temoignage />
      <Enseignants />
      <div className="w-full gap-3 flex flex-col lg:flex-row h-56 px-8 md:px-12 lg:px-28 2xl:px-40 justify-center lg:justify-between items-start lg:items-center">
        <h1 className="font-bold md:text-3xl text-2xl">Investissez dans votre avenir en toute confiance.</h1>
        <Button className="md:text-base" href='/Inscription' >Postulez Maintenant</Button>
      </div>
    </>
  );
}
