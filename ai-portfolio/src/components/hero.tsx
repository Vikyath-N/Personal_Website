"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const ROLES = ["AI Engineer", "Full-Stack Developer", "Researcher"];

export default function Hero() {
  const [i, setI] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => setI(p => (p + 1) % ROLES.length), 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
      <div className="space-y-2">
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-none">
          Vikyath Naradasi
        </h1>
        <div className="h-8 md:h-10 flex items-center pl-[6px] sm:pl-[8px] md:pl-[10px]">
          <AnimatePresence mode="wait">
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="text-xl md:text-2xl text-muted-foreground font-medium"
            >
              {ROLES[i]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <p className="mt-8 text-balance text-lg text-muted-foreground pl-[6px] sm:pl-[8px] md:pl-[10px]">
        Building delightful AI products with robust systems & polished UX.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Button asChild size="lg">
          <a href="/projects">See Projects</a>
        </Button>
        <Button variant="secondary" asChild size="lg">
          <a href="/resume">Interactive Résumé</a>
        </Button>
        <Button variant="ghost" asChild size="lg">
          <a href="/playground">AI Playground</a>
        </Button>
      </div>
    </section>
  );
}
