"use server"
import client from "@/db"

export async function handleRegisterUser(email:string , password: string){
    const user = await client.user.create({
        data: {
            email,
            password
        }
    })

    if(user){
        return {
            id: String(user.id),
            email: user.email
        }
    }
    else{
        return {
            type: "error",
            message: "registration unsuccessful"
        }
    }
}