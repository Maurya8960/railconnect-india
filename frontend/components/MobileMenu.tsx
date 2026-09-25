"use client";
import React, { useState } from "react";
import { Menu, X, Home, Ticket, Phone } from "lucide-react";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="lg:hidden z-[9999]">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600 dark:text-slate-300">
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      {isOpen && (
        <div className="absolute top-[80px] left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl py-4 px-6 flex flex-col gap-2 z-[9999]">
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 font-bold text-slate-800 dark:text-white p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"><Home className="w-5 h-5"/> Home</Link>
          <Link href="/bookings" onClick={() => setIsOpen(false)} className="flex items-center gap-3 font-bold text-slate-800 dark:text-white p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"><Ticket className="w-5 h-5"/> My Bookings</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="flex items-center gap-3 font-bold text-slate-800 dark:text-white p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"><Phone className="w-5 h-5"/> Contact Us</Link>
        </div>
      )}
    </div>
  );
}
