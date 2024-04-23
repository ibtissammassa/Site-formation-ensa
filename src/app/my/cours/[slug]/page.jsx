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

//data
import { courses } from "@/data/courses";
import { todos } from "@/data/todos";
import Link from "next/link";

function FormationPage({ params }) {
    const { slug } = params;
    const { courseName, profName, objectif, chapitres } = courses.find((course) => course.slug === slug);

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
                        <BreadcrumbPage>{courseName}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex flex-col gap-3">
                <h1 className="md:text-4xl text-3xl font-bold">{courseName}</h1>
                <p className="text-slate-700 md:text-sm text-xs">Encadré par: {profName}</p>
            </div>
            <div className="flex md:flex-row flex-col gap-2 md:justify-between">
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
                                                        <div className="inline-flex items-center my-2">
                                                            <Image src={file_down} width={20} alt="file-down" />
                                                            <Link href={ressource.url} target="_blank" className="text-sm underline hover:text-red-400 ml-2">{ressource.title}</Link>
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
                    <div className="p-4 rounded-md border border-gray-200 shadow-md">
                        <h1 className="text-lg font-semibold mb-4">Activité A Rendre</h1>
                        <ScrollArea className="h-[400px]">
                            <div className="mr-3">
                                {todos.map((todo) => (
                                    <CarteActiviteARendre data={todo} />
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default FormationPage;