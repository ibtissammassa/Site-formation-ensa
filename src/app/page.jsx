import Image from "next/image";
import Hero from "@/Components/Sections/Hero";
import Pourquoi from "@/Components/Sections/Pourquoi";
import Programme from "@/Components/Sections/Programme";
import Temoignage from "@/Components/Sections/Temoignage";
import Enseignants from "@/Components/Sections/Enseignants";
import { Button } from "@/Components/ui/button";
import Footer from "@/Components/Sections/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Pourquoi />
      <div className="h-[90vh] py-10 px-56 flex items-center justify-center w-full">
        <iframe className="w-full rounded-md h-full" src="https://www.youtube.com/embed/rLsjtEClNYU" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen frameBorder="0"></iframe>
      </div>
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
