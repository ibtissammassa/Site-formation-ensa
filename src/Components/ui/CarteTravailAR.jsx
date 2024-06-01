"use client";
import Link from "next/link";
import { SkeletonCarteTravailAR } from "@/Components/ui/SkeletonCarteTravailAR";
import { useStore } from "@/store/zustand";

function CarteTravailAR({ data }) {
    console.log('data', data);
    const { title, detail, slug, module, delais, rendu } = data;
    const role = useStore((state) => state.userRole);

  if (!data || data.length == 0) return <SkeletonCarteTravailAR />;
    // Extraire la date au format YYYY-MM-DD
    const date_delais = new Date(delais).toISOString().split('T')[0];
    // Extraire l'heure au format HH:MM:SS
    const time_delais = new Date(delais).toISOString().split('T')[1].split('.')[0];

    const ouvert = new Date() < new Date(delais);

    return (
        <div className="p-4 rounded-md border border-gray-200 shadow-md flex flex-col gap-2">
            <div className="flex flex-row justify-between">
                <Link href={'/my/travail-a-rendre/' + slug} className="font-bold text-gray-700 hover:underline">{title}</Link>
                {role != "verified student" ? (ouvert ? <OuvertFlag /> : <FermeFlag />) : (rendu ? <RenduFlag /> : <NonRenduFlag />)}
            </div>
            <h2 className="text-md">{module.name}</h2>
            <p className="text-sm text-gray-700">{detail.slice(0, 90)} ...</p>
            <div className="flex flex-row justify-between">
                <span className="text-gray-500 font-semibold">Dernier Délais :</span>
                <span className="text-muted-foreground">{date_delais} {time_delais}</span>
            </div>
        </div>
    );
}

function RenduFlag() {
  return (
    <span className="rounded-lg bg-green-400 text-sm text-white p-1.5">
      Rendu
    </span>
  );
}

function NonRenduFlag() {
  return (
    <span className="rounded-lg bg-red-400 text-sm text-white p-1.5">
      Non Rendu
    </span>
  );
}
function OuvertFlag() {
    return <span className="text-green-400">Ouvert</span>;
}
function FermeFlag() {
    return <span className="text-red-400">Fermé</span>;
}

export default CarteTravailAR;
