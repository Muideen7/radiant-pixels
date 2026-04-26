import { motion } from "framer-motion";

const headline = ["Design", "&", "Develop", "the", "Extra—", "ordinary."];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-12 pb-12 pt-32 grain overflow-hidden">
      <div className="absolute top-32 right-6 md:right-12 max-w-xs text-right text-sm leading-relaxed text-ink-soft">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          An independent studio crafting brands, products and digital experiences for the world's most ambitious teams.
        </motion.p>
      </div>

      <h1 className="font-display font-bold leading-[0.85] tracking-[-0.04em] text-[18vw] md:text-[14vw]">
        {headline.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.15em]">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{
                delay: 0.2 + i * 0.08,
                duration: 1,
                ease: [0.65, 0, 0.35, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-12 flex items-end justify-between border-t border-ink/20 pt-6"
      >
        <div className="flex gap-12 text-xs uppercase tracking-widest font-medium">
          <div>
            <div className="text-muted-foreground mb-1">Est.</div>
            <div>2016 — Lisbon</div>
          </div>
          <div className="hidden md:block">
            <div className="text-muted-foreground mb-1">Recognition</div>
            <div>Awwwards · FWA · CSSDA</div>
          </div>
        </div>
        <div className="text-xs uppercase tracking-widest font-medium flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          Open for Q3 ’26
        </div>
      </motion.div>
    </section>
  );
}
