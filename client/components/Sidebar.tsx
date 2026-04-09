"use client";

import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { UploadCloud, FileText, CheckCircle, Database } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export function Sidebar({ classNameProp }: { classNameProp?: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      setUploadStatus("uploading");
      
      // Simulate an API call to the backend
      setTimeout(() => {
        setUploadStatus("success");
      }, 1500);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    maxFiles: 1,
  });

  return (
    <aside className={classNameProp || "w-[280px] glass-panel border-r border-white/5 flex flex-col h-full overflow-hidden shrink-0 hidden md:flex text-white"}>
      <div className="p-5 flex-1 overflow-y-auto w-full flex flex-col gap-8">
        
        {/* Upload Component via Conic Gradient */}
        <div className="flex flex-col gap-3">
          <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9ca3af]">
            Data Ingestion
          </h3>
          
          <div 
            {...getRootProps()}
            className={cn(
              "relative rounded-[20px] p-[1px] overflow-hidden group cursor-pointer transition-all duration-500",
              isDragActive ? "scale-[1.02]" : "hover:-translate-y-1"
            )}
          >
            {/* The animated shiny border */}
            <span className={cn(
              "absolute inset-[-100%] animate-spin-slow rounded-[20px] transition-opacity duration-500",
              isDragActive || uploadStatus === "success" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
            style={{
              background: "conic-gradient(from 0deg, transparent 0%, #8b5cf6 40%, #06b6d4 50%, transparent 60%)"
            }} />
            
            {/* Inner background blocking out the center */}
            <div className={cn(
              "relative z-10 flex flex-col items-center justify-center gap-2 px-4 py-8 rounded-[20px] bg-[#0a0a0a] transition-colors",
               isDragActive ? "bg-[#111111]" : ""
            )}>
              <input {...getInputProps()} />
              
              {uploadStatus === "success" && file ? (
                <>
                  <CheckCircle className="w-7 h-7 text-[#06b6d4] drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                  <p className="text-sm font-medium text-white truncate w-full px-2 text-center">
                    {file.name}
                  </p>
                  <p className="text-[10px] text-[#9ca3af] uppercase tracking-widest">
                    Synced & Ready
                  </p>
                </>
              ) : (
                <>
                  <UploadCloud className={cn("w-7 h-7 transition-colors", isDragActive ? "text-[#8b5cf6] drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]" : "text-[#9ca3af]")} />
                  <p className="text-sm font-medium text-[#ededed]">
                    {isDragActive ? "Drop to Ingest" : "Upload Dataset"}
                  </p>
                  <p className="text-[10px] text-[#9ca3af] uppercase tracking-widest text-center">
                    Drag CSV or click
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions / Feature Cards */}
        <div className="flex flex-col gap-3">
          <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9ca3af]">
            Neural Queries
          </h3>
          <div className="space-y-3">
            {[
              "Show sales for 2024",
              "Find anomalies in revenue",
              "Generate a sales pie chart",
              "Show top 5 regions by profit"
            ].map((action, i) => (
              <div
                key={i}
                className="group p-4 rounded-2xl border border-white/5 bg-white/[0.02] cursor-pointer transition-all duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:border-[#8B5CF6]/40 hover:bg-white/[0.04] glow-violet-hover"
              >
                <style>{`
                  .glow-violet-hover:hover {
                    box-shadow: 0 0 20px -5px rgba(139, 92, 246, 0.3);
                  }
                `}</style>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#8B5CF6]/20 to-transparent border border-white/5 shrink-0 group-hover:scale-110 transition-transform duration-500">
                    <FileText className="w-4 h-4 text-[#8B5CF6]" />
                  </div>
                  <span className="text-[13px] font-medium text-[#ededed] leading-snug">{action}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* User Section */}
      <div className="p-4 border-t border-white/5 bg-black/40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#06b6d4]/20 to-[#8b5cf6]/20 flex items-center justify-center text-sm font-serif text-white border border-white/10 glow-cyan">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-[#ededed] font-medium leading-none mb-1.5">Data Analyst</span>
            <span className="text-[10px] uppercase tracking-widest text-synapse-cyan leading-none font-semibold">Synapse Pro</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
