import { motion } from "framer-motion";

export function Testimonial() {
  return (
    <section className="px-6 md:px-12 py-24 md:py-40 bg-paper-soft grain">
      <motion.blockquote
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto"
      >
        <p className="font-display text-4xl md:text-7xl leading-[1.05] tracking-[-0.03em] font-medium text-balance">
          <span className="text-ink/30">“</span>
          They didn't just redesign our product — they rewrote how our entire company thinks about craft. The work has compounded for years.
          <span className="text-ink/30">”</span>
        </p>
        <footer className="mt-12 flex items-center gap-4 text-sm uppercase tracking-widest">
          <div className="w-12 h-px bg-ink" />
          <div>
            <div className="font-medium">Camille Vasseur</div>
            <div className="text-muted-foreground">CEO, Northwind</div>
          </div>
        </footer>
      </motion.blockquote>
    </section>
  );
}
