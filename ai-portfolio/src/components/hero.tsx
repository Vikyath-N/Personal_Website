"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ROLES = ["AI Engineer", "Full-Stack Developer", "Researcher"];

export default function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setI(p => (p + 1) % ROLES.length), 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
      <div className="flex flex-col-reverse md:flex-row items-center md:items-start gap-12 md:gap-16">

        {/* ── Text block ── */}
        <div className="flex-1 min-w-0">
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
        </div>

        {/* ── Profile photo ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0 flex items-center justify-center"
        >
          {/* Spinning gradient ring */}
          <div className="relative group">
            {/* Animated gradient glow behind the ring */}
            <div
              className="absolute -inset-[3px] rounded-full opacity-75 blur-md
                         bg-gradient-to-tr from-blue-500 via-violet-500 to-cyan-400
                         group-hover:opacity-100 group-hover:blur-lg
                         transition-all duration-500"
            />

            {/* Spinning conic-gradient ring */}
            <div
              className="absolute -inset-[3px] rounded-full
                         bg-[conic-gradient(from_0deg,theme(colors.blue.500),theme(colors.violet.500),theme(colors.cyan.400),theme(colors.blue.500))]
                         animate-spin-slow opacity-80 group-hover:opacity-100
                         transition-opacity duration-500"
            />

            {/* Inner white/dark mask to create border illusion */}
            <div className="absolute inset-[3px] rounded-full bg-background z-10" />

            {/* Photo */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative z-20 w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden"
            >
              <Image
                src="/profile.jpg"
                alt="Vikyath Naradasi"
                fill
                sizes="(max-width: 768px) 176px, 224px"
                className="object-cover object-top"
                priority
              />
              {/* Subtle gradient overlay on hover */}
              <div
                className="absolute inset-0 rounded-full
                           bg-gradient-to-br from-blue-500/0 via-violet-500/0 to-cyan-400/0
                           group-hover:from-blue-500/10 group-hover:via-violet-500/10 group-hover:to-cyan-400/10
                           transition-all duration-500"
              />
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
