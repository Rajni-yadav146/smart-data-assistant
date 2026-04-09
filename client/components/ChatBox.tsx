"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Send, Loader2, BarChart2 } from "lucide-react";
import { MessageCard, MessagePayload } from "./MessageCard";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export function ChatBox() {
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Array<{id: number, size: number, top: string, left: string, duration: number, delay: number, opacity: number}>>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Generate particles safely on client side
    const p = Array.from({length: 40}).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.2
    }));
    setParticles(p);
  }, []);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMessage: MessagePayload = { role: "user", content: inputValue.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await axios.post("http://localhost:5000/query", {
        query: userMessage.content,
      });

      const { text, insight, chart, table } = response.data;

      const botMessage: MessagePayload = {
        role: "bot",
        content: text,
        insight,
        chart,
        table,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("API Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          isError: true,
          content: "Failed to fetch response. Please verify Synapse Engine is online.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#030303] w-full relative transition-colors overflow-hidden">
      
      {/* Background Ambience Orbs */}
      <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-[#8B5CF6] mix-blend-screen filter blur-[100px] opacity-20 animate-float pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-[#06B6D4] mix-blend-screen filter blur-[120px] opacity-10 animate-float pointer-events-none" style={{ animationDelay: "2s" }} />

      <div className="flex-1 overflow-y-auto w-full flex flex-col items-center px-4 relative z-10 scroll-smooth">
        
        {messages.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center -mt-20">
            {/* Live Particles Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              {particles.map((p) => (
                <div
                  key={p.id}
                  className="absolute rounded-full bg-[#06B6D4]"
                  style={{
                    width: p.size + 'px',
                    height: p.size + 'px',
                    top: p.top,
                    left: p.left,
                    opacity: p.opacity,
                    animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <h1 className="font-serif text-5xl md:text-7xl text-[#ededed] flex items-center gap-4 tracking-[-0.03em]">
                Data <span className="text-shimmer italic">Intelligence</span>
              </h1>
              <p className="mt-6 text-[#9ca3af] max-w-md text-center text-lg font-light leading-relaxed">
                Upload a dataset and execute neural queries in plain English. Synapse will generate instant insights.
              </p>
            </div>
          </div>
        )}

        <div className="w-full max-w-4xl mx-auto space-y-6 pb-40 pt-8 flex flex-col relative z-20">
          {messages.map((msg, index) => (
            <MessageCard key={index} message={msg} />
          ))}

          {isTyping && (
            <div className="flex w-full justify-start mb-4 px-4 md:px-0">
              <div className="flex gap-4 w-full max-w-sm">
                <div className="flex flex-col gap-2">
                  <div className="text-[10px] uppercase tracking-widest text-[#06b6d4] mt-1.5 animate-pulse font-mono flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#06b6d4]" />
                    Processing Query Matrix...
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 pt-16 pb-8 px-4 flex justify-center bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent z-50">
        <div className="w-full max-w-[800px] mx-auto relative group">
          
          {/* Synapse Border Glow Container */}
          <div className="relative rounded-[24px] p-[1px] overflow-hidden">
            <span className={cn(
              "absolute inset-[-100%] animate-spin-slow rounded-[24px] transition-opacity duration-300",
              inputValue.trim() ? "opacity-100" : "opacity-40 group-hover:opacity-100"
            )}
            style={{
              background: "conic-gradient(from 0deg, transparent 0%, #8b5cf6 40%, #06b6d4 50%, transparent 60%)"
            }} />
            
            <div className="relative z-10 bg-[#0a0a0a]/90 backdrop-blur-xl rounded-[24px] transition-colors">
              <form
                onSubmit={handleSubmit}
                className="flex items-end gap-2 p-1 relative"
              >
                <div className="absolute left-4 bottom-3.5 text-[#8b5cf6] pointer-events-none">
                  <BarChart2 className="w-5 h-5 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                </div>
                
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Execute query..."
                  className="w-full max-h-[400px] min-h-[52px] resize-none bg-transparent py-4 pl-12 pr-14 text-[15px] focus:outline-none text-[#ededed] placeholder-[#9ca3af] transition-colors font-sans"
                  rows={1}
                />
                
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className={cn(
                    "absolute right-2 bottom-2 p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center",
                    inputValue.trim() && !isTyping
                      ? "bg-[#06b6d4] hover:bg-[#0891b2] text-white shadow-[0_0_15px_-3px_rgba(6,182,212,0.5)]"
                      : "bg-[#1f1f1f] text-gray-600 cursor-not-allowed"
                  )}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
      
      <div className="absolute bottom-2 left-0 right-0 flex justify-center z-50">
        <div className="text-center pb-2 text-[10px] text-[#9ca3af] uppercase tracking-widest font-mono">
          Synapse Engine may hallucinate data. Verify critical analysis.
        </div>
      </div>
    </div>
  );
}
