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
      className="relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 bg-gray-300 dark:bg-gray-700"
      aria-label="Toggle color theme"
    >
      {/* icons */}
      <Sun className="pointer-events-none absolute left-1 h-3.5 w-3.5 text-yellow-500 transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-100'}" />
      <Moon className="pointer-events-none absolute right-1 h-3.5 w-3.5 text-blue-200 transition-opacity duration-300 ${isDark ? 'opacity-100' : 'opacity-0'}" />
      {/* knob */}
      <span
        className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white dark:bg-gray-100 shadow-md transform transition-all duration-300 ${isDark ? 'translate-x-5' : 'translate-x-0'}`}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
