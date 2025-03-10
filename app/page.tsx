"use client"
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter, redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter()
  const session = useSession()

  if (session.status == "authenticated") {
    redirect('/dashboard')
  }
  if (session.status == "unauthenticated") {
    toast.error("You are unauthenticated")
  }
  return (
    <>
      <section className="w-full h-screen flex flex-col">

        <div className="flex w-full justify-between border-b-2 p-1 md:p-5 border-b-gray-500">
          <div className="text-xl font-bold text-blue-500 cursor-pointer md:text-2xl" onClick={() => router.push("/")}>Elevate off</div>
          <div className="flex">
            <Button onClick={() => signIn()} variant="default" size="sm" className="bg-blue-500 text-white hover:bg-blue-600 mx-2 text-base">Login</Button>
            <Button onClick={() => router.push('/register')} variant="default" size="sm" className="bg-orange-500 hover:bg-orange-600 text-base">Join now</Button>
          </div>
        </div>

        <div className="flex flex-grow flex-col md:flex-row justify-around">
          <div className="left flex flex-col w-full gap-4 justify-center items-center border-r-2 border-r-gray-600 ">
            <h1 className="sm:text-5xl text-2xl md:text-center">
              <span className="text-orange-500 font-bold">Elevate off</span> your project now
            </h1>
            <p className="sm:text-3xl text-xl">Get your local app <b>noticed</b></p>
            <button className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition" onClick={() => router.push("/dashboard")}>Post a project</button>
          </div>

          <div className="right flex flex-col w-full gap-4 justify-center items-center bg-green-100">
            <h1 className="sm:text-5xl text-2xl flex flex-col items-center md:text-center"><span>Find your next <b>BIG</b> thing to </span><span className="font-bold text-blue-500">contribute!</span></h1>
            <p className="sm:text-3xl text-xl">Find projects<b> now</b></p>
            <button className="bg-green-500 hover:bg-green-600 transition text-white p-3 rounded " onClick={() => router.push("/dashboard")}>Search project</button>
          </div>
        </div>
      </section>
    </>
  );
}
