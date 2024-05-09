import FormulaireAddTravail from "@/Components/Forms/FormulaireAddTravail";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb"
import { Input } from "@/Components/ui/input";


export default function AddTravail() {
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
                        <BreadcrumbPage>Nouveau travail a rendre</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex md:flex-row flex-col gap-5 md:justify-between">
                <main className="lg:w-[62%] w-full text-left flex flex-col gap-3">
                    <h1 className="md:text-4xl text-3xl font-bold">Ajouter Travail a rendre</h1>
                    <FormulaireAddTravail />
                </main>
                <aside className="lg:w-1/3 w-full">
                    <div className="p-4 rounded-md border border-gray-200 shadow-md mb-4 flex flex-col gap-3 h-36">
                        <div className="flex flex-row justify-between items-center">
                            <h3 className="font-bold text-gray-900">Ressources</h3>
                        </div>
                        <Input type="file" className='cursor-pointer' multiple={true} />
                    </div>
                </aside>
            </div>
        </div>
    );
}