"use client";

import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ChatBox } from "@/components/ChatBox";

export default function Home() {
  return (
    <div className="flex w-full min-h-screen bg-[#030303] overflow-hidden font-sans text-[#ededed] relative">
      <div className="flex w-full h-screen relative z-10">
        <Sidebar classNameProp="w-[300px] bg-[#0a0a0a]/70 backdrop-blur-[16px] border-r border-white/10 flex flex-col h-full overflow-hidden shrink-0 hidden md:flex relative z-40 transition-colors" />
        <div className="flex-1 flex flex-col h-full overflow-hidden w-full relative z-30">
          <Header />
          <main className="flex-1 flex w-full relative overflow-hidden bg-transparent pt-0">
            <ChatBox />
          </main>
        </div>
      </div>
    </div>
  );
}
