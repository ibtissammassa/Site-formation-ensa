"use client"
import CarteCours from "@/Components/ui/CarteCours";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { useStore } from "@/store/zustand";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { SkeletonCard } from "@/Components/ui/SkeletonCard";

function Cours() {
  const courses = useStore((state) => state.courses);
  const fetchCourses = useStore((state) => state.fetchCourses);
  const [coursesLoading, setCoursesLoading] = useState(true);


  useEffect(() => {
    async function fetchData() {
      setCoursesLoading(true);

      await fetchCourses();

      setCoursesLoading(false);
    }

    fetchData();
  }, []);

  if (!courses) return <Loader />

  return (
    <div className="lg:px-10 px-8 2xl:px-80 py-8 flex flex-col gap-5 ">
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
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 gap-3 mb-1">
        {
          coursesLoading ? (
            Array(8).fill().map((_, index) => <SkeletonCard key={index} />)
          ) :
            courses.length === 0 ? (
              <p>Aucune cours pour le moment.</p>
            ) : (
              courses.map((data, index) => <CarteCours key={index} data={data} />)
            )
        }
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
