import React from "react";
import { motion } from "framer-motion";

const EVENTS = [
  {
    year: "1923",
    title: "Birth",
    description: "Hachiko is born in Odate, Akita Prefecture.",
    color: "bg-[#E0F7FA]",
  },
  {
    year: "1924",
    title: "Adoption",
    description: "Adopted by Professor Hidesaburō Ueno of Tokyo University.",
    color: "bg-[#FFF9C4]",
  },
  {
    year: "1925",
    title: "Loss",
    description: "Professor Ueno passes away, but Hachiko continues to wait.",
    color: "bg-[#E0F7FA]",
  },
  {
    year: "1932",
    title: "Fame",
    description: "Hachiko's story inspires Japan, becoming a national symbol.",
    color: "bg-[#FFF9C4]",
  },
  {
    year: "1935",
    title: "Reunion",
    description: "Hachiko passes away at Shibuya Station, finally reunited.",
    color: "bg-[#E0F7FA]",
  },
];

function TimelineCard({ event, index }) {
  const isLeft = index % 2 === 0;

  return (
    <div
      className={`flex w-full items-center justify-center relative mb-16 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* Vertical line */}
      {index < EVENTS.length - 1 && (
        <div className="absolute h-[140%] w-[6px] bg-[#5D4037] left-1/2 -translate-x-1/2 top-4 z-0 rounded-full border-x border-black/20" />
      )}

      {/* Dot */}
      <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 bg-[#FF99AA] rounded-full border-[3px] border-black z-10 flex items-center justify-center shadow-[0_0_0_4px_white]">
        <div className="w-3 h-3 bg-white rounded-full" />
      </div>

      {/* Card side */}
      <div
        className={`w-1/2 flex ${isLeft ? "justify-end pr-10" : "justify-start pl-10"} relative z-10`}
      >
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`relative p-6 rounded-2xl border-[3px] border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] max-w-sm w-full text-left ${event.color}`}
        >
          {/* Connector line */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 h-[4px] w-10 bg-black ${isLeft ? "right-[-43px]" : "left-[-43px]"} z-0`}
          />

          <div className="flex items-center gap-3 mb-2">
            <span className="text-white font-display text-3xl md:text-4xl text-stroke shadow-[2px_2px_0_#000] bg-[#FF99AA] px-2 rounded border-2 border-black">
              {event.year}
            </span>
            <div className="text-black font-display text-xl md:text-2xl uppercase tracking-wide">
              {event.title}
            </div>
          </div>
          <div className="text-black font-body text-lg md:text-xl leading-relaxed font-bold border-t-2 border-black/10 pt-2 mt-2">
            {event.description}
          </div>
        </motion.div>
      </div>

      {/* Empty side */}
      <div className="w-1/2" />
    </div>
  );
}

// Mobile timeline
function MobileTimelineCard({ event, index }) {
  return (
    <div className="flex items-start gap-4 relative mb-8">
      {/* Line + dot */}
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 bg-[#FF99AA] rounded-full border-[3px] border-black z-10 flex items-center justify-center shadow-[0_0_0_3px_white] shrink-0">
          <div className="w-3 h-3 bg-white rounded-full" />
        </div>
        {index < EVENTS.length - 1 && (
          <div className="w-[4px] bg-[#5D4037] flex-1 min-h-[40px] border-x border-black/20 rounded-full" />
        )}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`p-5 rounded-2xl border-[3px] border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] w-full text-left ${event.color}`}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-white font-display text-2xl text-stroke shadow-[2px_2px_0_#000] bg-[#FF99AA] px-2 rounded border-2 border-black">
            {event.year}
          </span>
          <div className="text-black font-display text-lg uppercase tracking-wide">
            {event.title}
          </div>
        </div>
        <div className="text-black font-body text-base leading-relaxed font-bold border-t-2 border-black/10 pt-2 mt-2">
          {event.description}
        </div>
      </motion.div>
    </div>
  );
}

export default function TimelineSection() {
  return (
    <section className="w-full max-w-5xl mx-auto py-16">
      {/* Desktop */}
      <div className="hidden md:block relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-4 h-full bg-[#8D6E63] rounded-full border-[3px] border-black z-0" />
        {EVENTS.map((event, index) => (
          <TimelineCard key={event.year} event={event} index={index} />
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden px-2">
        {EVENTS.map((event, index) => (
          <MobileTimelineCard key={event.year} event={event} index={index} />
        ))}
      </div>
    </section>
  );
}
