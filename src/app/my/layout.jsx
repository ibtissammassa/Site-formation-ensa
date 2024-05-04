"use client";
import { useState, useEffect } from "react";
import { useStore } from "@/store/zustand";
import { getDataFromToken } from "@/app/actions";


export default function myLayout({ children }) {
    const setUser = useStore((state) => state.setUser);
    const setIsLoading = useStore((state) => state.setIsLoading);

    useEffect(() => {
        setIsLoading(true);
        getDataFromToken().then((rs) => {
            setUser(rs);
            setIsLoading(false);
        }).catch((error) => {
            console.error(error.message);
            setIsLoading(false);
        });
    }, [setUser, setIsLoading]);

    return (
        <>
            {children}
        </>
    );
}