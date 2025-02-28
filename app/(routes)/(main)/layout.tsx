"use client"
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function ProtectedRoutes ({ children }: { children: React.ReactNode }) {
    const session = useSession()

    if(session.status == "unauthenticated"){
        redirect('/')
    }
    return <div className="w-full min-h-screen">
        <Navbar />
        {children}
    </div>
};