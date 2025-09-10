import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="group flex items-center space-x-3 transition-all duration-200 hover:scale-105"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-sm shadow-lg">
                V
              </div>
              <span className="text-xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                Vikyath
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <nav className="flex items-center space-x-1">
              <Button 
                variant="ghost" 
                size="sm" 
                asChild
                className="h-9 px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200 rounded-lg"
              >
                <Link href="/projects/">Projects</Link>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                asChild
                className="h-9 px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200 rounded-lg"
              >
                <Link href="/resume/">Resume</Link>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                asChild
                className="h-9 px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200 rounded-lg"
              >
                <Link href="/playground/">Playground</Link>
              </Button>
            </nav>
            
            <div className="ml-4 pl-4 border-l border-border/40">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0"
              aria-label="Open menu"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
