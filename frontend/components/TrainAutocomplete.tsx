"use client";
import React, { useState, useEffect, useRef } from "react";
import { TrainFront } from "lucide-react";

export default function TrainAutocomplete({ placeholder, iconColor, label }: { placeholder: string, iconColor: string, label?: string }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      const fetchTrains = async () => {
        try {
          const res = await fetch(`http://127.0.0.1:8000/api/v1/trains?q=${query}`);
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setResults(data.slice(0, 10));
            setIsOpen(true);
          } else {
            setResults([]);
            setIsOpen(false);
          }
        } catch (e) {
          setResults([]);
          setIsOpen(false);
        }
      };
      const timeoutId = setTimeout(() => fetchTrains(), 200);
      return () => clearTimeout(timeoutId);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="flex items-center gap-3 w-full">
        <TrainFront className={`w-6 h-6 ${iconColor} shrink-0`} />
        <div className="flex flex-col w-full">
          {label && <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">{label}</label>}
          <input 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => { if(results.length > 0) setIsOpen(true); }}
            placeholder={placeholder} 
            className="outline-none bg-transparent text-lg font-bold text-slate-800 dark:text-white placeholder:text-slate-400 placeholder:font-normal w-full"
          />
        </div>
      </div>
      
      {isOpen && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-4 bg-white dark:bg-[#0f172a] border-2 border-indigo-500 shadow-[0_10px_40px_rgba(0,0,0,0.3)] rounded-2xl z-[99999] max-h-60 overflow-y-auto">
          {results.map((train, idx) => (
            <div 
              key={idx} 
              onClick={() => {
                setQuery(`${train.number} - ${train.name}`);
                setIsOpen(false);
              }}
              className="px-4 py-3 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 cursor-pointer border-b border-slate-100 dark:border-slate-800/50 last:border-0 transition-colors flex justify-between items-center"
            >
              <span className="font-bold text-slate-900 dark:text-white text-sm">{train.name}</span>
              <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/50 px-2 py-1 rounded-md">{train.number}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
