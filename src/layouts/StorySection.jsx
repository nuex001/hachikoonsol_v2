import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Search } from "lucide-react";
import dex from "../assets/images/dex.png";

const CA = "AsrtqZiNYt3c6nNCtkj7abUrVc8APsFF37Wffq45rkVh";

export default function StorySection() {
  const [copied, setCopied] = React.useState(false);

  const copyCA = () => {
    navigator.clipboard.writeText(CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const CheckIcon = () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

  const CopyIcon = () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );

  const XIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
  const TelegramIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.993 15.673l-.398 4.335c.57 0 .817-.245 1.115-.54l2.675-2.56 5.548 4.062c1.017.56 1.739.266 1.993-.94l3.613-16.93.001-.001c.302-1.404-.507-1.953-1.49-1.585L1.34 9.27c-1.364.53-1.343 1.291-.232 1.637l5.645 1.762L19.86 4.72c.62-.38 1.183-.17.72.21" />
    </svg>
  );

  const DexIcon = () => (
    <img
      src={dex}
      alt="DexScreener"
      style={{ width: "20px", height: "20px" }}
    />
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="bg-white border-[4px] border-black p-6 md:p-8 rounded-[2rem] shadow-[12px_12px_0_0_#66CCFF] relative">
        <h2 className="font-display text-4xl md:text-6xl text-white text-stroke mb-6 text-center drop-shadow-[4px_4px_0_rgba(0,0,0,1)] transform -rotate-1 tracking-wider">
          The Story
        </h2>

        <div className="space-y-4 font-body font-bold text-center max-w-2xl mx-auto">
          <p className="bg-[#E0F7FA] p-3 rounded-xl border-[3px] border-black w-full shadow-[4px_4px_0_0_#000]">
            <span className="font-display text-xl md:text-2xl block mb-1 tracking-wide text-stroke-xs text-white drop-shadow-[2px_2px_0_#000]">
              The oldest Hachiko token ever launched.
            </span>
          </p>

          <div className="grid md:grid-cols-2 gap-3 text-base">
            <div className="bg-[#FFF9C4] p-3 rounded-xl border-[3px] border-black shadow-[4px_4px_0_0_#000] hover:translate-y-1 hover:shadow-none transition-all font-normal">
              Just like Hachiko waited for years, this coin was launched 2 years
              ago.
            </div>
            <div className="bg-[#E0F7FA] p-3 rounded-xl border-[3px] border-black shadow-[4px_4px_0_0_#000] hover:translate-y-1 hover:shadow-none transition-all font-normal">
              The dev waited for holders and is still holding. No transactions.
            </div>
          </div>

          <a
            href="https://solscan.io/account/7mmcEghuGQSirgPN6jJP7fAXDPna41c9rDrv35davKYA#transfers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FFF] text-black font-display text-lg px-5 py-2 rounded-lg border-[3px] border-black shadow-[4px_4px_0_0_#000] hover:translate-y-1 hover:shadow-none transition-all tracking-wide text-stroke-none font-light"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-search w-5 h-5 text-black"
              aria-hidden="true"
            >
              <path d="m21 21-4.34-4.34"></path>
              <circle cx="11" cy="11" r="8"></circle>
            </svg>
            Check Solscan (Inactive 2y)
          </a>
        </div>
      </div>
      {/* CA */}
      <div className="relative w-full max-w-3xl flex flex-col items-center gap-5 mt-[100px] mx-auto ">
        {/* CA Bar */}
        <div
          className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl pl-4"
          style={{
            background: "rgba(255,255,255,0.92)",
            border: "3px solid #1a1a2e",
            boxShadow: "6px 8px 0px #5bc8f5",
            backdropFilter: "blur(8px)",
          }}
        >
          {/* CA Label */}
          <span className="font-display text-3xl text-gray-500 italic pr-2">
            CA:
          </span>

          {/* Address */}
          <div className="flex-1 w-full bg-gray-100/80 rounded-sm p-2 md:p-4 flex items-center justify-center border-2 border-transparent hover:border-black/10 transition-colors">
            <code className="font-display text-sm md:text-lg truncate text-black select-all tracking-wide max-w-[200px] md:max-w-full">
              AsrtqZiNYt3c6nNCtkj7abUrVc8APsFF37Wffq45rkVh
            </code>
          </div>

          {/* Copy Button */}
          <button
            onClick={copyCA}
            className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-150 active:scale-95"
            style={{
              background: copied ? "#22c55e" : "#1a1a2e",
              color: "#fff",
              border: "2px solid #1a1a2e",
              boxShadow: copied ? "2px 2px 0px #166534" : "2px 2px 0px #444",
            }}
            title="Copy address"
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Buy on Pump.fun */}
          <a
            className="flex items-center gap-2 px-6 py-3 rounded-2xl text-base font-black tracking-wider transition-all duration-150 active:scale-95 hover:-translate-y-0.5"
            style={{
              fontFamily: "'Black Han Sans', 'Bangers', Impact, sans-serif",
              background: "linear-gradient(135deg, #86efac 0%, #4ade80 100%)",
              color: "#1a1a2e",
              border: "3px solid #1a1a2e",
              boxShadow: "3px 3px 0px #1a1a2e",
              letterSpacing: "0.08em",
            }}
            href="https://pump.fun/coin/AsrtqZiNYt3c6nNCtkj7abUrVc8APsFF37Wffq45rkVh"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-lg">💊</span>
            BUY ON PUMP.FUN
          </a>

          {/* DexScreener */}
          <a
            className="flex items-center gap-2 px-6 py-3 rounded-2xl text-base font-black tracking-wider transition-all duration-150 active:scale-95 hover:-translate-y-0.5"
            style={{
              fontFamily: "'Black Han Sans', 'Bangers', Impact, sans-serif",
              background: "rgba(255,255,255,0.92)",
              color: "#1a1a2e",
              border: "3px solid #1a1a2e",
              boxShadow: "3px 3px 0px #1a1a2e",
              letterSpacing: "0.08em",
            }}
            href="https://dexscreener.com/solana/htg9w8npnc7auwkzcpfsu1gfwgfhs8odpvgrt3anddwx"
            target="_blank"
            rel="noopener noreferrer"
          >
            <DexIcon />
            DEXSCREENER
          </a>

          {/* Community / X */}
          <a
            className="flex items-center gap-2 px-6 py-3 rounded-2xl text-base font-black tracking-wider transition-all duration-150 active:scale-95 hover:-translate-y-0.5"
            style={{
              fontFamily: "'Black Han Sans', 'Bangers', Impact, sans-serif",
              background: "#000000ff",
              color: "#fff",
              border: "3px solid #000000ff",
              boxShadow: "3px 3px 0px #151515ff",
              letterSpacing: "0.08em",
            }}
            href="https://twitter.com/i/communities/2026833782444277974"
            target="_blank"
            rel="noopener noreferrer"
          >
            <XIcon />
            COMMUNITY
          </a>
          <a
            className="flex items-center gap-2 px-6 py-3 rounded-2xl text-base font-black tracking-wider transition-all duration-150 active:scale-95 hover:-translate-y-0.5"
            style={{
              fontFamily: "'Black Han Sans', 'Bangers', Impact, sans-serif",
              background: "#229ED9",
              color: "#fff",
              border: "3px solid #229ED9",
              boxShadow: "3px 3px 0px #151515ff",
              letterSpacing: "0.08em",
            }}
            href="https://t.me/hachikoogcto"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TelegramIcon />
            COMMUNITY
          </a>
        </div>
      </div>
    </motion.section>
  );
}
