import { motion } from "framer-motion";

export function Nav() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav className="flex items-center justify-between px-6 md:px-10 py-5">
        <a
          href="#"
          className="font-display font-bold text-lg tracking-tight text-ink mix-blend-difference"
        >
          NORTH&amp;CO<span className="opacity-60">®</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm font-medium bg-paper/70 backdrop-blur-md border border-ink/10 rounded-full px-7 py-2.5">
          <li><a href="#work" className="hover-link">Work</a></li>
          <li><a href="#services" className="hover-link">Services</a></li>
          <li><a href="#process" className="hover-link">Process</a></li>
          <li><a href="#contact-form" className="hover-link">Contact</a></li>
        </ul>

        <a
          href="#contact-form"
          className="group inline-flex items-center gap-2 bg-ink text-paper rounded-full pl-5 pr-2 py-2 text-sm font-medium transition-all hover:gap-3"
        >
          Start a project
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-paper text-ink transition-transform group-hover:rotate-45">
            →
          </span>
        </a>
      </nav>
    </motion.header>
  );
}
