import { motion } from "framer-motion";

const projects = [
  {
    title: "Solène Atelier",
    category: "Brand · E-commerce",
    year: "2025",
    color: "oklch(0.45 0.08 30)",
    span: "md:col-span-7",
    height: "h-[70vh]",
  },
  {
    title: "Northwind OS",
    category: "Product · SaaS",
    year: "2025",
    color: "oklch(0.22 0.02 240)",
    span: "md:col-span-5",
    height: "h-[70vh]",
  },
  {
    title: "Maison Verre",
    category: "Editorial · Web",
    year: "2024",
    color: "oklch(0.78 0.05 90)",
    span: "md:col-span-5",
    height: "h-[60vh]",
  },
  {
    title: "Forma Studio",
    category: "Identity · Motion",
    year: "2024",
    color: "oklch(0.18 0 0)",
    span: "md:col-span-7",
    height: "h-[60vh]",
  },
];

export function Work() {
  return (
    <section id="work" className="px-6 md:px-12 py-24 md:py-32">
      <div className="flex items-end justify-between mb-16 border-b border-ink/20 pb-6">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
            ⟶ Selected Work, 2024—25
          </div>
          <h2 className="font-display font-bold text-5xl md:text-7xl tracking-[-0.03em]">
            Recent <em className="font-display italic font-light">obsessions</em>.
          </h2>
        </div>
        <a href="#" className="hidden md:block hover-link text-sm font-medium">
          View archive (32) →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={`group cursor-pointer ${p.span}`}
          >
            <div
              className={`relative ${p.height} overflow-hidden rounded-sm grain`}
              style={{ backgroundColor: p.color }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display font-bold text-paper/90 text-7xl md:text-9xl tracking-tighter transition-transform duration-700 group-hover:scale-110">
                  {p.title.split(" ")[0]}
                </span>
              </div>
              <div className="absolute top-4 left-4 text-paper/80 text-xs uppercase tracking-widest">
                {p.year}
              </div>
              <div className="absolute bottom-4 right-4 text-paper/80 text-xs uppercase tracking-widest">
                ↗ View case
              </div>
            </div>
            <div className="flex items-baseline justify-between mt-4">
              <h3 className="font-display font-semibold text-2xl">{p.title}</h3>
              <span className="text-sm text-muted-foreground">{p.category}</span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
