'use client'
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

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    async function fetchData() {
      setCoursesLoading(true);

      await fetchCourses();

      setCoursesLoading(false);
    }

    fetchData();
  }, []);

  if (!courses) return <Loader />

  const totalPages = Math.ceil(courses.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedCourses = courses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
          ) : paginatedCourses.length === 0 ? (
            <p>Aucun cours pour le moment.</p>
          ) : (
            paginatedCourses.map((data, index) => <CarteCours key={index} data={data} />)
          )
        }
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(i + 1)}
                className={currentPage === i + 1 ? 'active' : ''}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default Cours;
