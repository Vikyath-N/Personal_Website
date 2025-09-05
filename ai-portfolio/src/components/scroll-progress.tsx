"use client";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div 
      className="fixed top-0 left-0 h-1 bg-primary z-50 transition-all duration-150 ease-out"
      style={{ width: `${progress}%` }}
    />
  );
}
