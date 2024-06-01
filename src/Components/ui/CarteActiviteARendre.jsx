"use client";
import Link from "next/link";
import { useStore } from "@/store/zustand";

function CarteActiviteARendre({ data }) {
  const { title, slug, module, delais, rendu } = data;
  // Extraire la date au format YYYY-MM-DD
  const date_delais = new Date(delais).toISOString().split("T")[0];
  // Extraire l'heure au format HH:MM:SS
  const time_delais = new Date(delais)
    .toISOString()
    .split("T")[1]
    .split(".")[0];
  const role = useStore((state) => state.userRole);

  const ouvert = new Date() < new Date(delais);

  return (
    <div className="border-b py-2 flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        <Link
          href={"/my/travail-a-rendre/" + slug}
          className="font-bold text-gray-700 text-md hover:underline"
        >
          {title}
        </Link>
        {role != "verified student" ? (
          ouvert ? (
            <OuvertFlag />
          ) : (
            <FermeFlag />
          )
        ) : rendu ? (
          <RenduFlag />
        ) : (
          <NonRenduFlag />
        )}
      </div>
      <h2 className="text-sm">{module.name}</h2>
      <div className="flex flex-row justify-between text-sm">
        <span className="text-gray-500 font-semibold">Dernier Délais :</span>
        <span className="text-muted-foreground">
          {date_delais} {time_delais}
        </span>
      </div>
    </div>
  );
}

function RenduFlag() {
  return <span className="text-green-400">Rendu</span>;
}
function NonRenduFlag() {
  return <span className="text-red-400">Non Rendu</span>;
}
function OuvertFlag() {
  return <span className="text-green-400">Ouvert</span>;
}
function FermeFlag() {
  return <span className="text-red-400">Fermé</span>;
}

export default CarteActiviteARendre;
