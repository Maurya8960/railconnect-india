"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Ticket, Calendar, User, CheckCircle2 } from "lucide-react";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("railconnect_bookings");
    if (stored) {
      setBookings(JSON.parse(stored));
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full min-h-[calc(100vh-100px)] py-10 px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto">
      <Link href="/" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-indigo-600 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
      </Link>
      
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 rounded-2xl">
          <Ticket className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">My Bookings</h1>
          <p className="text-sm font-medium text-slate-500">View all your confirmed train tickets and PNR history.</p>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center shadow-sm">
          <Ticket className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">No Bookings Found</h3>
          <p className="text-sm text-slate-400 mt-1 mb-6">You haven't booked any tickets yet.</p>
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl h-12 px-6">
            <Link href="/">Book a Train Now</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((ticket, idx) => (
            <div key={idx} className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">PNR: {ticket.pnr}</span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">{ticket.trainNumber} - {ticket.trainName}</h3>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-4 py-2 rounded-2xl font-black text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> {ticket.status}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Route</span>
                  <p className="font-bold text-slate-800 dark:text-slate-200 mt-1">{ticket.origin?.split('(')[0]} → {ticket.destination?.split('(')[0]}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Journey Date</span>
                  <p className="font-bold text-slate-800 dark:text-slate-200 mt-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-500" /> {ticket.date}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Passenger Details</span>
                  <p className="font-bold text-slate-800 dark:text-slate-200 mt-1 flex items-center gap-2">
                    <User className="w-4 h-4 text-indigo-500" /> {ticket.passengerName} ({ticket.age}Y / {ticket.gender})
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
