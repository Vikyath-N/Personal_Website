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
    <section className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-5xl md:text-7xl font-semibold tracking-tight">
        Vikyath Naradasi
      </h1>
      <div className="mt-3 h-10 text-2xl text-muted-foreground">
        <AnimatePresence mode="wait">
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {ROLES[i]}
          </motion.span>
        </AnimatePresence>
      </div>
      <p className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
        Building delightful AI products with robust systems & polished UX.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild>
          <a href="/projects">See Projects</a>
        </Button>
        <Button variant="secondary" asChild>
          <a href="/resume">Interactive Résumé</a>
        </Button>
        <Button variant="ghost" asChild>
          <a href="/playground">AI Playground</a>
        </Button>
      </div>
    </section>
  );
}
