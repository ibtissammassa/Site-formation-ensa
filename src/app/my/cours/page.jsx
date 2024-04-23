import CarteCours from "@/Components/ui/CarteCours";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"



//data
import { courses } from "@/data/courses";

function Cours() {
    const role = "etudiant";

    return (
        <div className="lg:px-[2rem] px-8 2xl:px-80 py-8 flex flex-col gap-5 ">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/my/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Cours</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="w-full flex justify-between">
                <h1 className="text-3xl font-bold">Cours </h1>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter par" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="filter1">filter1</SelectItem>
                        <SelectItem value="filter2">filter2</SelectItem>
                        <SelectItem value="filter3">filter3</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-row flex-wrap gap-2.5 mb-1">
                {courses.map((data, index) => (
                    <CarteCours key={index} data={data} />
                ))}
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

        </div>
    );
}

export default Cours;