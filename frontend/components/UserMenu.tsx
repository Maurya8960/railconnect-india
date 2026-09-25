"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, Ticket, Settings, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserMenu() {
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  const loadUser = () => {
    const storedUser = localStorage.getItem("railconnect_user");
    if (storedUser) setUser(JSON.parse(storedUser));
    else setUser(null);
  };

  useEffect(() => {
    setMounted(true);
    loadUser();
    window.addEventListener("user-auth-change", loadUser);
    return () => window.removeEventListener("user-auth-change", loadUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("railconnect_user");
    localStorage.removeItem("railconnect_token");
    setUser(null);
    window.dispatchEvent(new Event("user-auth-change"));
    window.location.href = "/";
  };

  if (!mounted) return <div className="w-24 h-10 animate-pulse bg-slate-200 dark:bg-slate-800 rounded-full"></div>;

  if (user) {
    const displayName = user.name || user.fullName || user.email?.split('@')[0];
    const initial = displayName?.charAt(0).toUpperCase() || "U";

    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none focus:outline-none">
          <div className="bg-white/90 text-indigo-700 hover:bg-white font-bold h-10 pl-2 pr-4 rounded-full shadow-sm border border-indigo-100 flex items-center gap-2 cursor-pointer transition-all">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center text-[13px] font-black shadow-sm overflow-hidden">
              {user.picture ? (
                <img src={user.picture} alt="Profile" className="w-7 h-7 rounded-full object-cover" />
              ) : (
                initial
              )}
            </div>
            <span className="max-w-[100px] truncate">{displayName}</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 z-[99999] shadow-xl border-slate-100 dark:border-slate-800">
          <div className="px-2 py-2 mb-1 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center text-lg font-black shadow-sm shrink-0 overflow-hidden">
              {user.picture ? (
                <img src={user.picture} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                initial
              )}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-black text-slate-800 dark:text-white truncate">{displayName}</p>
              <p className="text-xs font-medium text-slate-500 truncate">{user.email}</p>
            </div>
          </div>
          
          <DropdownMenuSeparator />
          
          <Link href="/bookings" className="w-full block">
            <DropdownMenuItem className="font-bold text-slate-700 dark:text-slate-300 cursor-pointer py-3 rounded-xl focus:bg-indigo-50 dark:focus:bg-indigo-900/30">
              <Ticket className="w-4 h-4 mr-2 text-indigo-500" /> My Bookings
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem className="font-bold text-slate-700 dark:text-slate-300 cursor-pointer py-3 rounded-xl focus:bg-indigo-50 dark:focus:bg-indigo-900/30">
            <Settings className="w-4 h-4 mr-2 text-slate-500" /> Profile Settings
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={handleLogout} className="font-bold text-red-600 dark:text-red-400 cursor-pointer py-3 rounded-xl focus:bg-red-50 dark:focus:bg-red-900/30">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link href="/login">
      <Button className="bg-white text-[#1253a4] hover:bg-slate-100 font-bold px-8 py-2 h-10 rounded-full text-sm uppercase tracking-wide shadow-sm cursor-pointer">
        LOGIN
      </Button>
    </Link>
  );
}
