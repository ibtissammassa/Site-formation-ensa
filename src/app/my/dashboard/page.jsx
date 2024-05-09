"use client"
import CarteActiviteARendre from "@/Components/ui/CarteActiviteARendre";
import CarteCours from "@/Components/ui/CarteCours";
import { ScrollArea } from "@/Components/ui/scroll-area";
import Link from "next/link";
import { Button } from "@/Components/ui/extension/button";
import { useStore } from "@/store/zustand";
import Loader from "@/app/loading";
import { useEffect, useState } from "react";
import { SkeletonCard } from "@/Components/ui/SkeletonCard";
import { SkeletonList } from "@/Components/ui/SkeletonList";

function Dashboard() {
  const user = useStore((state) => state.user);
  const isLoading = useStore((state) => state.isLoading);
  const role = useStore((state) => state.userRole);

  const firstName = user.firstname || '';
  const lastName = user.lastname || '';

  const courses = useStore((state) => state.courses);
  console.log("courses", courses);
  const fetchCourses = useStore((state) => state.fetchCourses);

  let travailAR = useStore((state) => state.travailAR);
  const fetchTravailAR = useStore((state) => state.fetchTravailAR);

  useEffect(() => {
    fetchCourses();
    fetchTravailAR();
    travailAR = travailAR.filter((item) => item.rendu === false);
  }, []);

  console.log("travailAR", travailAR);


  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="lg:px-28 px-8 2xl:px-80 py-8 flex md:flex-row flex-col gap-12">
      <main className="lg:w-2/3 w-full">
        <h1 className="text-4xl font-bold mb-6">Bienvenu <span className="text-red-500">{firstName} {lastName}</span></h1>
        <div className="flex justify-between mb-6 items-center">
          <h1 className="text-xl font-bold ">Cours Actuels</h1>
          {role === "admin" && (
            <Button className="w-52">Ajouter un Module</Button>
          )}
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-3 mb-5">
          {
            courses.map((data, index) => (
              <CarteCours key={index} data={data} />
            ))
          }
        </div>
        <Link className="underline text-red-600 font-semibold" href="/my/cours">
          Voir tous les cours
        </Link>
      </main>
      <aside className="lg:w-1/3 w-full">
        <div className="p-4 rounded-md border border-gray-200 shadow-md">
          <div className="flex justify-between">
            <h1 className="text-lg font-semibold mb-4">Activité A Rendre</h1>
            <Link className="underline text-red-600 font-semibold" href="/my/travail-a-rendre">
              Voir Tous
            </Link>
          </div>
          <ScrollArea className="h-[400px]">
            <div className="mr-3">
              {
                travailAR.length === 0 ? (<SkeletonList />) : (
                  travailAR.map((todo, index) => (
                    <CarteActiviteARendre key={index} data={todo} />
                  ))
                )
              }

            </div>
          </ScrollArea>
        </div>
      </aside>
    </div>
  );
}

export default Dashboard;
