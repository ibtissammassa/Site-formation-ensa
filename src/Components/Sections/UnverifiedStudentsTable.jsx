"use client";
import { Loader2Icon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/extension/button";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

function UnverifiedStudentsTable({ students, loading }) {
  const router = useRouter();
  const [verifing, setVerifing] = useState(false);
  const verifyStudent = async (id) => {
    try {
      setVerifing(true);
      await axios.post("/api/VerifiedStudent", { studentId: id });
    } catch (error) {
      console.log(error.message);
    } finally {
      setVerifing(false);
      router.refresh();
    }
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Prenom</TableHead>
          <TableHead>Nom</TableHead>
          <TableHead>Num Tele</TableHead>
          <TableHead>Cin</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      {loading ? (
        <TableCaption>
          <Loader2Icon className="h-4 w-4 animate-spin mx-[50vw] my-8" />
        </TableCaption>
      ) : students.length === 0 ? (
        <TableCaption className="mb-6">
          Tous les étudiant sont verifier !
        </TableCaption>
      ) : (
        <TableBody>
          {students.map((student, index) => (
            <TableRow key={index}>
              <TableCell>{student.firstname}</TableCell>
              <TableCell>{student.lastname}</TableCell>
              <TableCell>{student.phoneNumber}</TableCell>
              <TableCell>{student.cin}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>
                <Button
                  onClick={() => verifyStudent(student._id)}
                  disabled={verifing}
                >
                  {verifing ? (
                    <Loader2Icon className="h-4 w-4 animate-spin" />
                  ) : (
                    <></>
                  )}
                  Verifier
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
}

export default UnverifiedStudentsTable;
