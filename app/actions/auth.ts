"use server"
import client from "@/db"
import bcrypt from "bcryptjs"

export async function handleRegisterUser(email:string , password: string){

    const saltRounds = 14
    const hashedPassword = await bcrypt.hash(password , saltRounds)

    const user = await client.user.create({
        data: {
            email,
            password: hashedPassword
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