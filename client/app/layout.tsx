import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Data Assistant",
  description: "AI-powered conversational data analytics tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${instrumentSerif.variable} antialiased h-screen w-full overflow-hidden bg-[#030303] text-[#ededed] font-sans selection:bg-[#8B5CF6]/30 flex flex-col`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
