"use client"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

export default function Default() {
    return(
        <div>
            <Button onClick={() => signOut()}>Logout</Button>
        </div>
    )
}