export default function Home() {
  return (
    <div className="container w-screen h-screen flex">

      <div className="left flex flex-col w-full gap-4 justify-center items-center border-r-2 border-r-gray-600 ">
        <h1 className="text-5xl">
          <span className="text-orange-500 font-bold">Elevate off</span> your project now
        </h1>
        <p className="text-2xl">Get your local app <b>noticed</b></p>
        <button className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition">Post a project</button>
      </div>

      <div className="right flex flex-col w-full gap-4 justify-center items-center">
        <h1 className="text-5xl flex flex-col items-center"><span>Find your next <b>BIG</b> thing to </span><span className="font-bold text-blue-500">contribute</span></h1>
        <p className="text-2xl">Find projects with advanced search<b> now</b></p>
        <button className="bg-green-500 hover:bg-green-600 transition text-white p-3 rounded ">Search project</button>
      </div>

    </div>
  );
}
