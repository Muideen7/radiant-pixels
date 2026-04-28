"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const services = [
  { num: "01", title: "Global Strategy", desc: "Digital roadmap development, competitive analysis, and strategic positioning for enterprise brands expanding in the digital ecosystem." },
  { num: "02", title: "Systems Design", desc: "Creation of scalable, high-fidelity design systems and UI/UX architectures that ensure brand consistency across global product suites." },
  { num: "03", title: "Web Engineering", desc: "Production-grade full-stack development using Next.js and headless architectures, optimized for high-performance and enterprise security." },
  { num: "04", title: "Product Growth", desc: "Conversion rate optimization, data-driven UX enhancements, and performance monitoring to ensure long-term digital ROI." },
  { num: "05", title: "Creative Tech", desc: "Immersive WebGL experiences, custom motion systems, and high-end creative engineering that defines industry standards." },
];

export function Services() {
  const [hover, setHover] = useState<number | null>(null);
  const transition = { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const };

  return (
    <section id="services" className="px-6 md:px-12 py-24 md:py-32 bg-ink text-paper overflow-hidden relative">
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-32 -left-32 w-[50vw] h-[50vw] bg-paper/5 blur-[120px] rounded-full pointer-events-none"
      />

      <div className="grid md:grid-cols-12 gap-8 mb-32">
        <div className="md:col-span-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={transition}
            className="text-xs uppercase tracking-[0.2em] text-paper/40 mb-3 font-bold"
          >
            ⟶ Capabilities
          </motion.div>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...transition, delay: 0.1 }}
          className="md:col-span-8 font-display font-bold text-3xl md:text-5xl tracking-[-0.04em] leading-[0.9] text-balance"
        >
          Engineering digital <br />
          <em className="italic font-light text-paper/60 underline decoration-1 underline-offset-8">superiority</em> for enterprise.
        </motion.h2>
      </div>

      <ul>
        {services.map((s, i) => (
          <motion.li
            key={s.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...transition, delay: i * 0.1 }}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className="group border-t border-paper/10 last:border-b py-10 md:py-16 cursor-pointer relative"
          >
            <motion.div
              initial={false}
              animate={{ height: hover === i ? "100%" : "0%" }}
              className="absolute top-0 left-0 w-full bg-paper/5 pointer-events-none z-0"
              transition={transition}
            />

            <div className="grid md:grid-cols-12 gap-8 items-center px-2 relative z-10">
              <div className="md:col-span-1 text-xs text-paper/30 font-bold tracking-widest">{s.num}</div>
              <div className="md:col-span-4">
                <h3 className="font-display font-bold text-3xl md:text-5xl tracking-[-0.03em] group-hover:translate-x-4 transition-transform duration-700 ease-[0.76, 0, 0.24, 1]">
                  {s.title}
                </h3>
              </div>
              <p className="md:col-span-6 text-paper/50 leading-relaxed md:text-xl font-light group-hover:text-paper transition-colors duration-700">
                {s.desc}
              </p>
              <div className="md:col-span-1 text-right">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-paper/20 group-hover:bg-ember group-hover:border-ember transition-all duration-700 group-hover:rotate-45">
                  ↗
                </span>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}