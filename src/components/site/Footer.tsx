import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer id="contact" className="bg-ink text-paper px-6 md:px-12 py-16 md:py-24 grain">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="text-xs uppercase tracking-widest text-paper/50 mb-6">
          ⟶ Let's make something
        </div>
        <h2 className="font-display font-bold text-[16vw] md:text-[12vw] leading-[0.85] tracking-[-0.04em]">
          Say <em className="italic font-light">hi</em>.
        </h2>

        <div className="grid md:grid-cols-12 gap-8 mt-16 pt-8 border-t border-paper/15">
          <div className="md:col-span-4">
            <div className="text-xs uppercase tracking-widest text-paper/50 mb-3">New business</div>
            <a href="mailto:hello@northandco.studio" className="hover-link text-2xl md:text-3xl font-display">
              hello@northandco.studio
            </a>
          </div>
          <div className="md:col-span-4">
            <div className="text-xs uppercase tracking-widest text-paper/50 mb-3">Studio</div>
            <p className="text-lg">Rua da Boavista 84<br/>1200—070 Lisbon</p>
          </div>
          <div className="md:col-span-4">
            <div className="text-xs uppercase tracking-widest text-paper/50 mb-3">Elsewhere</div>
            <ul className="space-y-1 text-lg">
              <li><a className="hover-link" href="#">Instagram</a></li>
              <li><a className="hover-link" href="#">Read.cv</a></li>
              <li><a className="hover-link" href="#">Are.na</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mt-20 text-xs uppercase tracking-widest text-paper/50">
          <div>© North&amp;Co Studio MMXXVI</div>
          <div>Crafted in Lisbon · Hosted on renewable energy</div>
        </div>
      </motion.div>
    </footer>
  );
}
