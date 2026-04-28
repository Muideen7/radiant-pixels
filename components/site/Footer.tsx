"use client";

import { motion } from "framer-motion";

export function Footer() {
  const socialLinks = [
    { name: "Instagram", href: "#" },
    { name: "Read.cv", href: "#" },
    { name: "Are.na", href: "#" },
    { name: "LinkedIn", href: "#" },
  ];

  return (
    <footer id="contact" className="relative bg-ink text-paper pt-24 pb-12 grain overflow-hidden">
      {/* Background Marquee */}
      <div className="absolute top-0 left-0 w-full overflow-hidden opacity-[0.03] pointer-events-none select-none py-10">
        <div className="flex whitespace-nowrap marquee font-display font-black text-[30vw] leading-none uppercase">
          <span>Digital Transformation · Scalable Systems · Global Impact ·&nbsp;</span>
          <span>Digital Transformation · Scalable Systems · Global Impact ·&nbsp;</span>
        </div>
      </div>

      <div className="relative px-6 md:px-12 z-10">
        <div className="grid md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="text-xs uppercase tracking-[0.2em] text-ember font-bold mb-8 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-ember"></span>
                Get in touch
              </div>
              <h2 className="font-display font-bold text-5xl md:text-6xl leading-[0.9] tracking-[-0.03em]">
                Ready to start <br />
                <span className="font-serif italic font-light text-paper/80">your next</span> project?
              </h2>
            </motion.div>
          </div>

          <div className="md:col-span-4 flex md:justify-end pb-4">
<motion.a
              href="mailto:hello@northandco.studio"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-ember text-paper flex items-center justify-center text-center font-display font-bold text-xl md:text-2xl tracking-tight leading-tight transition-all duration-300 cursor-pointer"
            >
              Email <br /> Us
            </motion.a>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-10 mt-24 pt-12 border-t border-paper/10">
          <div className="md:col-span-4">
            <div className="text-[10px] uppercase tracking-[0.2em] text-paper/40 mb-6 font-bold">Contact Details</div>
            <div className="space-y-2">
              <a href="mailto:hello@northandco.studio" className="block text-xl md:text-2xl font-display hover:text-ember transition-colors cursor-pointer">
                hello@northandco.studio
              </a>
              <p className="text-paper/60 text-lg font-light">Available for select projects <br />worldwide from 2026.</p>
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="text-[10px] uppercase tracking-[0.2em] text-paper/40 mb-6 font-bold">Location</div>
            <div className="text-xl font-display uppercase italic font-light">Remote · Worldwide</div>
          </div>

          <div className="md:col-span-4 md:text-right">
            <div className="text-[10px] uppercase tracking-[0.2em] text-paper/40 mb-6 font-bold">Social Presence</div>
            <div className="flex flex-wrap md:justify-end gap-x-6 gap-y-2">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-xl font-display hover:text-ember transition-colors uppercase italic font-light cursor-pointer">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 mt-24 pt-8 border-t border-paper/5 text-[10px] uppercase tracking-[0.3em] text-paper/30 font-bold">
          <div>© North&amp;Co Studio MMXXVI · ALL RIGHTS RESERVED</div>
          <div className="uppercase tracking-[0.2em] text-paper/30 font-bold">
            REMOTE · WORLDWIDE
          </div>
        </div>
      </div>
    </footer>
  );
}
