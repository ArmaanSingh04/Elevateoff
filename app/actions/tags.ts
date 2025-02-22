"use server"
import client from "@/db"

export async function handleGetAllTags(){
    return await client.tags.findMany()
}

export async function handleCreateNewTag(tagName: string){
    return await client.tags.create({
        data:{
            name: tagName
        }
    })
    
}