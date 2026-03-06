import React from "react";
import { motion } from "framer-motion";

const MOMENTS = [
  {
    title: "1923",
    description:
      "Hachiko was born in Odate, Japan. An Akita dog destined for greatness.",
    emoji: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-paw-print" aria-hidden="true"><circle cx="11" cy="4" r="2"></circle><circle cx="18" cy="8" r="2"></circle><circle cx="20" cy="16" r="2"></circle><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"></path></svg>,
  },
  {
    title: "THE BOND",
    description:
      "Professor Ueno adopted Hachiko, and they formed an unbreakable bond.",
    emoji: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart" aria-hidden="true"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path></svg>,
  },
  {
    title: "DAILY RITUAL",
    description:
      "Each evening at 3pm, Hachiko would wait at the station for his master.",
    emoji: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock" aria-hidden="true"><path d="M12 6v6l4 2"></path><circle cx="12" cy="12" r="10"></circle></svg>,
  },
  {
    title: "1925",
    description:
      "Professor Ueno passed away suddenly. But Hachiko continued to wait.",
    emoji: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-crack" aria-hidden="true"><path d="M12.409 5.824c-.702.792-1.15 1.496-1.415 2.166l2.153 2.156a.5.5 0 0 1 0 .707l-2.293 2.293a.5.5 0 0 0 0 .707L12 15"></path><path d="M13.508 20.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.677.6.6 0 0 0 .818.001A5.5 5.5 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5z"></path></svg>,
  },
  {
    title: "9 YEARS",
    description:
      "For nine years, nine months, and fifteen days, Hachiko waited faithfully.",
    emoji: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>,
  },
  {
    title: "ETERNAL LEGEND",
    description:
      "A statue stands at Shibuya Station, immortalizing his devotion.",
    emoji: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-landmark" aria-hidden="true"><path d="M10 18v-7"></path><path d="M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z"></path><path d="M14 18v-7"></path><path d="M18 18v-7"></path><path d="M3 22h18"></path><path d="M6 18v-7"></path></svg>,
  },
];

const cardColors = [
  "bg-[#FF99AA]",
  "bg-[#FFDAC1]",
  "bg-[#B5EAD7]",
  "bg-[#A0E6FF]",
  "bg-[#C7CEEA]",
  "bg-[#FFF59D]",
];

export default function KeyMomentsSection() {
  return (
    <section className="w-full mx-auto">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-7xl md:text-9xl text-center text-white text-stroke mb-16 drop-shadow-[6px_6px_0_#000] font-display transform rotate-1 tracking-wider"
      >
        Key Moments
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {MOMENTS.map((moment, index) => (
     <motion.div
  key={moment.title}
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
  /* Add this whileHover prop */
  whileHover={{ 
    y: [0, -10, -5, -10], // The bounce sequence: Start -> Up -> Middle -> Up
    x: [0, -5, -5, -5],    // Moves left slightly with the bounce
    transition: { 
      duration: 0.6, 
      ease: "easeInOut",
      repeat: Infinity, // Bounces until you stop hovering
      repeatType: "reverse" 
    } 
  }}
  className={`${cardColors[index]} p-5 rounded-2xl border-[3px] border-black shadow-[6px_6px_0_0_#000] transition-all cursor-default hover:shadow-[10px_10px_0_0_#000] 
    hover:-translate-y-1`}
>
            <div class="text-black mb-3 relative z-10 bg-white border-2 border-black p-3 rounded-xl inline-block shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                {moment.emoji}
            </div>

            {/* <div className="text-4xl mb-3">{moment.emoji}</div> */}
            <h3 class="text-3xl font-display text-white text-stroke drop-shadow-md leading-tight relative z-10 mb-2 uppercase tracking-wide">
              {moment.title}
            </h3>
            <p className="font-body text-base md:text-lg font-bold text-black leading-relaxed">
              {moment.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
