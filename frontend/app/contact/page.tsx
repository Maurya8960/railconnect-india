import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail, Phone, MapPin, Globe, Headphones, Building2, ExternalLink } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="w-full bg-gradient-to-br from-[#fff0f5] via-white to-[#f0f4ff] dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 pt-8 pb-32 px-4 sm:px-6 lg:px-12 flex-grow rounded-3xl mt-4 relative">
      
      {/* Back Button */}
      <Button asChild variant="outline" className="rounded-full border-[#2a2b8e] text-[#2a2b8e] hover:bg-[#2a2b8e] hover:text-white dark:border-indigo-400 dark:text-indigo-400 bg-transparent px-8 h-10 font-medium cursor-pointer relative z-10">
        <Link href="/">
          Back
        </Link>
      </Button>

      <div className="mt-8 max-w-6xl mx-auto relative z-10">
        
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">Contact us</h1>
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            
            {/* Section 1: Customer Support & Live Support Website */}
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                For any queries related to Railway tickets booked via RailConnect
              </h3>
              <div className="bg-indigo-50/50 dark:bg-indigo-950/30 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 space-y-3">
                <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
                  <Headphones className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  Customer Support: <span className="text-indigo-600 dark:text-indigo-400">+91 9454247006</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  Visit our dedicated customer support & portfolio platform for real-time assistance:
                </p>
                <div className="pt-1">
                  <Link href="https://ansh-maurya.vercel.app/" target="_blank">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm gap-2">
                      <Globe className="w-4 h-4" /> Visit Support Portal <ExternalLink className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                For cancellation of E-Ticket online or TDR filing
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 font-medium">
                In case a passenger faces any problem, write from the registered email ID only:
              </p>
              <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-sm font-bold px-4 py-2 rounded-2xl border border-blue-100 dark:border-blue-900">
                <Mail className="w-4 h-4" /> etickets@railconnect.co.in
              </div>
            </div>

            {/* Section 3 - Direct Mail */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Direct Developer Email
              </h3>
              <div className="inline-flex items-center gap-2 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 text-sm font-bold px-4 py-2 rounded-2xl border border-purple-100 dark:border-purple-900">
                <Mail className="w-4 h-4" /> maurya1.ansh@gmail.com
              </div>
            </div>

            {/* Section 4 */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Dial within India</h3>
              <div className="text-lg font-black text-indigo-600 dark:text-indigo-400 mb-2">14646</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Support is available in multiple languages including Hindi, English, Punjabi, Bengali, Marathi, and Tamil.
              </p>
            </div>

          </div>

          {/* Right Column (Banking & Corporate Office) */}
          <div className="space-y-6">
            
            {/* Banking Partners */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                For complaint regarding Co-branded Credit Cards
              </h3>
              
              {[
                { name: "RailConnect-SBI", phone: "0124-39021212 / 18001801295", mail: "customercare@sbicard.com" },
                { name: "RailConnect-HDFC", phone: "18002026161 / 18602676161", mail: "support@hdfcbank.com" },
                { name: "RailConnect-RBL", phone: "02262327777 / 02271190900", mail: "cardservices@rblbank.com" }
              ].map((bank, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="font-extrabold text-sm text-slate-900 dark:text-white">{bank.name}</div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <Phone className="w-3.5 h-3.5 text-indigo-500 shrink-0" /> {bank.phone}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <Mail className="w-3.5 h-3.5 text-pink-500 shrink-0" /> {bank.mail}
                  </div>
                </div>
              ))}
            </div>

            {/* Registered Office (Kanpur - Panki) */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
              <div className="absolute right-[-10px] bottom-[-10px] opacity-10 pointer-events-none">
                <Building2 className="w-32 h-32 text-indigo-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                Registered Office - Corporate Office
              </h3>
              <div className="space-y-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <p className="font-black text-indigo-600 dark:text-indigo-400 text-base">RailConnect India Pvt. Ltd.</p>
                <p>Sunder Nagar, Panki</p>
                <p>Kanpur, Uttar Pradesh - 208020</p>
                <p className="text-xs text-slate-400 mt-2 font-normal">CIN: U63090UP2026PTC000000</p>
              </div>
            </div>

          </div>

        </div>
      </div>
      
    </div>
  );
}
