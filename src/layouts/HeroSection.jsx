import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import logo from '../assets/images/logo.webp';



export default function HeroSection() {
  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
        {/* Title Side */}
        <div className="text-center md:text-right space-y-4">
          <motion.h1
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display text-7xl sm:text-8xl md:text-[10rem] text-white text-stroke drop-shadow-[8px_8px_0_#000] leading-none"
            style={{ transform: 'rotate(1deg)' }}
          >
            $HACHIKO
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-block bg-[#FF99AA] px-8 md:px-10 py-3 md:py-4 rounded-full shadow-[6px_6px_0_0_#000] transform -rotate-2 border-[4px] border-black"
          >
            <p className="font-display text-2xl md:text-4xl text-white uppercase tracking-wider text-stroke-sm drop-shadow-md">
              THE ETERNAL WAIT
            </p>
          </motion.div>
        </div>

        {/* Polaroid Photo */}
        <motion.div
          initial={{ opacity: 0, rotate: -10, y: 40 }}
          animate={{ opacity: 1, rotate: 2, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group cursor-pointer"
        >
          <div className="bg-white p-4 pb-12 shadow-[12px_12px_0_0_rgba(0,0,0,1)] rotate-2 rounded-sm max-w-[280px] md:max-w-sm border-[4px] border-black">
            <div className="border-[3px] border-black overflow-hidden">
              <img
                alt="Hachiko Loyal Dog"
                className="w-full h-auto object-cover"
                src={logo}
              />
            </div>
            <div className="mt-4 text-center font-display text-3xl md:text-4xl text-gray-400 -rotate-1 tracking-widest text-stroke-sm">
              1923 - Forever
            </div>
          </div>
          {/* Pin */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 bg-[#66CCFF] rounded-full shadow-[4px_4px_0_0_#000] border-[4px] border-black" />
        </motion.div>
      </div>

      {/* Scroll Down */}
      <div
        className="absolute bottom-10 text-white text-center w-full left-0 cursor-pointer z-10"
        onClick={scrollDown}
      >
        <p className="font-display text-2xl md:text-3xl text-stroke tracking-widest uppercase mb-2">
          Scroll Down
        </p>
        <div className="w-7 h-7 border-b-[5px] border-r-[5px] border-white rotate-45 mx-auto drop-shadow-[0_4px_0_#000] animate-bounce-arrow" />
      </div>
    </section>
  );
}