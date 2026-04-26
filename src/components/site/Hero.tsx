import { motion } from "framer-motion";

const lines = ["Design studio", "for ambitious", "founders ✦"];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col px-6 md:px-10 pt-32 pb-12 grain overflow-hidden">
      {/* Top meta row */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest font-medium"
      >
        <span className="inline-flex items-center gap-2 border border-ink/20 rounded-full px-3 py-1.5 bg-paper/50 backdrop-blur">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
          Available — Q3 ’26
        </span>
        <span className="text-muted-foreground hidden sm:inline">
          Independent · Lisbon ↔ Worldwide
        </span>
      </motion.div>

      {/* Stacked headline */}
      <div className="flex-1 flex flex-col justify-center py-16 md:py-24">
        <h1 className="font-display font-bold leading-[0.92] tracking-[-0.04em] text-[12vw] md:text-[8.5vw]">
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  delay: 0.3 + i * 0.12,
                  duration: 1,
                  ease: [0.65, 0, 0.35, 1],
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
      </div>

      {/* Bottom split row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.9 }}
        className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end border-t border-ink/20 pt-8"
      >
        <p className="md:col-span-5 text-base md:text-lg leading-relaxed text-ink-soft max-w-md">
          We craft brand systems, digital products and award-winning web
          experiences for teams who refuse to ship the ordinary.
        </p>

        <div className="md:col-span-4 flex flex-col gap-1 text-sm">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Recognition
          </span>
          <span className="font-medium">Awwwards · FWA · CSSDA · TDC</span>
        </div>

        <div className="md:col-span-3 flex md:justify-end">
          <a
            href="#work"
            className="group inline-flex items-center gap-3 bg-ink text-paper rounded-full pl-6 pr-2 py-2.5 text-sm font-medium transition-all hover:gap-4"
          >
            See selected work
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-paper text-ink transition-transform group-hover:rotate-45">
              ↗
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
