import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TrackPage() {
  return (
    <div className="w-full bg-gradient-to-br from-[#fff0f5] via-white to-[#f0f4ff] dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 pt-8 pb-32 px-6 lg:px-12 flex-grow rounded-3xl mt-4">
      
      {/* Back Button */}
      <Button asChild variant="outline" className="rounded-full border-[#2a2b8e] text-[#2a2b8e] hover:bg-[#2a2b8e] hover:text-white dark:border-indigo-400 dark:text-indigo-400 bg-transparent px-8 h-10 font-medium cursor-pointer relative z-10">
        <Link href="/">
          Back
        </Link>
      </Button>

      <div className="mt-10 max-w-4xl relative z-10">
        {/* Heading */}
        <h1 className="text-4xl font-black text-[#111] dark:text-white mb-6 tracking-tight">Track your train</h1>
        
        {/* Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[16px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-3 md:p-4 flex flex-col md:flex-row gap-4 items-center">
          
          {/* Custom Input Field mimicking the design */}
          <div className="flex-grow flex flex-col justify-center border border-slate-300 dark:border-slate-700 rounded-md px-4 py-2 w-full h-[68px] focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
            <span className="text-[13px] font-bold text-slate-500 dark:text-slate-400 mb-0.5">Train Number/Train Name</span>
            <input 
              type="text" 
              placeholder="Enter Train Number" 
              className="outline-none bg-transparent text-[#172554] dark:text-blue-400 text-lg font-bold placeholder:text-[#172554] dark:placeholder:text-blue-400 w-full"
            />
          </div>

          {/* Button */}
          <Button className="w-full md:w-auto h-[68px] px-14 bg-[#3133b1] hover:bg-[#242588] text-white rounded-full font-bold text-lg cursor-pointer">
            Search
          </Button>

        </div>
      </div>
      
    </div>
  );
}
