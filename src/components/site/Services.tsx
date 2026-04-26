import { motion } from "framer-motion";
import { useState } from "react";

const services = [
  { num: "01", title: "Brand Identity", desc: "Naming, logo systems, typography, art direction and complete visual languages built to last decades, not seasons." },
  { num: "02", title: "Digital Product", desc: "End-to-end product design — research, IA, interface, design systems and prototyping for ambitious SaaS and consumer apps." },
  { num: "03", title: "Web Experiences", desc: "Award-winning marketing sites, editorial platforms and immersive campaigns engineered with care for every pixel and millisecond." },
  { num: "04", title: "Engineering", desc: "Production-grade development in React, Next & TanStack. Headless commerce, CMS integrations, performance optimisation." },
  { num: "05", title: "Motion & 3D", desc: "Brand motion, product reveals, WebGL experiments and the kind of micro-interactions juries can't ignore." },
];

export function Services() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <section id="services" className="px-6 md:px-12 py-24 md:py-32 bg-ink text-paper">
      <div className="grid md:grid-cols-12 gap-8 mb-20">
        <div className="md:col-span-4">
          <div className="text-xs uppercase tracking-widest text-paper/50 mb-3">
            ⟶ Capabilities
          </div>
        </div>
        <h2 className="md:col-span-8 font-display font-bold text-5xl md:text-7xl tracking-[-0.03em] text-balance">
          A small team with a <em className="italic font-light">disproportionate</em> output.
        </h2>
      </div>

      <ul>
        {services.map((s, i) => (
          <motion.li
            key={s.num}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className="border-t border-paper/15 last:border-b py-8 md:py-10 cursor-pointer transition-colors duration-500"
            style={{ backgroundColor: hover === i ? "oklch(0.18 0 0)" : "transparent" }}
          >
            <div className="grid md:grid-cols-12 gap-6 items-baseline px-2">
              <div className="md:col-span-1 text-sm text-paper/40 font-mono">{s.num}</div>
              <div className="md:col-span-4">
                <h3 className="font-display font-semibold text-3xl md:text-5xl tracking-tight">
                  {s.title}
                </h3>
              </div>
              <p className="md:col-span-6 text-paper/70 leading-relaxed md:text-lg">
                {s.desc}
              </p>
              <div className="md:col-span-1 text-right text-2xl">↗</div>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
