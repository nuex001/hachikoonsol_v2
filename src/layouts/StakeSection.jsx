import React from 'react'
import { motion } from "framer-motion";

function StakeSection() {
    return (
    <section className="w-full max-w-4xl mx-auto">
                <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-7xl md:text-9xl text-center text-white text-stroke mb-16 drop-shadow-[6px_6px_0_#000] font-display transform rotate-1 tracking-wider"
      >
        Stake Hachi
      </motion.h2>
            <iframe
                src="https://rflx.fi/embed?mint=AsrtqZiNYt3c6nNCtkj7abUrVc8APsFF37Wffq45rkVh"
                width="100%"
                className='stakeIframe'
                allow="clipboard-write"
            ></iframe>
            
        </section>
    )
}

export default StakeSection