"use server"
import client from "@/db"
import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "@/lib/auth"

export async function handleGetAllProjects(){
    return await client.projects.findMany({
        include:{
            tags: true
        }
    })
}

export async function handleUploadProject(
    name: string,
    description: string,
    contributable: boolean,
    tags: { id: number , name: string }[],
    link?: string
){
    const session = await getServerSession(NEXT_AUTH)
    if(session == null) return 

    // tags are hard coded remove it from there
    const entry = await client.projects.create({
        data:{
            name,
            description,
            contributable,
            link,
            user: {
                connect:{
                    id: Number(session.user.id)
                }
            },
            tags: {
                connect: tags.map((tag) => ({ id: Number(tag.id) }))
            }
        }
    })

    return entry
}

export async function handleGetMyProjects(){
    const session = await getServerSession(NEXT_AUTH)

    if(session == null) return

    const myprojects = await client.projects.findMany({
        where:{
            userId: Number(session.user.id)
        }
    })

    return myprojects
}