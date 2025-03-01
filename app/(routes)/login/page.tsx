"use client"
import { useState } from "react"
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
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const router = useRouter()

    const handleSubmit = async () => {
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false
        });

        if (result?.error) {
            toast.error("Invalid credentials. Try again.");
        } else {
            toast.success("Login successfull")
            router.push("/");
        }
    }

    return (
        <div className="flex w-full h-screen justify-center items-center">
            <Card className="sm:w-1/2 min-h-1/2 border bg-red-100  border-gray-500">
                <CardHeader>
                    <CardTitle className="text-3xl text-center">😊Log in with email</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <Label className="text-xl">Enter Your email</Label>
                    <Input defaultValue={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="youremail@gmail.com" />
                    <Label className="text-xl my-2">Enter a password</Label>
                    <Input defaultValue={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="***" />
                </CardContent>
                <CardFooter className="flex flex-col gap-2 items-start">
                    <Button onClick={handleSubmit} className="w-full bg-blue-600 hover:bg-blue-700">Submit</Button>
                    <Label>Not yet registered? <Link href="/register" className="text-blue-500">register now</Link></Label>
                </CardFooter>
            </Card>
        </div>
    )
}