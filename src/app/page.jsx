import Image from "next/image";
import Hero from "@/Components/Sections/Hero";
import Pourquoi from "@/Components/Sections/Pourquoi";
import Programme from "@/Components/Sections/Programme";

export default function Home() {
  return (
    <>
      <Hero />
      <Pourquoi />
      <div className="h-[90vh] py-10 px-56 flex items-center justify-center w-full">
        <iframe className="w-full rounded-md h-full" src="https://www.youtube.com/embed/rLsjtEClNYU" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen frameBorder="0"></iframe>
      </div>
      <Programme />
    </>
  );
}
