"use client";

import { useTheme } from "next-themes";
import { Database } from "lucide-react";
import { useEffect, useState } from "react";

export function Header() {
  const { setTheme } = useTheme();

  useEffect(() => {
    // Force dark theme for Synapse UI
    setTheme("dark");
  }, [setTheme]);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-transparent sticky top-0 z-10 border-b border-white/5">
      <div className="flex items-center gap-3 text-white px-2 py-1.5 rounded-lg cursor-pointer transition-colors group">
        <div className="relative">
          <Database className="w-5 h-5 text-synapse-violet drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
          <div className="absolute inset-0 bg-synapse-violet blur-md opacity-40 group-hover:opacity-80 transition-opacity" />
        </div>
        <h1 className="text-xl font-serif text-white tracking-wide">
          Smart Data Assistant
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-synapse-emerald opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-synapse-emerald"></span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-[#9ca3af] font-medium">System Online</span>
        </div>
      </div>
    </header>
  );
}
