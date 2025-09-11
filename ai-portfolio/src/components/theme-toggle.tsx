"use client";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check system preference or localStorage
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDark(shouldBeDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    localStorage.setItem("theme", newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={toggleTheme}
      className={`relative inline-flex h-8 w-14 items-center rounded-full border shadow-inner transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${
        isDark ? 'bg-slate-800/70 border-slate-600' : 'bg-slate-200 border-slate-300'
      }`}
      aria-label="Toggle color theme"
    >
      {/* icons (left = Sun for light, right = Moon for dark) */}
      <Sun
        className={`pointer-events-none absolute left-[7px] h-4 w-4 z-10 transition-opacity duration-300 ${
          isDark ? 'opacity-0' : 'opacity-100 text-yellow-500'
        }`}
      />
      <Moon
        className={`pointer-events-none absolute right-[7px] h-4 w-4 z-10 transition-opacity duration-300 ${
          isDark ? 'opacity-100 text-blue-400' : 'opacity-0'
        }`}
      />
      {/* knob */}
      <span
        className={`absolute top-[1px] left-[1px] h-7 w-7 rounded-full shadow-md transition-transform duration-300 ${
          isDark ? 'translate-x-6 bg-slate-200' : 'translate-x-0 bg-white'
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
