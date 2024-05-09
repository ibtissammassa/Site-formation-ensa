"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import UnverifiedStudentsTable from "@/Components/Sections/UnverifiedStudentsTable";
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
      <h1 className="font-semibold text-red-700 mb-4 text-lg">
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
