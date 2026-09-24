import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft, Calendar, Search, PieChart, Tag, Ticket, TrainFront, LayoutList } from "lucide-react";
import StationAutocomplete from "@/components/StationAutocomplete";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full relative min-h-screen">
      
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-400/40 dark:bg-purple-900/40 blur-[120px] rounded-full pointer-events-none mix-blend-multiply dark:mix-blend-screen"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-400/40 dark:bg-indigo-900/40 blur-[150px] rounded-full pointer-events-none mix-blend-multiply dark:mix-blend-screen"></div>
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto pt-10 px-4 space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
        
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white drop-shadow-sm">
            Travel <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">Seamlessly.</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto font-medium">
            Experience the next generation of railway bookings. Fast, beautiful, and secure.
          </p>
        </div>

        <div className="w-full max-w-5xl">
          {/* Main Booking Form */}
          <form action="/search" method="GET" className="w-full bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/50 dark:border-white/10 shadow-xl rounded-[2.5rem] p-8 md:p-10 mb-6 relative z-[50] overflow-visible">
            
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_1fr] gap-4 items-center w-full relative z-[60]">
              
              <div className="bg-white/80 dark:bg-slate-800/80 rounded-3xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-indigo-500 transition-all w-full flex flex-col justify-center relative z-[100]">
                <StationAutocomplete name="from" label="Origin" placeholder="Select Source" iconColor="text-indigo-500" />
              </div>

              <div className="flex justify-center -mx-2 relative z-[95]">
                <Button type="button" className="rounded-full bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl h-12 w-12 shrink-0 border-2 border-white dark:border-slate-800" size="icon">
                  <ArrowRightLeft className="w-5 h-5"/>
                </Button>
              </div>

              <div className="bg-white/80 dark:bg-slate-800/80 rounded-3xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-indigo-500 transition-all w-full flex flex-col justify-center relative z-[90]">
                <StationAutocomplete name="to" label="Destination" placeholder="Select Destination" iconColor="text-pink-500" />
              </div>

              <div className="bg-white/80 dark:bg-slate-800/80 rounded-3xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-indigo-500 transition-all w-full flex flex-col justify-center relative z-[80]">
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-wider ml-1 mb-1 block uppercase">Date</label>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-slate-600 dark:text-slate-400 shrink-0"/>
                  <Input name="date" className="border-0 bg-transparent text-lg font-semibold focus-visible:ring-0 px-1 shadow-none h-auto dark:text-white dark:[color-scheme:dark] w-full" type="date" defaultValue="2026-09-24"/>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 mt-6 items-end relative z-[30] w-full">
              <div className="bg-white dark:bg-slate-900 rounded-[20px] p-2 shadow-sm border-2 border-transparent transition-all flex items-center w-full">
                <div className="px-3 text-slate-500"><PieChart className="w-6 h-6" /></div>
                <div className="flex flex-col w-full">
                  <label className="text-[12px] font-medium text-slate-600 dark:text-slate-400 ml-1">Quota</label>
                  <Select name="quota" defaultValue="general">
                    <SelectTrigger className="h-8 w-full text-lg border-0 bg-transparent shadow-none focus:ring-0 font-medium text-slate-900 dark:text-white pt-0 pb-1 px-1"><SelectValue placeholder="Quota"/></SelectTrigger>
                    <SelectContent className="bg-white dark:bg-slate-900 z-[99999] rounded-xl"><SelectItem value="general">GENERAL</SelectItem><SelectItem value="tatkal">TATKAL</SelectItem></SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-[20px] p-2 shadow-sm border-2 border-transparent transition-all flex items-center w-full">
                <div className="px-3 text-slate-500"><Tag className="w-6 h-6" /></div>
                <div className="flex flex-col w-full">
                  <label className="text-[12px] font-medium text-slate-600 dark:text-slate-400 ml-1">Concession</label>
                  <Select name="concession" defaultValue="none">
                    <SelectTrigger className="h-8 w-full text-lg border-0 bg-transparent shadow-none focus:ring-0 font-medium text-slate-900 dark:text-white pt-0 pb-1 px-1"><SelectValue placeholder="Concession"/></SelectTrigger>
                    <SelectContent className="bg-white dark:bg-slate-900 z-[99999] rounded-xl"><SelectItem value="none">NONE</SelectItem><SelectItem value="disability">PERSON WITH DISABILITY</SelectItem></SelectContent>
                  </Select>
                </div>
              </div>

              {/* Type Changed to Submit */}
              <Button type="submit" className="h-[72px] px-10 text-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-3xl w-full md:w-auto shadow-lg shadow-indigo-500/30 transition-transform hover:scale-[1.02]">
                Find Trains <Search className="w-5 h-5 ml-2"/>
              </Button>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full relative z-[10]">
            <Link href="/pnr" className="block">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[20px] p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all">
                <div className="bg-[#f3f4f6] dark:bg-slate-800 w-[60px] h-[60px] rounded-full flex items-center justify-center shrink-0"><Ticket className="w-6 h-6 text-[#172554] dark:text-indigo-400" /></div>
                <span className="text-[17px] font-bold text-[#172554] dark:text-white">Check PNR Status</span>
              </div>
            </Link>
            <Link href="/track" className="block">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[20px] p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all">
                <div className="bg-[#f3f4f6] dark:bg-slate-800 w-[60px] h-[60px] rounded-full flex items-center justify-center shrink-0"><TrainFront className="w-6 h-6 text-[#172554] dark:text-indigo-400" /></div>
                <span className="text-[17px] font-bold text-[#172554] dark:text-white">Track Your Train</span>
              </div>
            </Link>
            <Link href="/charts" className="block">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[20px] p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all">
                <div className="bg-[#f3f4f6] dark:bg-slate-800 w-[60px] h-[60px] rounded-full flex items-center justify-center shrink-0"><LayoutList className="w-6 h-6 text-[#172554] dark:text-indigo-400" /></div>
                <span className="text-[17px] font-bold text-[#172554] dark:text-white">Charts / Vacancy</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
