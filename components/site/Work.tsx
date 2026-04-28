"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const projects = [
  {
    num: "01",
    client: "Maison Verel — Haute couture, Paris",
    title: "Haute Couture",
    category: "Fashion & Apparel",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW9kZWx8ZW58MHx8MHx8fDA%3D",
    year: "2024",
    height: "aspect-[3/4] md:aspect-[4/3]",
    offset: 0,
  },
  {
    num: "02",
    client: "Forma Collective — Architectural studio",
    title: "Portfolio",
    category: "Architecture & Design",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop",
    year: "2024",
    height: "aspect-[3/4] md:aspect-[4/3]",
    offset: 100,
  },
  {
    num: "03",
    client: "Lumina — Skincare, Italy",
    title: "Skincare",
    category: "Beauty & Skincare",
    image: "https://images.unsplash.com/photo-1552046122-03184de85e08?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2tpbmNhcmV8ZW58MHx8MHx8fDA%3D",
    year: "2023",
    height: "aspect-[3/4] md:aspect-[4/3]",
    offset: -50,
  },
  {
    num: "04",
    client: "Noir Parfums — Luxury Fragrance House",
    title: "Fragrance",
    category: "Beauty & Fragrance",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop",
    year: "2024",
    height: "aspect-[3/4] md:aspect-[4/3]",
    offset: 50,
  },
];

export function Work() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="work" className="px-6 md:px-12 py-24 md:py-48 bg-paper">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 md:mb-40 border-b border-ink/10 pb-16 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-6 font-bold">
            ⟶ Prestigious Clients
          </div>
          <h2 className="font-display font-bold text-5xl md:text-7xl tracking-[-0.04em] max-w-4xl leading-[0.85]">
            Crafting <br />
            <em className="font-serif italic font-light text-ember">exceptional</em> brands.
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 md:mt-0"
        >
          <a href="#" className="hover-link cursor-pointer text-[10px] uppercase tracking-[0.3em] font-bold border border-ink/10 rounded-full px-10 py-4 transition-all hover:bg-ink hover:text-paper cursor-pointer">
            Explore All Work
          </a>
        </motion.div>
      </div>

      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, project.offset]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? 2 : -2]);

  return (
    <motion.article
      ref={ref}
      style={{ y, rotateZ: rotate }}
      initial={{ opacity: 0, y: 150 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 1.4,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group cursor-none"
    >
      <div className={`relative ${project.height} overflow-hidden rounded-sm bg-paper-soft shadow-2xl shadow-ink/5`}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
        
        {/* Hover Interaction Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 bg-ink/40 backdrop-blur-[4px]">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            className="bg-paper text-ink w-32 h-32 rounded-full flex items-center justify-center text-[10px] uppercase tracking-[0.2em] font-bold shadow-2xl"
          >
            Open Case
          </motion.div>
        </div>

        <div className="absolute top-8 left-8 text-paper text-[10px] uppercase tracking-[0.4em] font-bold mix-blend-difference">
          {project.year}
        </div>
        <div className="absolute top-8 right-8 text-paper text-[10px] uppercase tracking-[0.4em] font-bold mix-blend-difference">
          {project.num}
        </div>
      </div>

      <div className="mt-12 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.5em] text-ember font-black mb-4">
            {project.category}
          </div>
          <h3 className="font-display font-bold text-4xl md:text-6xl tracking-[-0.05em] leading-[0.9] group-hover:translate-x-4 transition-transform duration-700">
            {project.title}
          </h3>
        </div>
        <div className="text-muted-foreground text-xs uppercase tracking-widest font-bold opacity-30 group-hover:opacity-100 transition-opacity duration-700">
          Client: {project.client}
        </div>
      </div>
    </motion.article>
  );
}