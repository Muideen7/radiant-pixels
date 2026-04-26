import { motion } from "framer-motion";

const wordplay = [
  { text: "Part studio,", kind: "solid" },
  { text: "part workshop,", kind: "mute" },
  { text: "part", kind: "solid" },
  { text: "love letter", kind: "mute" },
  { text: "to the web.", kind: "ember" },
] as const;

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col px-6 md:px-10 pt-32 pb-12 grain overflow-hidden">
      {/* Top meta row */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-widest font-medium text-muted-foreground"
      >
        <span>Independent · Lisbon ↔ Worldwide</span>
        <span className="ml-auto hidden md:inline">
          Booking projects for spring 2026
        </span>
      </motion.div>

      {/* Headline — humane, conversational */}
      <div className="flex-1 flex flex-col justify-center py-12 md:py-16">
        <h1 className="font-display font-bold leading-[0.9] tracking-[-0.045em] text-[13vw] md:text-[8.8vw]">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ delay: 0.3, duration: 1, ease: [0.65, 0, 0.35, 1] }}
            >
              We make websites
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block font-serif italic font-light"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ delay: 0.42, duration: 1, ease: [0.65, 0, 0.35, 1] }}
            >
              people actually <span className="text-ember">remember</span>.
            </motion.span>
          </span>
        </h1>

        {/* Wordplay strip */}
        <div className="mt-10 md:mt-14 flex flex-wrap items-center gap-x-4 gap-y-2 font-display font-medium text-2xl md:text-4xl tracking-[-0.02em]">
          {wordplay.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.08, duration: 0.6 }}
              className={
                w.kind === "mute"
                  ? "text-muted-foreground italic font-serif font-light"
                  : w.kind === "ember"
                    ? "text-ember"
                    : ""
              }
            >
              {w.text}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Bottom split row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.9 }}
        className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end border-t border-ink/20 pt-8"
      >
        <p className="md:col-span-6 text-base md:text-lg leading-relaxed text-ink-soft max-w-md">
          A small studio of designers and engineers building brand systems,
          digital products and the kind of web experiences clients keep open
          in another tab.
        </p>

        <div className="md:col-span-3 flex flex-col gap-1 text-sm">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Recognition
          </span>
          <span className="font-medium">Awwwards · FWA · CSSDA</span>
        </div>

        <div className="md:col-span-3 flex md:justify-end">
          <a
            href="#work"
            className="group inline-flex items-center gap-3 bg-ink text-paper rounded-full pl-6 pr-2 py-2.5 text-sm font-medium transition-all hover:gap-4"
          >
            See selected work
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-ember text-paper transition-transform group-hover:rotate-45">
              ↗
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
