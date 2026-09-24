"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowRight, Clock, TrainFront, Loader2, X, CheckCircle2 } from "lucide-react";

function SearchResults() {
  const searchParams = useSearchParams();
  const origin = searchParams.get("from") || "New Delhi (NDLS)";
  const destination = searchParams.get("to") || "Kanpur Central (CNB)";
  const date = searchParams.get("date") || "24/09/2026";

  const [trains, setTrains] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Booking Modal State
  const [selectedTrain, setSelectedTrain] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passengerName, setPassengerName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [berth, setBerth] = useState("Lower");
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookedTicket, setBookedTicket] = useState<any>(null);

  // Load Razorpay Script dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    const fetchTrains = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/v1/trains");
        const data = await res.json();
        if (Array.isArray(data)) setTrains(data);
      } catch (e) {
        console.error("Failed to fetch trains", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrains();
  }, []);

  const handleBookClick = (train: any) => {
    const user = localStorage.getItem("railconnect_user");
    if (!user) {
      alert("Please login first to book a ticket!");
      window.location.href = "/login";
      return;
    }
    setSelectedTrain(train);
    setIsModalOpen(true);
    setBookedTicket(null);
  };

  const handlePaymentAndBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!(window as any).Razorpay) {
      alert("Razorpay SDK failed to load. Check your internet connection.");
      return;
    }

    setIsProcessing(true);

    // Razorpay Options
    const options = {
      key: "rzp_test_TfsCdf9tajnr6O", // Aap yahan apni Razorpay Key ID dal sakte hain
      amount: 125000, // ₹1,250 in paisa
      currency: "INR",
      name: "RailConnect India",
      description: `Ticket Booking for ${selectedTrain?.name || "Train"}`,
      image: "https://cdn-icons-png.flaticon.com/512/3067/3067403.png",
      handler: function (response: any) {
        // Payment Successful! Now generate PNR and save ticket
        const pnr = "PNR-" + Math.floor(100000000 + Math.random() * 900000000);
        const ticketData = {
          pnr,
          paymentId: response.razorpay_payment_id,
          trainNumber: selectedTrain.number || "12345",
          trainName: selectedTrain.name || "EXPRESS",
          origin,
          destination,
          date,
          passengerName,
          age,
          gender,
          berth,
          status: "CONFIRMED / S4 - 24"
        };

        const existingBookings = JSON.parse(localStorage.getItem("railconnect_bookings") || "[]");
        localStorage.setItem("railconnect_bookings", JSON.stringify([ticketData, ...existingBookings]));

        setIsProcessing(false);
        setBookedTicket(ticketData);
      },
      prefill: {
        name: passengerName,
        email: JSON.parse(localStorage.getItem("railconnect_user") || "{}").email || "user@gmail.com",
        contact: "9876543210"
      },
      theme: {
        color: "#4f46e5",
      },
      modal: {
        ondismiss: function() {
          setIsProcessing(false);
        }
      }
    };

    const rzp1 = new (window as any).Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="w-full bg-gradient-to-br from-[#fff0f5] via-white to-[#f0f4ff] dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 pt-8 pb-32 px-4 sm:px-6 lg:px-12 flex-grow rounded-3xl mt-4 relative min-h-screen">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8 max-w-6xl mx-auto relative z-10">
        <Button asChild variant="outline" className="rounded-full border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white dark:border-indigo-400 dark:text-indigo-400 bg-transparent px-8 h-10 font-medium cursor-pointer">
          <Link href="/">Back to Search</Link>
        </Button>
      </div>

      {/* Journey Summary Card */}
      <div className="max-w-6xl mx-auto relative z-10 mb-8">
        <div className="bg-indigo-600 dark:bg-indigo-900 rounded-[2rem] p-6 md:p-8 shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="bg-white/20 p-4 rounded-full backdrop-blur-md">
              <TrainFront className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-indigo-100 uppercase tracking-wider mb-1">Journey Details</h2>
              <div className="flex items-center gap-3 text-xl md:text-2xl font-black">
                <span className="truncate max-w-[150px] md:max-w-xs">{origin.split('(')[0]}</span>
                <ArrowRight className="w-6 h-6 text-pink-400 shrink-0" />
                <span className="truncate max-w-[150px] md:max-w-xs">{destination.split('(')[0]}</span>
              </div>
            </div>
          </div>
          <div className="bg-black/25 backdrop-blur-md px-6 py-3 rounded-2xl flex items-center gap-3 shrink-0">
            <Clock className="w-5 h-5 text-pink-400" />
            <span className="font-bold text-lg">{date}</span>
          </div>
        </div>
      </div>

      {/* Trains List */}
      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white px-2">Available Trains</h3>
        
        {isLoading && (
          <div className="p-12 text-center flex flex-col items-center justify-center gap-3 text-indigo-600 font-bold">
            <Loader2 className="w-8 h-8 animate-spin" /> Loading available trains...
          </div>
        )}

        {!isLoading && trains.map((train, idx) => (
          <div key={idx} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row justify-between gap-6 items-center">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-black px-3 py-1 rounded-lg text-sm">{train.number || "12345"}</span>
                  <h4 className="text-xl font-black text-slate-900 dark:text-white">{train.name || "EXPRESS"}</h4>
                </div>
                <div className="flex items-center justify-between max-w-md">
                  <div className="text-center">
                    <div className="text-2xl font-black text-slate-800 dark:text-slate-100">{train.departure_time || "06:00"}</div>
                    <div className="text-xs font-bold text-slate-500 mt-1">{origin.split('(')[1]?.replace(')', '') || "SRC"}</div>
                  </div>
                  <div className="flex flex-col items-center px-4">
                    <span className="text-xs font-bold text-slate-400 mb-1">{train.duration || "05h 00m"}</span>
                    <div className="w-24 border-t-2 border-dashed border-slate-300 dark:border-slate-600"></div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-slate-800 dark:text-slate-100">{train.arrival_time || "11:00"}</div>
                    <div className="text-xs font-bold text-slate-500 mt-1">{destination.split('(')[1]?.replace(')', '') || "DST"}</div>
                  </div>
                </div>
              </div>

              <Button onClick={() => handleBookClick(train)} className="w-full lg:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 px-8 rounded-xl shadow-md cursor-pointer">
                Book Now
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Passenger Details & Razorpay Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer">
              <X className="w-5 h-5" />
            </button>

            {!bookedTicket ? (
              <div>
                <div className="mb-6">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">Passenger Details</h3>
                  <p className="text-sm font-medium text-slate-500 mt-1">Enter details for {selectedTrain?.name}</p>
                </div>

                <form onSubmit={handlePaymentAndBooking} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                    <Input required value={passengerName} onChange={(e) => setPassengerName(e.target.value)} placeholder="e.g. Rahul Sharma" className="h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 font-medium" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Age</label>
                      <Input required type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g. 25" className="h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 font-medium" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Gender</label>
                      <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 font-medium text-slate-800 dark:text-white">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Berth Preference</label>
                    <select value={berth} onChange={(e) => setBerth(e.target.value)} className="w-full h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 font-medium text-slate-800 dark:text-white">
                      <option>Lower</option>
                      <option>Middle</option>
                      <option>Upper</option>
                      <option>Side Lower</option>
                      <option>No Preference</option>
                    </select>
                  </div>

                  <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl flex items-center justify-between">
                    <span className="font-bold text-sm text-indigo-900 dark:text-indigo-300">Total Fare (3A):</span>
                    <span className="font-black text-lg text-indigo-600 dark:text-indigo-400">₹ 1,250</span>
                  </div>

                  <Button type="submit" disabled={isProcessing} className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg mt-2 shadow-lg shadow-indigo-500/30 cursor-pointer">
                    {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Proceed to Pay via Razorpay"}
                  </Button>
                </form>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1">Payment Successful!</h3>
                <p className="text-sm font-medium text-slate-500 mb-6">Your ticket has been booked successfully.</p>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 text-left mb-6 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase">PNR Number</span>
                    <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">{bookedTicket.pnr}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-slate-500">Payment ID:</span>
                    <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">{bookedTicket.paymentId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-slate-500">Train:</span>
                    <span className="font-bold text-slate-800 dark:text-white">{bookedTicket.trainNumber} - {bookedTicket.trainName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-slate-500">Passenger:</span>
                    <span className="font-bold text-slate-800 dark:text-white">{bookedTicket.passengerName} ({bookedTicket.age}Y)</span>
                  </div>
                </div>

                <Button onClick={() => setIsModalOpen(false)} className="w-full h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer">
                  Close & View Bookings
                </Button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center font-bold text-indigo-600">Loading Search Results...</div>}>
      <SearchResults />
    </Suspense>
  );
}
