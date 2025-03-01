"use client"
import { useState } from "react"
import { handleRegisterUser } from "@/app/actions/auth";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

export default function Register() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')

    const handleSubmit = async () => {
        const response = await handleRegisterUser(email, password);
        if (response.id) {
            setEmail('')
            setPassword('')
            signIn()
        }
        else {
            toast.error("Something went wrong!")
        }

        toast.success("Registration successfull !!!")
    }

    return (
        <div className="flex w-full h-screen justify-center items-center">
            <Card className="sm:w-1/2 min-h-1/2 border bg-green-100  border-gray-500">
                <CardHeader>
                    <CardTitle className="text-3xl text-center">🔥Register with email</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <Label className="text-xl">Enter Your email</Label>
                    <Input defaultValue={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="youremail@gmail.com" />
                    <Label className="text-xl my-2">Enter a password</Label>
                    <Input defaultValue={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="***" />
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSubmit} className="w-full bg-blue-600 hover:bg-blue-700">Submit</Button>
                </CardFooter>
            </Card>
        </div>
    )
}