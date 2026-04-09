"use client";

import { User, ServerCrash, Lightbulb, Database, Copy } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ChartData = {
  type: "bar" | "line" | "pie";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

export type MessagePayload = {
  role: "user" | "bot";
  content?: string;
  insight?: string;
  chart?: ChartData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table?: Record<string, any>[];
  isError?: boolean;
};

export function MessageCard({ message }: { message: MessagePayload }) {
  const isUser = message.role === "user";

  const renderChart = () => {
    if (!message.chart || !message.chart.data) return null;
    const { type, data } = message.chart;
    
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom" as const, labels: { color: "#9ca3af", font: { family: "Inter" } } },
      },
      scales: type !== "pie" ? {
        x: { ticks: { color: "#9ca3af", font: { family: "Inter" } }, grid: { color: "rgba(255, 255, 255, 0.05)" } },
        y: { ticks: { color: "#9ca3af", font: { family: "Inter" } }, grid: { color: "rgba(255, 255, 255, 0.05)" } }
      } : undefined
    };

    return (
      <div className="w-full h-80 mt-6 bg-[#030303] p-4 rounded-xl border border-white/5 shadow-inner">
        {type === "bar" && <Bar data={data} options={options} />}
        {type === "line" && <Line data={data} options={options} />}
        {type === "pie" && <Pie data={data} options={options} />}
      </div>
    );
  };

  const renderTable = () => {
    if (!message.table || message.table.length === 0) return null;

    const headers = Object.keys(message.table[0]);

    return (
      <div className="mt-6 w-full overflow-x-auto rounded-xl border border-white/10 bg-[#030303]">
        <table className="w-full text-[13px] text-left text-[#ededed] font-mono">
          <thead className="text-[10px] uppercase tracking-widest text-[#9ca3af] bg-[#0a0a0a] border-b border-white/10">
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-4 py-3 whitespace-nowrap font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {message.table.map((row, i) => (
              <tr
                key={i}
                className="border-b last:border-b-0 border-white/5 hover:bg-white/5 transition-colors"
              >
                {headers.map((header) => (
                  <td key={`${i}-${header}`} className="px-4 py-3 whitespace-nowrap">
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  if (isUser) {
    return (
      <div className="flex w-full px-4 md:px-0 mb-6 justify-end">
        <div className="flex gap-4 max-w-3xl w-full flex-row-reverse">
          <div className="w-8 h-8 rounded-full bg-[#1f1f1f] border border-white/10 text-[#9ca3af] flex items-center justify-center shrink-0 mt-1 shadow-sm">
            <User className="w-4 h-4" />
          </div>
          <div className="flex flex-col gap-2 max-w-[calc(100%-3rem)] items-end w-full">
            <div className="bg-[#111111] px-5 py-3.5 rounded-2xl border border-white/10 bg-opacity-80 backdrop-blur-md shadow-lg shadow-black/50 inline-block max-w-[85%] text-left">
              <p className="text-[15px] text-[#ededed] leading-relaxed whitespace-pre-wrap font-sans">
                {message.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Bot Response - The Dark IDE Window style
  return (
    <div className="flex w-full px-4 md:px-0 justify-center mb-8 relative">
      <div className="w-full max-w-4xl relative rounded-[24px] overflow-hidden border border-white/10 bg-[#080808]/90 backdrop-blur-2xl shadow-[0_0_40px_-15px_rgba(139,92,246,0.3)]">
        
        {/* Top Window Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-[#030303]/80">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 border border-red-500/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 border border-yellow-500/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 border border-green-500/20" />
          </div>
          <div className="flex gap-2">
            <div className="font-mono text-[10px] text-[#9ca3af] uppercase tracking-widest flex items-center gap-2">
              <Database className="w-3 h-3 text-[#06b6d4]" />
              synapse_worker.md
            </div>
          </div>
          <button className="text-[#9ca3af] hover:text-white transition-colors" title="Copy output">
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 md:p-8 w-full text-gray-800 dark:text-[#e4e2e1]">
          {message.isError && (
            <div className="bg-red-500/10 text-red-400 p-4 rounded-xl flex gap-3 text-[14px] border border-red-500/20 items-start font-mono">
              <ServerCrash className="w-5 h-5 shrink-0 mt-0.5" />
              <p>{message.content || "An execution error occurred in the node process."}</p>
            </div>
          )}

          {!message.isError && message.content && (
            <div className="text-[15px] text-[#ededed] font-sans leading-relaxed whitespace-pre-wrap">
              {message.content}
            </div>
          )}

          {message.insight && (
            <div className="mt-6 bg-[#8b5cf6]/5 border border-[#8b5cf6]/20 p-5 rounded-2xl flex gap-4 shadow-inner relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#8b5cf6] to-[#06b6d4]" />
              <Lightbulb className="w-5 h-5 text-[#8b5cf6] shrink-0 fill-[#8b5cf6]/20" />
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#8b5cf6]">Neural Insight</span>
                <div className="text-[14px] text-[#ededed] font-medium leading-relaxed">
                  {message.insight}
                </div>
              </div>
            </div>
          )}

          {renderChart()}
          
          {renderTable()}
        </div>
      </div>
    </div>
  );
}
