import { motion } from "framer-motion";
import work01 from "@/assets/work-01.jpg";
import work02 from "@/assets/work-02.jpg";
import work03 from "@/assets/work-03.jpg";
import work04 from "@/assets/work-04.jpg";
import work05 from "@/assets/work-05.jpg";
import work06 from "@/assets/work-06.jpg";

type Project = {
  num: string;
  title: string;
  client: string;
  category: string;
  year: string;
  scope: string[];
  blurb: string;
  image: string;
  span: string;
  height: string;
  align?: "left" | "right";
};

const projects: Project[] = [
  {
    num: "01",
    title: "Solène Atelier",
    client: "Solène Paris",
    category: "Brand · Couture E-commerce",
    year: "2025",
    scope: ["Identity", "Art Direction", "Webflow Build", "Motion"],
    blurb:
      "A digital atelier for a Parisian house — couture cadence, modern shopfront. +212% revenue in first quarter.",
    image: work01,
    span: "md:col-span-7",
    height: "h-[80vh]",
    align: "left",
  },
  {
    num: "02",
    title: "Magma Concrete",
    client: "Magma Studio",
    category: "Architecture · Web",
    year: "2025",
    scope: ["Strategy", "Design System", "Next.js"],
    blurb:
      "Brutalist portfolio for a São Paulo architecture studio. Site of the Day, Awwwards · FWA Honoree.",
    image: work02,
    span: "md:col-span-5",
    height: "h-[80vh]",
    align: "right",
  },
  {
    num: "03",
    title: "Maison Verre",
    client: "Verre Skincare",
    category: "Product · DTC",
    year: "2024",
    scope: ["Brand", "Packaging", "Shopify Plus"],
    blurb:
      "An apothecary born in glass — slow-craft skincare with a quietly cinematic web presence.",
    image: work03,
    span: "md:col-span-5",
    height: "h-[70vh]",
    align: "left",
  },
  {
    num: "04",
    title: "Boiler Room ↔ Rosalía",
    client: "Boiler Room TV",
    category: "Editorial · Music",
    year: "2024",
    scope: ["Creative Direction", "Live Stream UX", "Microsite"],
    blurb:
      "A real-time editorial home for a generational performance. 3.2M concurrent viewers, zero downtime.",
    image: work04,
    span: "md:col-span-7",
    height: "h-[70vh]",
    align: "right",
  },
  {
    num: "05",
    title: "Razr Reborn",
    client: "Motorola",
    category: "Product Launch · Campaign",
    year: "2024",
    scope: ["Launch Strategy", "Site", "Out-of-Home"],
    blurb:
      "A nostalgic icon, re-engineered. End-to-end launch ecosystem across web, retail and press.",
    image: work05,
    span: "md:col-span-7",
    height: "h-[75vh]",
    align: "left",
  },
  {
    num: "06",
    title: "Jessica, At Sundown",
    client: "Vox Magazine",
    category: "Editorial · Feature",
    year: "2025",
    scope: ["Art Direction", "Photography", "Long-form Web"],
    blurb:
      "An immersive long-read feature — typography, parallax and palm-leaf light. ADC Gold.",
    image: work06,
    span: "md:col-span-5",
    height: "h-[75vh]",
    align: "right",
  },
];

export function Work() {
  return (
    <section id="work" className="px-6 md:px-12 py-24 md:py-32">
      {/* Section heading */}
      <div className="flex items-end justify-between mb-16 border-b border-ink/20 pb-6">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
            ⟶ Selected Work · Vol. 02 · 2024—25
          </div>
          <h2 className="font-display font-bold text-5xl md:text-7xl tracking-[-0.03em] max-w-3xl">
            Recent{" "}
            <em className="font-serif italic font-light text-ember">
              obsessions
            </em>
            , <br className="hidden md:block" />
            quietly{" "}
            <em className="font-serif italic font-light">over-engineered</em>.
          </h2>
        </div>
        <a href="#" className="hidden md:block hover-link text-sm font-medium">
          View archive (32) →
        </a>
      </div>

      {/* Projects */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-24 md:gap-y-32">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.95,
              delay: (i % 2) * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`group cursor-pointer ${p.span}`}
          >
            {/* Image */}
            <div
              className={`relative ${p.height} overflow-hidden rounded-sm grain bg-paper-soft`}
            >
              <motion.img
                src={p.image}
                alt={p.title}
                width={1280}
                height={1600}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ scale: 1.15 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-90" />

              {/* Project number badge */}
              <div className="absolute top-5 left-5 text-paper text-xs uppercase tracking-widest font-medium mix-blend-difference">
                ✦ Case №{p.num}
              </div>
              <div className="absolute top-5 right-5 text-paper text-xs uppercase tracking-widest font-medium mix-blend-difference">
                {p.year}
              </div>

              {/* Hover CTA */}
              <div className="absolute bottom-5 right-5 flex items-center gap-2 text-paper text-xs uppercase tracking-widest font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                Read case study
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-ember">
                  ↗
                </span>
              </div>

              {/* Big watermark title */}
              <div className="absolute bottom-5 left-5 right-20 pointer-events-none">
                <span className="block font-serif italic text-paper/95 text-3xl md:text-5xl leading-[0.9] tracking-tight transition-transform duration-700 group-hover:-translate-y-1">
                  {p.client}
                </span>
              </div>
            </div>

            {/* Meta block under image */}
            <div
              className={`mt-6 grid grid-cols-12 gap-4 ${
                p.align === "right" ? "md:pl-12" : ""
              }`}
            >
              <div className="col-span-12 md:col-span-7">
                <h3 className="font-display font-semibold text-2xl md:text-3xl tracking-[-0.02em]">
                  {p.title}
                  <span className="text-muted-foreground"> — {p.category}</span>
                </h3>
                <p className="mt-3 text-ink-soft text-base leading-relaxed max-w-lg">
                  {p.blurb}
                </p>
              </div>

              <div className="col-span-12 md:col-span-5 md:text-right">
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  Scope
                </div>
                <ul className="flex flex-wrap md:justify-end gap-x-3 gap-y-1 text-sm">
                  {p.scope.map((s) => (
                    <li
                      key={s}
                      className="border border-ink/20 rounded-full px-3 py-1"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Footer of section */}
      <div className="mt-24 md:mt-32 border-t border-ink/20 pt-8 flex flex-col md:flex-row gap-6 md:items-end md:justify-between">
        <div className="font-serif italic text-3xl md:text-5xl tracking-[-0.03em] max-w-2xl">
          And twenty-six more we{" "}
          <span className="text-ember">refuse to summarize</span> in a grid.
        </div>
        <a
          href="#"
          className="group inline-flex items-center gap-3 bg-ink text-paper rounded-full pl-6 pr-2 py-2.5 text-sm font-medium transition-all hover:gap-4 self-start md:self-auto"
        >
          Browse the archive
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-ember text-paper transition-transform group-hover:rotate-45">
            ↗
          </span>
        </a>
      </div>
    </section>
  );
}
