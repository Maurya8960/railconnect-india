import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar } from "lucide-react";
import StationAutocomplete from "@/components/StationAutocomplete";
import TrainAutocomplete from "@/components/TrainAutocomplete";

export default function ChartsPage() {
  return (
    <div className="w-full bg-gradient-to-br from-[#fff0f5] via-white to-[#f0f4ff] dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 pt-8 pb-32 px-6 lg:px-12 flex-grow rounded-3xl mt-4 relative">
      
      {/* Back Button */}
      <Button asChild variant="outline" className="rounded-full border-[#2a2b8e] text-[#2a2b8e] hover:bg-[#2a2b8e] hover:text-white dark:border-indigo-400 dark:text-indigo-400 bg-transparent px-8 h-10 font-medium cursor-pointer relative z-10">
        <Link href="/">
          Back
        </Link>
      </Button>

      <div className="mt-10 max-w-2xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Heading Area */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">Reservation Chart</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">Check vacant seats and chart preparation status</p>
        </div>

        {/* Glassy Form Card */}
        <div className="w-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl border border-white/50 dark:border-slate-700/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] rounded-[2.5rem] p-8 md:p-10 relative overflow-visible">
          
          <h2 className="text-2xl font-black text-center text-indigo-700 dark:text-indigo-400 mb-8 tracking-tight">Journey Details</h2>

          <div className="flex flex-col gap-6 w-full relative">

            {/* Train Autocomplete Input - Sabse Highest Z-Index (z-50) */}
            <div className="bg-white/80 dark:bg-slate-800/80 rounded-3xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-indigo-500 transition-all relative z-50">
              <TrainAutocomplete label="Train Name/Number *" placeholder="Enter Train Number or Name" iconColor="text-indigo-500" />
            </div>

            {/* Journey Date Input - Medium Z-Index (z-40) */}
            <div className="bg-white/80 dark:bg-slate-800/80 rounded-3xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-indigo-500 transition-all flex items-center gap-3 relative z-40">
              <Calendar className="w-6 h-6 text-pink-500 shrink-0"/>
              <div className="flex flex-col w-full">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Journey Date *</label>
                <input 
                  type="date" 
                  defaultValue="2026-09-24"
                  className="outline-none bg-transparent text-lg font-bold text-slate-800 dark:text-white dark:[color-scheme:dark] placeholder:text-slate-400 w-full"
                />
              </div>
            </div>

            {/* Boarding Station Autocomplete - Lowest Z-Index (z-30) */}
            <div className="bg-white/80 dark:bg-slate-800/80 rounded-3xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-indigo-500 transition-all relative z-30">
              <StationAutocomplete label="Boarding Station *" placeholder="Select Boarding Station" iconColor="text-purple-500" />
            </div>

            {/* Get Train Chart Button */}
            <Button className="h-16 mt-4 px-10 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-3xl w-full shadow-lg shadow-indigo-500/30 transition-transform hover:scale-[1.02] cursor-pointer relative z-10">
              GET TRAIN CHART
            </Button>

          </div>
        </div>
      </div>
      
    </div>
  );
}
