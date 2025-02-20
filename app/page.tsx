"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <>
      <section className="w-full h-screen flex flex-col">
        <div className="flex w-full p-5 justify-between border-b-2 border-b-gray-500">
          <div className="text-3xl font-bold text-blue-500">Elevate off</div>
          <div>
            <Button onClick={() => router.push("/login")} variant="default" size="lg" className="bg-blue-500 text-white hover:bg-blue-600 mx-2 text-base">Login</Button>
            <Button variant="default" size="lg" className="bg-orange-500 hover:bg-orange-600 text-base">Join now</Button>
          </div>
        </div>
        <div className="flex flex-grow">
          <div className="left flex flex-col w-full gap-4 justify-center items-center border-r-2 border-r-gray-600 ">
            <h1 className="text-5xl">
              <span className="text-orange-500 font-bold">Elevate off</span> your project now
            </h1>
            <p className="text-2xl">Get your local app <b>noticed</b></p>
            <button className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition">Post a project</button>
          </div>

          <div className="right flex flex-col w-full gap-4 justify-center items-center bg-green-100">
            <h1 className="text-5xl flex flex-col items-center"><span>Find your next <b>BIG</b> thing to </span><span className="font-bold text-blue-500">contribute</span></h1>
            <p className="text-2xl">Find projects with advanced search<b> now</b></p>
            <button className="bg-green-500 hover:bg-green-600 transition text-white p-3 rounded ">Search project</button>
          </div>
        </div>
      </section>
    </>
  );
}
