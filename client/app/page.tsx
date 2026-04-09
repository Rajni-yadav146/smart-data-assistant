import Link from "next/link";
import { Database } from "lucide-react";

export default function DBWhispererLanding() {
  return (
    <main className="min-h-screen w-full bg-[#030303] text-[#ededed] flex flex-col items-center justify-center relative overflow-hidden font-sans">
      
      {/* Background Ambience Orbs */}
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-[#8B5CF6] mix-blend-screen filter blur-[120px] opacity-30 animate-float pointer-events-none" />
      <div className="absolute bottom-[10%] right-[15%] w-[600px] h-[600px] bg-[#06B6D4] mix-blend-screen filter blur-[150px] opacity-20 animate-float pointer-events-none" style={{ animationDelay: "3s" }} />

      {/* Top Navbar Simulation */}
      <div className="absolute top-0 w-full p-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
           <Database className="w-5 h-5 text-synapse-violet" />
           <span className="font-serif text-xl tracking-wide text-white">DB Whisperer</span>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-4xl px-4 text-center">
        
        {/* Main Hero Typography */}
        <h1 className="font-serif text-7xl md:text-9xl text-[#ededed] tracking-[-0.04em] mb-6">
          DB <span className="text-shimmer italic">Whisperer</span>
        </h1>
        
        {/* Subtitle / Tagline */}
        <p className="text-xl md:text-2xl text-[#9ca3af] font-light tracking-wide max-w-2xl mb-14 drop-shadow-md">
          Talk to your database in plain English
        </p>
        
        {/* Call To Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
          
          {/* Get Started - Shiny Button */}
          <Link href="/chat" className="relative rounded-[24px] p-[1px] overflow-hidden group w-full sm:w-auto shrink-0 shadow-[0_0_40px_-15px_rgba(139,92,246,0.6)]">
            <span 
              className="absolute inset-[-100%] animate-spin-slow rounded-[24px]"
              style={{
                background: "conic-gradient(from 0deg, transparent 0%, #8b5cf6 40%, #06b6d4 50%, transparent 60%)"
              }} 
            />
            <div className="relative z-10 bg-[#0a0a0a] hover:bg-[#111111] transition-colors rounded-[24px] px-8 py-4 flex items-center justify-center gap-3">
              <span className="text-xl leading-none">🚀</span>
              <span className="text-[15px] font-semibold tracking-wider uppercase text-white">Get Started</span>
            </div>
          </Link>

          {/* Try Demo - Glass Button */}
          <Link href="/chat" className="w-full sm:w-auto shrink-0">
            <div className="relative z-10 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-xl transition-colors rounded-[24px] px-8 py-4 flex items-center justify-center gap-3 shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)]">
              <span className="text-xl leading-none">🎤</span>
              <span className="text-[15px] font-medium tracking-wider uppercase text-[#ededed]">Try Demo</span>
            </div>
          </Link>

        </div>
      </div>
      
    </main>
  );
}
