"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => setIsScrolled(window.scrollY > 50);
      window.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const toggleMenu = () => setMobileOpen(!mobileOpen);
  const closeMenu = () => setMobileOpen(false);
  const barColor = mobileOpen ? '#fafaf9' : (isScrolled ? '#fafaf9' : '#1c1917');
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className="flex items-center justify-between px-6 md:px-10 py-4 md:py-5 backdrop-blur-xl transition-colors relative"
        style={{ 
          backgroundColor: mobileOpen ? 'rgba(28, 25, 23, 0.95)' : (isScrolled ? 'rgba(28, 25, 23, 0.95)' : 'transparent'),
        }}
      >
        {/* Logo */}
        <Link href="/" className="font-display font-black text-xl md:text-2xl tracking-tighter cursor-pointer z-50" onClick={closeMenu}>
          <span style={{ color: mobileOpen ? '#fafaf9' : (isScrolled ? '#fafaf9' : '#1c1917') }}>
            NORTH<span className="text-ember">&</span>CO<span className="text-[10px] align-top ml-0.5 opacity-40">®</span>
          </span>
        </Link>

        {/* Desktop Menu - Hidden on mobile */}
        <ul 
          className="hidden md:flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold"
          style={{ 
            color: '#fafaf9',
            backgroundColor: isScrolled ? 'transparent' : 'rgba(251, 75, 25, 0.95)',
            borderRadius: isScrolled ? '0px' : '9999px',
            padding: isScrolled ? '12px 16px' : '8px 16px',
          }}
        >
          {["Work", "Services", "Process", "Contact"].map((item) => (
            <li key={item}>
              <Link 
                href={`#${item.toLowerCase()}`} 
                className="hover-link hover:opacity-100 transition-opacity px-3 py-2 block cursor-pointer"
                style={{ color: '#fafaf9' }}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA - Hidden on mobile */}
        <div className="hidden md:block">
          <Link 
            href="#contact-form" 
            className="inline-flex items-center gap-4 rounded-full pl-8 pr-2 py-3 text-xs uppercase tracking-[0.2em] font-bold transition-all hover:gap-6 cursor-pointer" 
            style={{ backgroundColor: '#1c1917', color: '#fafaf9' }}
          >
            <span>Consult Now</span>
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-ember text-paper transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">↗</span>
          </Link>
        </div>

        {/* Mobile Menu Button - Shows X when open, hamburger when closed */}
        <button 
          type="button"
          className="md:hidden flex flex-col justify-center items-center p-2 cursor-pointer z-50"
          onClick={toggleMenu}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span style={{ 
            display: 'block',
            width: 24, 
            height: 2, 
            backgroundColor: barColor,
            marginBottom: 6,
            transform: mobileOpen ? 'rotate(45deg)' : 'none',
            transition: 'transform 0.3s ease'
          }} />
          <span style={{ 
            display: 'block',
            width: 24, 
            height: 2, 
            backgroundColor: barColor,
            marginBottom: 6,
            opacity: mobileOpen ? 0 : 1,
            transition: 'opacity 0.3s ease'
          }} />
          <span style={{ 
            display: 'block',
            width: 24, 
            height: 2, 
            backgroundColor: barColor,
            transform: mobileOpen ? 'rotate(-45deg)' : 'none',
            transition: 'transform 0.3s ease'
          }} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden fixed inset-0 bg-ink/95 backdrop-blur-xl z-40 pt-24"
        >
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
            className="flex flex-col px-6"
          >
            {["Work", "Services", "Process", "Contact"].map((item) => (
              <li key={item} className="border-b border-paper/10">
                <Link href={`#${item.toLowerCase()}`} className="block py-5 text-2xl font-medium cursor-pointer text-paper" onClick={closeMenu}>
                  {item}
                </Link>
              </li>
            ))}
            <li className="pt-8">
              <Link href="#contact-form" className="block w-full text-center bg-ember text-paper rounded-full px-6 py-4 text-lg font-bold cursor-pointer" onClick={closeMenu}>
                Start a Project
              </Link>
            </li>
          </motion.ul>
        </motion.div>
      )}
    </header>
  );
}