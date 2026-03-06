import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function VisitStreakSection() {
  const [checkedDays, setCheckedDays] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const saved = localStorage.getItem("hachiko_streak");
    if (saved) setCheckedDays(JSON.parse(saved));
  }, []);

  const today = new Date();
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthLabel =
    currentMonth.toLocaleString("default", { month: "long" }).toUpperCase() +
    " " +
    year;

  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const handleCheckIn = () => {
    if (!checkedDays.includes(todayStr)) {
      const updated = [...checkedDays, todayStr];
      setCheckedDays(updated);
      localStorage.setItem("hachiko_streak", JSON.stringify(updated));
    }
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const getStreak = () => {
    let streak = 0;
    const d = new Date(today);
    while (true) {
      const str = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      if (checkedDays.includes(str)) {
        streak++;
        d.setDate(d.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  const blanks = Array.from({ length: firstDay }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const alreadyCheckedIn = checkedDays.includes(todayStr);
  const streak = getStreak();

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white border-[4px] border-black p-6 rounded-[2rem] shadow-[10px_10px_0_0_#FF99AA]">
        {/* Title */}
        <h2 className="font-display text-3xl md:text-5xl text-white text-stroke text-center mb-5 drop-shadow-[3px_3px_0_rgba(0,0,0,1)] tracking-wider flex items-center justify-center gap-3">
          <CalendarDays className="w-8 h-8 text-black stroke-2" />
          VISIT STREAK
        </h2>

        {/* Month navigation */}
        <div className="flex items-center justify-between mb-4 px-1">
          <button
            onClick={prevMonth}
            className="w-9 h-9 flex items-center justify-center border-[3px] border-black rounded-lg bg-white shadow-[3px_3px_0_0_#000] hover:translate-y-px hover:shadow-[1px_1px_0_0_#000] transition-all font-bold text-lg"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={3} />
          </button>
          <span className="font-display text-xl tracking-widest text-black">
            {monthLabel}
          </span>
          <button
            onClick={nextMonth}
            className="w-9 h-9 flex items-center justify-center border-[3px] border-black rounded-lg bg-white shadow-[3px_3px_0_0_#000] hover:translate-y-px hover:shadow-[1px_1px_0_0_#000] transition-all font-bold text-lg"
          >
            <ChevronRight className="w-4 h-4" strokeWidth={3} />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1">
          {DAYS.map((d) => (
            <div
              key={d}
              className="text-center font-display text-xs text-gray-400 py-1 tracking-wider"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {blanks.map((b) => (
            <div key={`blank-${b}`} />
          ))}
          {days.map((day) => {
            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const isChecked = checkedDays.includes(dateStr);
            const isToday = dateStr === todayStr;

            return (
              <div
                key={day}
                className={`
                  aspect-square flex items-center justify-center rounded-xl border-[2px] text-sm font-body font-bold transition-all
                  ${
                    isChecked
                      ? "bg-[#66DD99] border-black text-black"
                      : isToday
                        ? "bg-white border-[#FF99AA] border-[2.5px] text-black"
                        : "bg-white border-black/20 text-gray-700"
                  }
                `}
              >
                {day}
              </div>
            );
          })}
        </div>

        {/* Bottom row: streak label + check in button */}
        <div className="flex items-center justify-between mt-5">
          <div className="bg-[#FFF9C4] border-[3px] border-black rounded-xl px-4 py-2 shadow-[3px_3px_0_0_#000]">
            <span className="font-display text-lg tracking-wide">
              STREAK: <span className="text-[#FF5555]">{streak} DAYS</span>
            </span>
          </div>

          <button
            onClick={handleCheckIn}
            disabled={alreadyCheckedIn}
            className={`font-display text-lg md:text-xl px-6 md:px-8 py-2 md:py-3 rounded-xl border-[3px] border-black tracking-wider transition-all ${
              alreadyCheckedIn
                ? "bg-gray-200 text-gray-500 cursor-default shadow-none"
                : "bg-[#66DD99] text-black shadow-[4px_4px_0_0_#000] hover:translate-y-px hover:shadow-[2px_2px_0_0_#000] cursor-pointer"
            }`}
          >
            {alreadyCheckedIn ? "CHECKED IN!" : "CHECK IN"}
          </button>
        </div>
      </div>
    </motion.section>
  );
}
