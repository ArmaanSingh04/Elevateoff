import CredentialsProvider from "next-auth/providers/credentials"
import client from "@/db"
import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"

export const NEXT_AUTH = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'email' , type: 'text' , placeholder: 'Enter email' },
                password: { label: 'password' , type: 'password' , placeholder: 'Enter password' }
            },
            async authorize(credentials){
                if(!credentials) return null

                const user = await client.user.findFirst({
                    where:{
                        email: credentials.email
                    }
                })

                // check the pasword
                if(user){
                    if(user.password == credentials.password){
                        return {
                            id: String(user.id),
                            email: user.email
                        }
                    }
                    else {
                        return null
                    }
                }

                return null
            }

        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({session , token}: {session : Session , token:JWT}){
            if(token.sub && session.user){
                session.user.id = token.sub as string
            }
            return session
        }
    },
    pages:{
        signIn: '/login'
    }
}