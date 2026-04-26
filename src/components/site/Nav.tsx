import { motion } from "framer-motion";

export function Nav() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
      className="fixed top-0 left-0 right-0 z-50 mix-blend-difference"
    >
      <nav className="flex items-center justify-between px-6 md:px-12 py-6 text-paper">
        <a href="#" className="font-display font-bold text-xl tracking-tight">
          NORTH&amp;CO<span className="text-paper/60">®</span>
        </a>
        <ul className="hidden md:flex items-center gap-10 text-sm font-medium">
          <li><a href="#work" className="hover-link">Work</a></li>
          <li><a href="#services" className="hover-link">Services</a></li>
          <li><a href="#process" className="hover-link">Process</a></li>
          <li><a href="#contact" className="hover-link">Contact</a></li>
        </ul>
        <a href="#contact-form" className="text-sm font-medium hover-link">
          Start a project →
        </a>
      </nav>
    </motion.header>
  );
}
