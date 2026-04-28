"use client";

import { motion } from "framer-motion";

const reviews = [
  {
    quote: "Their team integrated seamlessly with our design team. The resulting digital experience has significantly elevated our brand presence.",
    author: "Camille Vasseur",
    role: "Creative Director, Maison Verel",
    size: "md:col-span-8",
  },
  {
    quote: "A rare partner that understands both the aesthetic requirements of a premium brand and the technical precision we needed.",
    author: "Marcus Thorne",
    role: "Managing Director, Forma Collective",
    size: "md:col-span-4",
  },
  {
    quote: "Relentlessly high-quality output. Their methodology provided the clarity we needed for our digital transformation.",
    author: "Elena Rossi",
    role: "Head of Digital, Lumina",
    size: "md:col-span-4",
  },
  {
    quote: "They delivered a high-performance platform that exceeded our expectations. Their focus on luxury aesthetics is unmatched.",
    author: "Julian Chen",
    role: "CTO, Noir Parfums",
    size: "md:col-span-8",
  },
  {
    quote: "North&Co provided exceptional strategic oversight throughout our rebrand. The project was delivered on time with outstanding quality.",
    author: "Sarah Jenkins",
    role: "Director of Brand, Aurelia",
    size: "md:col-span-12",
  },
];

export function Testimonial() {
  return (
    <section id="testimonials" className="px-6 md:px-12 py-24 md:py-48 bg-paper-soft grain overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 font-bold flex items-center gap-4">
            <span className="w-8 h-[1px] bg-ember"></span>
            Case Results
          </div>
          <h2 className="font-display font-bold text-6xl md:text-8xl tracking-[-0.05em] leading-[0.85]">
            Client <br />
            <em className="italic font-light text-ember">Testimonials.</em>
          </h2>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {reviews.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.76, 0, 0.24, 1] }}
            className={`${r.size} bg-paper p-10 md:p-16 rounded-sm border border-ink/5 relative group hover:border-ember/30 transition-colors duration-700`}
          >
            <div className="absolute top-8 right-8 text-6xl font-serif italic text-ink/5 group-hover:text-ember/10 transition-colors duration-700 select-none">“</div>
            
            <p className="font-display text-2xl md:text-4xl leading-[1.1] tracking-[-0.02em] font-medium text-balance mb-12 relative z-10">
              {r.quote}
            </p>

            <footer className="flex items-center gap-4 text-sm uppercase tracking-widest mt-auto">
              <div className="w-10 h-px bg-ember" />
              <div>
                <div className="font-bold text-ink">{r.author}</div>
                <div className="text-muted-foreground text-[10px] mt-1">{r.role}</div>
              </div>
            </footer>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
