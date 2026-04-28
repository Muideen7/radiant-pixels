"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const transition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const };

export function Hero() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col px-6 md:px-12 pt-32 pb-12 grain overflow-hidden bg-paper">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1676278746071-cd54ce97bf16?w=1920&auto=format&fit=crop&q=80"
          alt="Digital studio background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition, delay: 0.1 }}
        className="text-[10px] uppercase tracking-[0.3em] font-bold text-white drop-shadow-md"
      >
        Web Design & Development Agency
      </motion.div>

      <div className="flex-1 flex flex-col justify-center py-12 md:py-24 relative z-10">
        <h1 className="font-display font-bold leading-[0.85] tracking-[-0.06em] text-[11vw] md:text-[8vw] text-white drop-shadow-lg">
          <span className="block overflow-hidden">
            <motion.span
              className="block text-white drop-shadow-lg"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={transition}
            >
              Building
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block font-serif italic font-light text-ember"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ ...transition, delay: 0.15 }}
            >
              luxury digital
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-white drop-shadow-lg"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ ...transition, delay: 0.3 }}
            >
              realities.
            </motion.span>
          </span>
        </h1>

      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition, delay: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end border-t border-white/20 pt-12"
      >
        <div className="md:col-span-5">
          <p className="text-lg md:text-xl leading-relaxed text-white max-w-sm font-light drop-shadow-md">
            An elite agency specializing in high-fidelity digital products. We partner with luxury brands to define the next era of the web.
          </p>
        </div>

        {/* Right side - wordplay: hidden on mobile, visible on md+ */}
        <div className="hidden md:block md:col-span-4 flex flex-col justify-end items-end text-right">
          <div className="flex flex-col gap-2 font-display font-medium text-xl tracking-[-0.02em]">
            <span className="text-white drop-shadow-md">Strategic design,</span>
            <span className="text-white/70 italic font-serif font-light">engineered for performance,</span>
            <span className="text-white drop-shadow-md">scaled for</span>
            <span className="text-ember">global impact.</span>
          </div>
        </div>

        <div className="md:col-span-3 flex flex-col gap-4">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white font-bold">
            Studio Standards
          </div>
          <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest text-white/60">
            <span>Performance</span>
            <span>Security</span>
            <span>Scale</span>
          </div>
        </div>

        <div className="md:col-span-3 flex md:justify-end">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-4 bg-ink text-paper rounded-full pl-8 pr-2 py-3 text-xs uppercase tracking-[0.2em] font-bold transition-all hover:gap-6 cursor-pointer"
            >
              Explore Cases
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-ember text-paper transition-transform group-hover:rotate-45">
                ↗
              </span>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}