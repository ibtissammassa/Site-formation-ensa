"use client";
import { useState, useEffect } from "react";
import { useStore } from "@/store/zustand";
import { getDataFromToken } from "@/app/actions";


export default function myLayout({ children }) {
    const setUser = useStore((state) => state.setUser);
    const setUserRole = useStore((state) => state.setUserRole);
    const setIsLoading = useStore((state) => state.setIsLoading);

    useEffect(() => {
        setIsLoading(true);
        getDataFromToken().then((rs) => {
            console.log("rs", rs);
            setUser(rs);
            setUserRole(rs.role);
            console.log("userrrr", rs);
            console.log("userrole", rs.role);
            setIsLoading(false);
        }).catch((error) => {
            console.error(error.message);
            setIsLoading(false);
        });
    }, [setUser, setIsLoading, setUserRole]);

    return (
        <>
            {children}
        </>
    );
}