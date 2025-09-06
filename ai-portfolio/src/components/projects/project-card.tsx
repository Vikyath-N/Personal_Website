"use client";
import { Card } from "@/components/ui/card";
import { ExternalLink, Github, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface Project {
  slug: string;
  title: string;
  year: number;
  tags: string[];
  stack: string[];
  summary: string;
  repo?: string;
  demo?: string;
  media?: string;
}

export default function ProjectCard({ p }: { p: Project }) {
  const [viewCount] = useState<number | null>(null);

  useEffect(() => {
    // Track project view when component mounts
    const trackView = async () => {
      try {
        await fetch("/api/project-view", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: p.slug })
        });
      } catch {
        console.log("View tracking not available");
      }
    };
    
    trackView();
  }, [p.slug]);

  return (
    <Card 
      className="group overflow-hidden relative transition-all duration-300 will-change-transform hover:shadow-lg"
    >
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold">{p.title}</h3>
          <div className="text-right">
            <span className="text-sm text-muted-foreground block">{p.year}</span>
            {viewCount !== null && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Eye className="h-3 w-3" />
                <span>{viewCount}</span>
              </div>
            )}
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm">{p.summary}</p>
        
        <div className="flex flex-wrap gap-2">
          {p.tags.map((tag: string) => (
            <span key={tag} className="badge badge-outline badge-sm">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {p.stack.map((tech: string) => (
            <span key={tech} className="badge badge-ghost badge-xs">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-2 pt-2">
          {p.repo && (
            <Button variant="outline" size="sm" asChild>
              <a href={p.repo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                <Github className="h-4 w-4" />
                Code
              </a>
            </Button>
          )}
          {p.demo && (
            <Button variant="outline" size="sm" asChild>
              <a href={p.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                <ExternalLink className="h-4 w-4" />
                Demo
              </a>
            </Button>
          )}
        </div>
      </div>
      
      {p.media && (
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center justify-center h-full">
            <div className="text-sm text-muted-foreground">Media preview would go here</div>
          </div>
        </div>
      )}
    </Card>
  );
}
