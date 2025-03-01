"use client"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from "next/link"
import { signOut } from "next-auth/react"

const Navbar = () => {
    const router = useRouter()
    return (
        <div className="flex w-full p-5 flex-col sm:flex-row justify-between items-center border-b-2 border-b-gray-500">
            <div className="hidden text-3xl font-bold sm:inline text-blue-500 cursor-pointer" onClick={() => router.push('/dashboard')}>🚀Elevate off</div>
            <div className="flex gap-3 text-2xl">
                <Link className="hover:text-blue-500 transition" href="/dashboard">Home</Link>
                <Link className="hover:text-blue-500 transition" href="/trending">Trending</Link>
            </div>
            <div className="flex gap-2 justify-center items-center">
                <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => router.push('/upload-project')}>+Upload Project</Button>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            {/* add a src attribute here  */}
                            <AvatarImage src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" /> 
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-xl cursor-pointer border border-gray-500" onClick={() => router.push('/my-projects')}>My projects</DropdownMenuItem>
                        <DropdownMenuItem>
                            <Button className="w-full" onClick={() => signOut()}>Logout</Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>


            </div>
        </div>
    )
}

export default Navbar