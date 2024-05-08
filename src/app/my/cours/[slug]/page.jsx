'use client'
import Image from "next/image";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion"
import CarteActiviteARendre from "@/Components/ui/CarteActiviteARendre";
import { ScrollArea } from "@/Components/ui/scroll-area";
import file_down from "../../../../../public/file-down.svg";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/extension/button";
import { Trash2 } from "lucide-react";
import { useStore } from "@/store/zustand";
import Loader from "@/app/loading";
import { useEffect, useState } from "react";
import { SkeletonList } from "@/Components/ui/SkeletonList";


function FormationPage({ params }) {
    const { slug } = params;
    const [course, setCourse] = useState(null);
    const role = useStore((state) => state.userRole);

    useEffect(() => {
        fetch(`/api/module/${slug}`).then((res) => res.json()).then((data) => {
            setCourse(data.module);
        });
    }, []);

    if (!course) return <Loader />

    const { name, objectif, volume_horaire, date_debut, date_fin, chapitres, prof } = course;
    const datedebut = new Date(date_debut);
    const datefin = new Date(date_fin);
    // Extraire la date au format YYYY-MM-DD
    const start_date = datedebut.toISOString().split('T')[0];
    const end_date = datefin.toISOString().split('T')[0];

    return (
        <div className="lg:px-28 px-8 2xl:px-80 py-8 flex gap-7 flex-col">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/my/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/my/cours">Cours</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex flex-col gap-3">
                <h1 className="md:text-4xl text-3xl font-bold">{name}</h1>
                <p className="text-slate-700 md:text-sm text-xs">Encadré par: {prof.firstname} {prof.lastname}</p>
            </div>

            {role === "admin" && (<div className="inline-flex gap-3">
                <Button className="w-40">Modifier</Button>
                <Button variant="outline" className="w-40">Supprimer</Button>
            </div>
            )}

            <div className="flex md:flex-row flex-col gap-5 md:justify-between">
                <main className="lg:w-[62%] w-full text-left">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                <h2 className="font-bold md:text-xl text-lg">Objectif du Cours</h2>
                            </AccordionTrigger>
                            <AccordionContent>
                                {objectif}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger><h2 className="font-bold md:text-xl text-lg">Plan du Cours</h2></AccordionTrigger>
                            <AccordionContent>
                                <ul className="list-decimal pl-6">
                                    {chapitres.map((chapitre) => (
                                        <li key={chapitre.num}>
                                            <h3 className="font-semibold">{chapitre.title}</h3>
                                            <ul className="list-disc p-1 pl-5 ">
                                                {chapitre.elements.map((element, index) => (
                                                    <li className="my-1 text-xs" key={index}>{element}</li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        {
                            chapitres.map((chapitre, index) => (
                                <AccordionItem value={"item-" + (index + 3)}>
                                    <AccordionTrigger><h2 className="font-bold md:text-lg text-left">Chapitre {chapitre.num}: {chapitre.title}</h2></AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-xs">{chapitre.description}</p>
                                        {
                                            chapitre.ressources && <div className="my-3">
                                                <h3 className="font-semibold mb-1">Resources du cours :</h3>
                                                {
                                                    chapitre.ressources.map((ressource, index) => (
                                                        <div className="flex justify-between items-center" key={index}>
                                                            <div className="inline-flex items-center my-2">
                                                                <Image src={file_down} width={20} alt="file-down" />
                                                                <Link href={ressource.url} target="_blank" className="text-sm underline hover:text-red-400 ml-2">{ressource.title}</Link>
                                                            </div>
                                                            {role === "teacher" && <Link href='#' target="_blank"><Trash2 className="w-4 hover:text-red-600" /></Link>}
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        }
                                    </AccordionContent>
                                </AccordionItem>
                            ))
                        }
                    </Accordion>
                </main>
                <aside className="lg:w-1/3 w-full">
                    <div className="p-4 rounded-md border border-gray-200 shadow-md mb-4 flex flex-col gap-3">
                        <h1 className="text-lg font-semibold mb-4">Détails de cours</h1>
                        <div>
                            <h3 className="font-semibold text-sm">Encadré par:</h3>
                            <div className="flex flex-row items-center gap-3 my-2">
                                <Avatar className="w-[40px] h-[40px]">
                                    <AvatarImage src={prof.Image} />
                                    <AvatarFallback>{`${prof.firstname.charAt(
                                        0
                                    )}${prof.lastname.charAt(0)}`}</AvatarFallback>
                                </Avatar>
                                <span id="nom-prof" className="text-sm">
                                    {`${prof.firstname} ${prof.lastname}`}
                                </span>
                            </div>
                        </div>
                        <div>
                            <div className="font-semibold text-sm inline-flex gap-5">
                                <h3 >Volume Horaire :</h3>
                                <h3>{volume_horaire.total}h</h3>
                            </div>
                            <div className="px-4 py-2 w-[50%] flex flex-col gap-2">
                                <div className="text-sm inline-flex justify-between">
                                    <p >Cours :</p>
                                    <p>{volume_horaire.cours}h</p>
                                </div>
                                <div className="text-sm inline-flex justify-between">
                                    <p >TD :</p>
                                    <p>{volume_horaire.td}h</p>
                                </div>
                                <div className="text-sm inline-flex justify-between">
                                    <p >TP :</p>
                                    <p>{volume_horaire.tp}h</p>
                                </div>
                            </div>
                        </div>
                        <div className="inline-flex gap-5 font-semibold text-sm">
                            <h3 className="">Date début estimé :</h3>
                            <h3>{start_date}</h3>
                        </div>
                        <div className="inline-flex gap-5 font-semibold text-sm">
                            <h3 className="">Date fin estimé : </h3>
                            <h3>{end_date}</h3>
                        </div>
                    </div>
                    <div className="p-4 rounded-md border border-gray-200 shadow-md">
                        <h1 className="text-lg font-semibold mb-4">Activité A Rendre</h1>
                        <ScrollArea className="h-[400px]">
                            {/* {
                                <div className="mr-3">
                                    {
                                        travailAR.length === 0 ? (<SkeletonList />) : (
                                            travailAR.map((todo, index) => (
                                                <CarteActiviteARendre key={index} data={todo} />
                                            ))
                                        )
                                    }

                                </div>
                            } */}
                        </ScrollArea>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default FormationPage;