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

//data
import { todos } from "@/data/travailAR";
import { courses } from "@/data/courses";

function TravailDetail({ params }) {
    const role = "student";
    const { slug } = params;
    const { title, detail, cours, delais, rendu } = todos.find((todo) => todo.slug === slug);
    const course = courses.find((course) => course.courseName === cours);
    const coursSlug = course.slug;
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
                        <BreadcrumbLink href={"/my/cours/" + coursSlug}>{cours}</BreadcrumbLink>
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
                        <span className="text-muted-foreground">{delais}</span>
                    </div>
                    <p className="text-sm text-gray-900">{detail}</p>
                    <div>
                        <h2 className="font-bold md:text-lg text-left">Ressourses :</h2>
                        {
                            course.chapitres[0].ressources.map((ressource, index) => (
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
                </main>
                <aside className="lg:w-1/3 w-full">
                    <div className="p-4 rounded-md border border-gray-200 shadow-md mb-4 flex flex-col gap-3 h-36">
                        <div className="flex flex-row justify-between items-center">
                            <h3 className="font-bold text-gray-900">Soumettez votre travail</h3>
                            {rendu ? <RenduFlag /> : <NonRenduFlag />}
                        </div>
                    </div>
                </aside>
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