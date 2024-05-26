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
import { Skeleton } from "../ui/extension/skeleton";

export default function SubmissionsTable({ submissions = [], loading }) {
    const router = useRouter();
    //   const verifyStudent = async (id) => {
    //     try {
    //       setVerifing(true);
    //       await axios.post("/api/submissions", { studentId: id });
    //     } catch (error) {
    //       console.log(error.message);
    //     } finally {
    //       setVerifing(false);
    //       router.refresh();
    //     }
    //   };
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            {loading ? (
                <TableCaption>
                    <div className="space-y-2 w-full">
                        <Skeleton className="h-4 w-w-full" />
                        <Skeleton className="h-4 w-w-full" />
                    </div>
                </TableCaption>
            ) : submissions.length === 0 ? (
                <TableCaption className="mb-6">
                    Pas de soumissions pour le moment !
                </TableCaption>
            ) : (
                <TableBody>
                    {submissions.map((student, index) => (
                        <TableRow key={index}>
                            <TableCell>{submissions.student}</TableCell>
                            <TableCell>{submissions.date}</TableCell>
                            <TableCell>{submissions.time}</TableCell>
                            <TableCell>
                                <Button
                                    onClick={() => { }}
                                >
                                    {verifing ? (
                                        <Loader2Icon className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <></>
                                    )}
                                    Voir la soumission
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            )}
        </Table>
    );
}