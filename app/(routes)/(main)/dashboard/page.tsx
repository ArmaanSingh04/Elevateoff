// "use client"
// import { Button } from "@/components/ui/button"
// import { signOut } from "next-auth/react"
// import { useRouter } from "next/navigation"

import { handleGetAllProjects } from "@/app/actions/projects"

export default async function Default() {
    // const router = useRouter()
    const response = await handleGetAllProjects()
    return(
        <div>
            {JSON.stringify(response)}
        </div>
    )
}