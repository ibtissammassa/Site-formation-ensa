"use client"
import Image from "next/image";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb"
import file_down from "../../../../../public/file-down.svg";
import Link from "next/link";
import { useStore } from "@/store/zustand";
import { useEffect, useState } from "react";
import Loader from "@/app/loading";
import { Input } from "@/Components/ui/input";
import { Trash2 } from "lucide-react";
import SubmissionsTable from "@/Components/Sections/SubmissionsTable";

function TravailDetail({ params }) {
    const role = useStore((state) => state.userRole);
    const [travailAR, setTravailAR] = useState(null);
    const { slug } = params;
    const [loadingSubscriptions, setloadingSubscriptions] = useState(false);

    useEffect(() => {
        fetch(`/api/travailAR/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("data", data);
                setTravailAR(data.travail);
                console.log("travailAR", travailAR);
            })
            .catch((error) => {
                console.error("Error fetching travailAR:", error);
            });

        fetch(`/api/submissions`).then((res) => res.json()).then((data) => {
            setSubmissions(data.submissions);
        }).catch((error) => {
            console.error("Error fetching submissions:", error);
        });
    }, []);
    const [submissions, setSubmissions] = useState([]);
    if (!travailAR) return <Loader />
    const { title, detail, module, delais, rendu, ressources } = travailAR;
    const courSlug = module.slug;
    const cours = module.name;

    // Extraire la date au format YYYY-MM-DD
    const date_delais = new Date(delais).toISOString().split('T')[0];
    // Extraire l'heure au format HH:MM:SS
    const time_delais = new Date(delais).toISOString().split('T')[1].split('.')[0];

    return (
        <div className="lg:px-28 px-8 2xl:px-80 py-8 flex gap-7 flex-col">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/my/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/my/travail-a-rendre">A rendre</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={"/my/cours/" + courSlug}>{cours}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex md:flex-row flex-col gap-5 md:justify-between">
                <main className="lg:w-[62%] w-full text-left flex flex-col gap-3">
                    <div className="flex flex-col gap-3">
                        <h1 className="md:text-4xl text-3xl font-bold">{title}</h1>
                        <p className="text-slate-700 md:text-sm text-xs">{cours}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span className="text-gray-500 font-semibold">A rendre avant :</span>
                        <span className="text-muted-foreground">{date_delais} {time_delais}s</span>
                    </div>
                    <p className="text-sm text-gray-900">{detail}</p>
                    <div>
                        <h2 className="font-bold md:text-lg text-left">Ressourses :</h2>
                        {
                            ressources.map((ressource, index) => (
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
                    <div>
                        {
                            role === "teacher" && <div>
                                <h2 className="font-bold md:text-lg text-left">Soumissions :</h2>
                                <SubmissionsTable submissions={submissions} loading={loadingSubscriptions} />
                            </div>
                        }
                    </div>
                </main>
                {
                    role === "student" &&
                    <aside className="lg:w-1/3 w-full">
                        <div className="p-4 rounded-md border border-gray-200 shadow-md mb-4 flex flex-col gap-3 h-36">
                            <div className="flex flex-row justify-between items-center">
                                <h3 className="font-bold text-gray-900">Soumettez votre travail</h3>
                                {rendu ? <RenduFlag /> : <NonRenduFlag />}
                            </div>
                            <Input type="file" className='cursor-pointer' multiple={true} />
                        </div>
                    </aside>
                }
            </div>
        </div>
    );
}

function RenduFlag() {
    return <span className="rounded-lg bg-green-400 text-xs text-white p-1.5">Rendu</span>;
}

function NonRenduFlag() {
    return <span className="rounded-lg bg-red-400 text-xs text-white p-1.5">Non Rendu</span>;
}

export default TravailDetail;