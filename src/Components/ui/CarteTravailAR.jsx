import Link from "next/link";
import { SkeletonCarteTravailAR } from "@/Components/ui/SkeletonCarteTravailAR";
import UserRoles from "@/schema/userRoles";
import { Menu, MenuIcon } from "lucide-react";

function CarteTravailAR({ data, role }) {
  console.log("data", data);
  const { title, detail, slug, module, delais, rendu } = data;

  if (!data || data.length == 0) return <SkeletonCarteTravailAR />;

  // Extraire la date au format YYYY-MM-DD
  const date_delais = new Date(delais).toISOString().split("T")[0];
  // Extraire l'heure au format HH:MM:SS
  const time_delais = new Date(delais)
    .toISOString()
    .split("T")[1]
    .split(".")[0];
  return (
    <div className="p-4 rounded-md border border-gray-200 shadow-md flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        <Link
          href={"/my/travail-a-rendre/" + slug}
          className="font-bold text-gray-700 hover:underline"
        >
          {title}
        </Link>
        {rendu ? <RenduFlag /> : <NonRenduFlag />}
        {/* {role && role === UserRoles.Teacher ? <MenuIcon /> : <></>} */}
      </div>
      <h2 className="text-md">{module.name}</h2>
      <p className="text-sm text-gray-700">{detail}</p>
      <div className="flex flex-row justify-between">
        <span className="text-gray-500 font-semibold">Dernier Délais :</span>
        <span className="text-muted-foreground">
          {date_delais} {time_delais}
        </span>
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

export default CarteTravailAR;
