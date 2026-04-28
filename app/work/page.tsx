"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const allProjects = [
  {
    num: "01",
    client: "Maison Verel — Haute couture, Paris",
    title: "Haute Couture",
    category: "Fashion & Apparel",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&auto=format&fit=crop&q=80",
    year: "2024",
    size: "large",
    col: "md:col-span-2",
  },
  {
    num: "02",
    client: "Forma Collective — Architectural studio",
    title: "Portfolio",
    category: "Architecture & Design",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
    year: "2024",
    size: "tall",
    col: "md:row-span-2",
  },
  {
    num: "03",
    client: "Lumina — Skincare, Italy",
    title: "Skincare",
    category: "Beauty & Skincare",
    image: "https://images.unsplash.com/photo-1552046122-03184de85e08?w=800&auto=format&fit=crop&q=80",
    year: "2023",
    size: "medium",
    col: "",
  },
  {
    num: "04",
    client: "Noir Parfums — Luxury Fragrance House",
    title: "Fragrance",
    category: "Beauty & Fragrance",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop",
    year: "2024",
    size: "medium",
    col: "",
  },
  {
    num: "05",
    client: "Velvet Archive — Vintage menswear",
    title: "Archive",
    category: "Fashion & Retail",
    image: "https://images.unsplash.com/photo-1558618047-f4f8dd3fa6d4?w=800&auto=format&fit=crop&q=80",
    year: "2024",
    size: "large",
    col: "md:col-span-2",
  },
  {
    num: "06",
    client: "Aurelia Jewels — High jewelry, Geneva",
    title: "Bijoux",
    category: "Jewelry & Luxury",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80",
    year: "2023",
    size: "small",
    col: "",
  },
  {
    num: "07",
    client: "Maison de Thé — Tea salon, Kyoto",
    title: "Tea Ceremony",
    category: "Hospitality & Retail",
    image: "https://images.unsplash.com/photo-1544781219-958b8aaf87ec?w=800&auto=format&fit=crop&q=80",
    year: "2024",
    size: "small",
    col: "",
  },
  {
    num: "08",
    client: "Nobu Restaurant — Fine dining, NYC",
    title: "Gastronomy",
    category: "Hospitality & Dining",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop&q=80",
    year: "2024",
    size: "medium",
    col: "",
  },
  {
    num: "09",
    client: "Atelier Noire — Leather goods, Milan",
    title: "Maroquinerie",
    category: "Fashion & Accessories",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80",
    year: "2023",
    size: "tall",
    col: "md:row-span-2",
  },
  {
    num: "10",
    client: "Sartoria — Bespoke tailoring, Naples",
    title: "Tailoring",
    category: "Fashion & Apparel",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80",
    year: "2024",
    size: "small",
    col: "",
  },
  {
    num: "11",
    client: "Aqua Botanica — Organic skincare, LA",
    title: "Botanicals",
    category: "Beauty & Skincare",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&auto=format&fit=crop&q=80",
    year: "2024",
    size: "medium",
    col: "",
  },
  {
    num: "12",
    client: "Maison Blanc — Patisserie, Paris",
    title: "Pâtisserie",
    category: "Hospitality & Dining",
    image: "https://images.unsplash.com/photo-1509365390695-33aee6c8a71f?w=800&auto=format&fit=crop&q=80",
    year: "2023",
    size: "small",
    col: "",
  },
  {
    num: "13",
    client: "L'Opéra — Luxury hotel, Monaco",
    title: "Grand Hôtel",
    category: "Hospitality & Hotels",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506399945?w=800&auto=format&fit=crop&q=80",
    year: "2024",
    size: "large",
    col: "md:col-span-2",
  },
  {
    num: "14",
    client: "CASA — Modern furniture, Milan",
    title: "Arredamento",
    category: "Architecture & Design",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80",
    year: "2024",
    size: "medium",
    col: "",
  },
  {
    num: "15",
    client: "Maison Rouge — Luxury watches, Geneva",
    title: "Horlogerie",
    category: "Jewelry & Luxury",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&auto=format&fit=crop&q=80",
    year: "2023",
    size: "small",
    col: "",
  },
  {
    num: "16",
    client: "Casa di Fiori — Floral atelier, NYC",
    title: "Fiori",
    category: "Lifestyle & Retail",
    image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&auto=format&fit=crop&q=80",
    year: "2024",
    size: "medium",
    col: "",
  },
];

const easeTransition = { duration: 1, ease: [0.16, 1, 0.3, 1] as const };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: easeTransition,
  },
};

export default function WorkPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -100]);
  const galleryScale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className="min-h-screen bg-paper text-ink"
    >
      {/* Gallery Hero */}
      <motion.div
        ref={containerRef}
        style={{ opacity: heroOpacity, y: heroY }}
        className="px-6 md:px-12 pt-32 pb-16 md:pb-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-4xl"
        >
          <div className="text-[10px] uppercase tracking-[0.4em] text-ember font-bold mb-6">
            ⟶ Selected Works
          </div>
          <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl tracking-[-0.04em] leading-[0.85] mb-8">
            Our <em className="font-serif italic font-light text-ember">portfolio</em> of <br />
            exceptional work.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl font-light leading-relaxed">
            A curated collection of digital experiences crafted for the world&apos;s most prestigious luxury brands across fashion, beauty, hospitality, and lifestyle.
          </p>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap gap-3 mt-12"
        >
          {["All Work", "Fashion", "Beauty", "Hospitality", "Jewelry", "Architecture"].map((filter, i) => (
            <button
              key={filter}
              className={`px-6 py-3 text-xs uppercase tracking-[0.2em] font-bold rounded-full transition-all cursor-pointer ${
                i === 0
                  ? "bg-ink text-paper"
                  : "bg-transparent border border-ink/20 text-ink/60 hover:border-ink hover:text-ink"
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>
      </motion.div>

      {/* Gallery Grid */}
      <motion.div
        style={{ scale: galleryScale }}
        className="px-6 md:px-12 pb-24"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {allProjects.map((project, i) => (
            <ProjectCard key={project.num} project={project} index={i} />
          ))}
        </motion.div>
      </motion.div>

      {/* Back to Home CTA */}
      <section className="px-6 md:px-12 py-24 md:py-32 bg-ink text-paper">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="text-center md:text-left">
            <div className="text-[10px] uppercase tracking-[0.4em] text-ember/60 font-bold mb-4">
              Ready to start?
            </div>
            <h2 className="font-display font-bold text-4xl md:text-6xl tracking-[-0.04em]">
              Let&apos;s create together.
            </h2>
          </div>
          <Link
            href="/#contact-form"
            className="group inline-flex items-center gap-4 bg-paper text-ink rounded-full pl-8 pr-2 py-4 text-xs uppercase tracking-[0.2em] font-bold transition-all hover:gap-6 cursor-pointer"
          >
            <span>Start a Project</span>
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-ember text-paper transition-transform group-hover:rotate-45">
              ↗
            </span>
          </Link>
        </motion.div>
      </section>

      <footer className="px-6 md:px-12 py-8 border-t border-ink/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-display font-black text-xl tracking-tighter cursor-pointer">
            <span className="text-ink">
              NORTH<span className="text-ember">&</span>CO<span className="text-[10px] align-top ml-0.5 opacity-40">®</span>
            </span>
          </Link>
          <div className="text-xs text-muted-foreground uppercase tracking-widest">
            © 2024 All Rights Reserved
          </div>
        </div>
      </footer>
    </motion.main>
  );
}

function ProjectCard({ project, index }: { project: typeof allProjects[0]; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1.02, 1]);

  const heightClass = {
    small: "aspect-square",
    medium: "aspect-[3/4]",
    tall: "aspect-[3/5]",
    large: "aspect-[16/9] md:aspect-[21/9]",
  }[project.size];

  return (
    <motion.article
      ref={ref}
      style={{ y, scale }}
      variants={itemVariants}
      className={`group ${project.col} cursor-pointer`}
    >
      <Link href={`/work/${project.num}`} className="block">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`relative ${heightClass} overflow-hidden rounded-sm bg-paper-soft shadow-xl shadow-ink/5`}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-ink/60 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              whileHover={{ scale: 1.1 }}
              className="bg-paper text-ink px-8 py-4 rounded-full text-xs uppercase tracking-[0.3em] font-bold shadow-2xl"
            >
              View Project
            </motion.div>
          </motion.div>

          {/* Project Number */}
          <div className="absolute top-4 left-4 text-paper/80 text-[10px] uppercase tracking-[0.4em] font-bold">
            {project.num}
          </div>

          {/* Year */}
          <div className="absolute top-4 right-4 text-paper/80 text-[10px] uppercase tracking-[0.4em] font-bold">
            {project.year}
          </div>
        </motion.div>

        {/* Project Info */}
        <motion.div
          initial={{ opacity: 0.7 }}
          whileHover={{ opacity: 1 }}
          className="mt-4"
        >
          <div className="text-[9px] uppercase tracking-[0.5em] text-ember font-bold mb-1">
            {project.category}
          </div>
          <h3 className="font-display font-bold text-xl md:text-2xl tracking-[-0.03em] group-hover:text-ember transition-colors duration-300">
            {project.title}
          </h3>
          <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 opacity-60">
            {project.client}
          </div>
        </motion.div>
      </Link>
    </motion.article>
  );
}