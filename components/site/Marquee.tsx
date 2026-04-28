"use client";

import { motion } from "framer-motion";

const items = [
  "Strategic Design",
  "✦",
  "Web Engineering",
  "✦",
  "Scalable Systems",
  "✦",
  "Digital Transformation",
  "✦",
  "Brand Identity",
  "✦",
];

export function Marquee() {
  return (
    <div className="relative py-20 overflow-hidden bg-ink -rotate-2 scale-105 select-none">
      <motion.div 
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-16 font-display font-black text-7xl md:text-[10vw] uppercase tracking-tighter text-paper/90"
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className={item === "✦" ? "text-ember" : ""}>
            {item}
          </span>
        ))}
      </motion.div>
      
      {/* Overlay Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-transparent to-ink pointer-events-none" />
    </div>
  );
}
