import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Timer, RefreshCw } from "lucide-react";
import axios from "axios";

function useCountdown(targetDate) {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    // If no target date is provided, stop here
    if (!targetDate) return;

    const updateTime = () => {
      const now = Date.now();
      const target = Date.parse(targetDate);
      const diff = Math.max(0, target - now); // Ensure no negative values

      setTime({
        h: Math.floor(diff / (1000 * 60 * 60)),
        m: Math.floor((diff / (1000 * 60)) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };

    updateTime(); // Run immediately so there's no 1-second lag
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return time;
}
const TimerComponent = ({ refreshTime }) => {
  // Use a fallback or conditional to prevent errors before the API returns
  const time = useCountdown(refreshTime);
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <span>
      {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
    </span>
  );
};

export default function LeaderboardSection() {
  const pad = (n) => String(n).padStart(2, "0");
  const [search, setSearch] = useState("");
  const [refreshTime, setRefreshTime] = useState("");

  // new state for live data from server
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(false);

  const formatBalance = (amount) => {
    if (amount == null) return "";
    if (amount >= 1e6) return (amount / 1e6).toFixed(2) + "M";
    if (amount >= 1e3) return (amount / 1e3).toFixed(2) + "K";
    return amount.toString();
  };

  const formatTime = (days) => {
    if (days == null) return "N/A";
    // show only days, you could add hours if available
    return `${days}d`;
  };

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/leaderboard");
      const entries = res.data.entries || [];
      // sort by amount descending just in case
      entries.sort((a, b) => (b.amount || 0) - (a.amount || 0));
      const mapped = entries.map((e, i) => ({
        rank: i + 1,
        wallet: e.wallet,
        full: e.wallet,
        balance: formatBalance(e.amount),
        time: formatTime(e.holdingDays),
      }));
      setLeaders(mapped);
    } catch (err) {
      console.error("failed to load leaderboard", err);
    }
    setLoading(false);
  };

  const refreshLeaderboard = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/leaderboard/refresh");
      // console.log("refresh response", res.data);
      if (res.data.refreshTime) {
        setRefreshTime(res.data.refreshTime.toString());
      } else {
        fetchLeaderboard();
      }
    } catch (err) {
      console.error("failed to refresh leaderboard", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeaderboard();
    const id = setInterval(fetchLeaderboard, 10 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const filteredTable = leaders
    .filter((h) => h.rank >= 4)
    .filter(
      (h) =>
        search === "" ||
        h.wallet.toLowerCase().includes(search.toLowerCase()) ||
        h.full.toLowerCase().includes(search.toLowerCase()),
    );

const truncate = (addr, length = 12) => {
  if (!addr) return "";
  if (addr.length <= length) return addr;

  // Calculate how many characters to show on each side
  // Example: length 10 -> 4 + 2 (ellipsis) + 4 = 10
  const sideLength = Math.floor((length - 3) / 2); 
  
  return `${addr.slice(0, sideLength)}...${addr.slice(-sideLength)}`;
};

  const first = leaders[0] || {};
  const second = leaders[1] || {};
  const third = leaders[2] || {};

  return (
    <section className="w-full max-w-4xl mx-auto">
      <div className="bg-white border-[4px] border-black rounded-[2rem] shadow-[10px_10px_0_0_#66DD99] overflow-hidden">
        {/* Title */}
        <div className="pt-6 pb-4 text-center">
          <div class="flex items-center justify-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-trophy w-7 h-7 text-black"
              aria-hidden="true"
            >
              <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"></path>
              <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"></path>
              <path d="M18 9h1.5a1 1 0 0 0 0-5H18"></path>
              <path d="M4 22h16"></path>
              <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"></path>
              <path d="M6 9H4.5a1 1 0 0 1 0-5H6"></path>
            </svg>
            <h2 class="text-3xl md:text-4xl text-white text-stroke font-display text-center drop-shadow-[3px_3px_0_rgba(0,0,0,1)] tracking-wider">
              Holder Leaderboard
            </h2>
          </div>
        </div>

        <div className="px-5 pb-5">
          {/* Search + timer row */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

              <input
                class="flex w-full bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 border-[2px] border-black rounded-sm font-display text-sm h-10"
                placeholder="Search wallet address..."
                data-testid="input-search-wallet"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              ></input>
            </div>
            <div className="flex items-center gap-1 border-[2px] border-black rounded-xl px-3 py-2.5 bg-white font-display text-base tracking-widest shadow-[2px_2px_0_0_#000]">
              <Timer className="w-4 h-4" />
              {refreshTime && <TimerComponent refreshTime={refreshTime} />}
            </div>
            <button
              onClick={refreshLeaderboard}
              className="w-10 h-10 flex items-center justify-center border-[2px] border-black rounded-xl bg-[#66DD99] shadow-[2px_2px_0_0_#000] hover:translate-y-px hover:shadow-none transition-all"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Podium: 2nd | 1st | 3rd — 1st is taller */}

          <div className="flex items-end justify-center gap-3 md:gap-6 relative z-10 pt-8">
            {/* 2nd Place */}
            <div
              className="flex flex-col items-center"
              style={{ opacity: 1, transform: "none" }}
            >
              <div
                className="text-3xl md:text-4xl mb-1"
                style={{ transform: "translateY(-4.80782px)" }}
              >
                🥈
              </div>

              <div className="bg-gradient-to-b from-[#E8E8E8] to-[#B8B8B8] border-[4px] border-black rounded-2xl p-3 md:p-4 shadow-[8px_8px_0_0_#000] w-26 md:w-36 relative">
                <div className="absolute -top-3 -right-3 bg-[#87E4A6] border-[3px] border-black rounded-full w-8 h-8 flex items-center justify-center shadow-[3px_3px_0_0_#000]">
                  <span className="font-display text-sm font-bold">2</span>
                </div>

                <a
                  href={`https://solscan.io/account/${second.full}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] md:text-xs text-blue-700 hover:underline block text-center truncate font-bold"
                >
                  {truncate(second.wallet)}
                </a>

                <div className="bg-white border-[2px] border-black rounded-lg px-2 py-1 mt-2 shadow-[2px_2px_0_0_#000]">
                  <div className="font-display text-xs md:text-sm text-black text-center font-bold">
                    {second.balance}
                  </div>
                </div>

                <div className="font-display text-[10px] md:text-xs text-[#2E7D32] text-center mt-1 font-bold">
                  ⏱️ {second.time}
                </div>
              </div>

              <div className="bg-gradient-to-b from-[#D0D0D0] to-[#A0A0A0] border-[4px] border-black border-t-0 w-26 md:w-36 h-20 md:h-24 flex items-center justify-center shadow-[8px_8px_0_0_#000] rounded-b-lg">
                <span className="font-display text-3xl md:text-4xl text-white font-bold drop-shadow-[2px_2px_0_#000]">
                  2nd
                </span>
              </div>
            </div>

            {/* 1st Place */}
            <div
              className="flex flex-col items-center -mt-4"
              style={{ opacity: 1, transform: "none" }}
            >
              <div
                className="text-4xl md:text-5xl mb-1"
                style={{
                  transform: "translateY(-2.4084px) rotate(2.17308deg)",
                }}
              >
                👑
              </div>

              <div className="bg-gradient-to-b from-[#FFE566] to-[#FFB800] border-[4px] border-black rounded-2xl p-4 md:p-5 shadow-[10px_10px_0_0_#000] w-32 md:w-44 relative">
                <div
                  className="absolute -top-4 -left-4 text-2xl"
                  style={{ transform: "rotate(17.52deg)" }}
                >
                  ⭐
                </div>

                <div
                  className="absolute -top-4 -right-4 text-2xl"
                  style={{ transform: "rotate(342.48deg)" }}
                >
                  ⭐
                </div>

                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF6B6B] border-[3px] border-black rounded-full w-10 h-10 flex items-center justify-center shadow-[3px_3px_0_0_#000]">
                  <span className="font-display text-base font-bold text-white">
                    1
                  </span>
                </div>

                <div className="text-center mt-3">
                  <a
                    href={`https://solscan.io/account/${first.full}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs md:text-sm text-blue-800 hover:underline block truncate font-bold"
                  >
                    {truncate(first.wallet)}
                  </a>
                </div>

                <div className="bg-white border-[3px] border-black rounded-xl px-3 py-2 mt-2 shadow-[3px_3px_0_0_#000]">
                  <div className="font-display text-sm md:text-lg text-black text-center font-bold">
                    🏆 {first.balance}
                  </div>
                </div>

                <div className="font-display text-xs md:text-sm text-[#1B5E20] text-center mt-2 font-bold">
                  ⏱️ {first.time}
                </div>
              </div>

              <div className="bg-gradient-to-b from-[#FFCC00] to-[#E6A800] border-[4px] border-black border-t-0 w-32 md:w-44 h-28 md:h-36 flex items-center justify-center shadow-[10px_10px_0_0_#000] rounded-b-xl relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-50"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='2' fill='%23FFE566' fill-opacity='0.3'/%3E%3C/svg%3E\")",
                  }}
                />

                <span className="font-display text-4xl md:text-5xl text-white font-bold drop-shadow-[3px_3px_0_#000] relative z-10">
                  1st
                </span>
              </div>
            </div>

            {/* 3rd Place */}
            <div
              className="flex flex-col items-center"
              style={{ opacity: 1, transform: "none" }}
            >
              <div
                className="text-3xl md:text-4xl mb-1"
                style={{ transform: "translateY(-3.66173px)" }}
              >
                🥉
              </div>

              <div className="bg-gradient-to-b from-[#E8A060] to-[#CD7F32] border-[4px] border-black rounded-2xl p-3 md:p-4 shadow-[8px_8px_0_0_#000] w-26 md:w-36 relative">
                <div className="absolute -top-3 -right-3 bg-[#FFB4D9] border-[3px] border-black rounded-full w-8 h-8 flex items-center justify-center shadow-[3px_3px_0_0_#000]">
                  <span className="font-display text-sm font-bold">3</span>
                </div>

                <a
                  href={`https://solscan.io/account/${third.full}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] md:text-xs text-blue-700 hover:underline block text-center truncate font-bold"
                >
                  {truncate(third.wallet)}
                </a>

                <div className="bg-white border-[2px] border-black rounded-lg px-2 py-1 mt-2 shadow-[2px_2px_0_0_#000]">
                  <div className="font-display text-xs md:text-sm text-black text-center font-bold">
                    {third.balance}
                  </div>
                </div>

                <div className="font-display text-[10px] md:text-xs text-[#2E7D32] text-center mt-1 font-bold">
                  ⏱️ {third.time}
                </div>
              </div>

              <div className="bg-gradient-to-b from-[#D89050] to-[#B06020] border-[4px] border-black border-t-0 w-26 md:w-36 h-14 md:h-18 flex items-center justify-center shadow-[8px_8px_0_0_#000] rounded-b-lg">
                <span className="font-display text-2xl md:text-3xl text-white font-bold drop-shadow-[2px_2px_0_#000]">
                  3rd
                </span>
              </div>
            </div>
          </div>

          {/* optionally show a loading indicator */}
          {loading && leaders.length === 0 && (
            <div className="text-center py-6 font-display font-bold">
              Loading leaderboard...
            </div>
          )}

          {/* Table */}
          <div className="border-[2px] border-black rounded-xl overflow-hidden mt-10">
            <table className="w-full">
              <thead>
                <tr className="border-b-[2px] border-black bg-[#FFF9C4]">
                  <th className="py-2 px-4 text-left font-display text-sm tracking-wider uppercase">
                    Rank
                  </th>
                  <th className="py-2 px-4 text-left font-display text-sm tracking-wider uppercase">
                    Wallet
                  </th>
                  <th className="py-2 px-4 text-right font-display text-sm tracking-wider uppercase">
                    Balance
                  </th>
                  <th className="py-2 px-4 text-right font-display text-sm tracking-wider uppercase">
                    Holding Time
                  </th>
                </tr>
              </thead>
              <tbody className="font-body font-bold text-sm">
                {filteredTable.map((row, index) => (
                  <tr
                    key={row.rank}
                    className={`border-t border-black/10 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <td className="py-2.5 px-4 font-display text-base">
                      #{row.rank}
                    </td>
                    <td className="py-2.5 px-4">
                      <a
                        href={`https://solscan.io/account/${row.full}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#4CAF50] hover:underline font-mono"
                      >
                        {truncate(row.wallet, 15)}
                      </a>
                    </td>
                    <td className="py-2.5 px-4 text-right font-display text-sm tracking-wider uppercase">
                      {row.balance}
                    </td>
                    <td className="py-2.5 px-4 text-right font-display text-sm tracking-wider uppercase text-[#4CAF50]">
                      {row.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
