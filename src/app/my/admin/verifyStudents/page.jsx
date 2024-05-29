"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import UnverifiedStudentsTable from "@/Components/Sections/UnverifiedStudentsTable";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";

function VerifyingStudentPage() {
  const [unverifiedStudents, setUnverifiedStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get("/api/user");
        setUnverifiedStudents(res.data.users);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="md:px-28 px-6 py-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/my/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Verification</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="font-semibold text-red-700 mb-4 text-3xl mt-7">
        Verification des étudiant
      </h1>
      <UnverifiedStudentsTable
        students={unverifiedStudents}
        loading={loading}
      />
    </div>
  );
}

export default VerifyingStudentPage;
