"use client";

import { motion } from "framer-motion";

const steps = [
  { k: "Audit & Strategy", v: "We begin with a rigorous deep-dive into your business objectives, user requirements, and technical constraints to define a clear roadmap." },
  { k: "Design & UX", v: "High-fidelity interface design and comprehensive user journeys, built on a robust, scalable design system that ensures long-term consistency." },
  { k: "Development", v: "Engineered with production-grade code using the latest full-stack frameworks, optimized for performance, security, and global scale." },
  { k: "Launch & Support", v: "Seamless deployment followed by data-driven optimizations and proactive support to ensure your digital ecosystem remains ahead of the curve." },
];

export function Process() {
  const transition = { duration: 1.2, ease: [0.76, 0, 0.24, 1] as const };

  return (
    <section id="process" className="px-6 md:px-12 py-24 md:py-48 overflow-hidden">
      <div className="grid md:grid-cols-12 gap-16">
        <div className="md:col-span-5 md:sticky md:top-32 self-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={transition}
          >
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 font-bold flex items-center gap-4">
              <span className="w-8 h-[1px] bg-ink/20"></span>
              Our Methodology
            </div>
            <h2 className="font-display font-bold text-6xl md:text-8xl tracking-[-0.05em] mb-10 leading-[0.85]">
              Disciplined. <br />
              <em className="italic font-light text-ember">Performance-led.</em>
            </h2>
            <p className="text-xl text-muted-foreground max-w-sm leading-relaxed font-light mb-16">
              Our standard engagement model is built on transparency, iterative delivery, and a relentless focus on ROI.
            </p>

            {/* Impact Metrics Panel to fill space */}
            <div className="grid grid-cols-2 gap-8 border-t border-ink/10 pt-12">
              <div>
                <div className="font-display font-bold text-5xl text-ink">98%</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mt-2">Retention Rate</div>
              </div>
              <div>
                <div className="font-display font-bold text-5xl text-ink">12+</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mt-2">Active Regions</div>
              </div>
              <div className="col-span-2 mt-8">
                <div className="p-8 bg-paper-soft rounded-sm border border-ink/5">
                  <p className="text-sm italic font-serif leading-relaxed text-muted-foreground">
                    "A partnership with North&Co isn't just about building a website; it's about establishing a technical foundation for the next decade of growth."
                  </p>
                  <div className="mt-4 text-[10px] uppercase tracking-widest font-bold text-ink">
                    — Enterprise Governance Board
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="md:col-span-7 space-y-px mt-12 md:mt-0">
          {steps.map((s, i) => (
            <motion.div
              key={s.k}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ ...transition, delay: i * 0.15 }}
              className="border-t border-ink/10 last:border-b py-12 md:py-20 group"
            >
              <div className="flex items-baseline gap-10">
                <span className="font-display text-xl text-ember/40 font-bold tabular-nums">0{i + 1}</span>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-4xl md:text-5xl mb-6 tracking-tight group-hover:text-ember transition-colors duration-500">{s.k}</h3>
                  <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-xl font-light">{s.v}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
