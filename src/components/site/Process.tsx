import { motion } from "framer-motion";

const steps = [
  { k: "Discover", v: "We spend two weeks listening, auditing and unlearning. Strategy isn't a deck — it's a point of view." },
  { k: "Define", v: "A single golden thread emerges. Positioning, principles and the creative territory we'll defend." },
  { k: "Design", v: "Sprints in the open. Real prototypes, real feedback loops, no waterfall theatre." },
  { k: "Deliver", v: "Production-ready systems, documentation, and a launch your team is proud to ship." },
];

export function Process() {
  return (
    <section id="process" className="px-6 md:px-12 py-24 md:py-32">
      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-5 md:sticky md:top-24 self-start">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
            ⟶ Process
          </div>
          <h2 className="font-display font-bold text-5xl md:text-7xl tracking-[-0.03em] mb-6">
            Four acts. <em className="italic font-light">No drama.</em>
          </h2>
          <p className="text-lg text-muted-foreground max-w-md">
            Engagements run 8 to 16 weeks. Always senior-led, never outsourced, occasionally legendary.
          </p>
        </div>

        <div className="md:col-span-7 space-y-px">
          {steps.map((s, i) => (
            <motion.div
              key={s.k}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-ink/20 last:border-b py-8 flex items-baseline gap-6"
            >
              <span className="font-mono text-sm text-muted-foreground">0{i + 1}</span>
              <div className="flex-1">
                <h3 className="font-display font-semibold text-3xl md:text-4xl mb-3">{s.k}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.v}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
