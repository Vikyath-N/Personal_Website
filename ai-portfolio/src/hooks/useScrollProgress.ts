"use client";
import { useEffect, useState } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const htmlElement = document.documentElement;
      const scrollProgress = 
        (htmlElement.scrollTop) / 
        (htmlElement.scrollHeight - htmlElement.clientHeight) * 100;
      
      setProgress(Math.max(0, Math.min(100, scrollProgress || 0)));
    };

    // Initial calculation
    onScroll();
    
    window.addEventListener("scroll", onScroll, { passive: true });
    
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return progress;
}
