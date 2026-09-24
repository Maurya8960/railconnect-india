"use client";
import React, { useState, useEffect, useRef } from "react";
import { MapPin, Loader2 } from "lucide-react";

export default function StationAutocomplete({ placeholder, iconColor, label, name }: { placeholder: string, iconColor: string, label?: string, name?: string }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    if (query.trim().length > 0) {
      setIsLoading(true);
      setIsOpen(true);
      const fetchStations = async () => {
        try {
          const res = await fetch(`http://127.0.0.1:8000/api/v1/stations?q=${query}`);
          const data = await res.json();
          if (Array.isArray(data)) {
            setResults(data.slice(0, 10));
          } else {
            setResults([]);
          }
        } catch (e) {
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      };
      
      const timeoutId = setTimeout(() => fetchStations(), 300);
      return () => clearTimeout(timeoutId);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="flex items-center gap-3 w-full relative z-[100]">
        <MapPin className={`w-6 h-6 ${iconColor} shrink-0`} />
        <div className="flex flex-col w-full">
          {label && <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">{label}</label>}
          <input 
            name={name}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => { if(query.length > 0) setIsOpen(true); }}
            placeholder={placeholder} 
            className="outline-none bg-transparent text-lg font-bold text-slate-800 dark:text-white placeholder:text-slate-400 placeholder:font-normal w-full"
            autoComplete="off"
            required
          />
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute left-0 right-0 top-[120%] bg-white dark:bg-[#0f172a] border-2 border-indigo-500 shadow-[0_10px_40px_rgba(0,0,0,0.4)] rounded-2xl z-[999999] max-h-60 overflow-y-auto">
          {isLoading && (
            <div className="p-4 text-center text-sm font-bold text-indigo-500 flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Searching...
            </div>
          )}
          {!isLoading && results.length === 0 && (
            <div className="p-4 text-center text-sm font-bold text-slate-500 dark:text-slate-400">
              No stations found.
            </div>
          )}
          {!isLoading && results.length > 0 && results.map((station, idx) => (
            <div 
              key={idx} 
              onClick={() => {
                setQuery(`${station.name} (${station.code})`);
                setIsOpen(false);
              }}
              className="px-4 py-3 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 cursor-pointer border-b border-slate-100 dark:border-slate-800/50 last:border-0 transition-colors flex justify-between items-center"
            >
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 dark:text-white text-sm">{station.name}</span>
                <span className="text-[11px] text-slate-500">{station.state_city}</span>
              </div>
              <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/50 px-2 py-1 rounded-md">{station.code}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
