import { Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full bg-white/40 dark:bg-black/40 backdrop-blur-2xl border-t border-white/50 dark:border-white/10 py-8 mt-20 transition-colors">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Copyright */}
        <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 tracking-wide">
          Copyright © 2026 - RailConnect India. All Rights Reserved
        </div>

        {/* Center: Important Links */}
        <div className="hidden md:flex gap-8 text-sm font-bold text-slate-700 dark:text-slate-300 underline underline-offset-4 decoration-slate-400/40">
          <Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Important links</Link>
          <Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Compatible Browsers</Link>
        </div>

        {/* Right Side: Social Media Icons (Premium Glossy Style) */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300 mr-2">Follow Us</span>
          
          {/* GitHub (Glossy Dark) */}
          <Link href="https://github.com/Maurya8960" target="_blank" className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-slate-700 to-slate-900 text-white shadow-lg shadow-slate-900/20 hover:scale-110 hover:shadow-slate-900/40 transition-all border border-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.4 5.4 0 0 0-1.5-3.8 5.3 5.3 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0C6.2 1.5 5 1.9 5 1.9a5.3 5.3 0 0 0-.1 3.8A5.4 5.4 0 0 0 3 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"/><path d="M9 18c-4.5 1.5-5-2.5-7-3"/></svg>
          </Link>
          
          {/* YouTube (Glossy Red) */}
          <Link href="https://www.youtube.com/@AnshMaurya-o6j" target="_blank" className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30 hover:scale-110 hover:shadow-red-500/50 transition-all border border-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
          </Link>

          {/* X / Twitter (Glossy Black) */}
          <Link href="https://x.com/maurya1_ansh" target="_blank" className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-slate-800 to-black text-white shadow-lg shadow-black/30 hover:scale-110 hover:shadow-black/50 transition-all border border-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
          </Link>

          {/* WhatsApp (Glossy Green) */}
          <Link href="https://wa.me/qr/4M4PQCGRM6LXL1" target="_blank" className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-green-400 to-green-600 text-white shadow-lg shadow-green-500/30 hover:scale-110 hover:shadow-green-500/50 transition-all border border-white/20">
            <Phone className="w-5 h-5 fill-current border-none" />
          </Link>
        </div>

      </div>
    </footer>
  );
}
