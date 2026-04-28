"use client";

import { motion } from "framer-motion";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Work } from "@/components/site/Work";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { Testimonial } from "@/components/site/Testimonial";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
      className="bg-paper text-ink overflow-x-hidden relative"
    >
      {/* Global Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] -left-[10%] w-[40vw] h-[40vw] bg-ember/5 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, -8, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] -right-[5%] w-[30vw] h-[30vw] bg-ink/5 blur-[100px] rounded-full"
        />
      </div>

      <div className="relative z-10">
        <Nav />
        <Hero />
        <Work />
        <Marquee />
        <Services />
        <Process />
        <Testimonial />
        <Contact />
        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </motion.main>
  );
}