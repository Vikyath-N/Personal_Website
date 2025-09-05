"use client";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
  slug: string;
  title: string;
  year: number;
  tags: string[];
  stack: string[];
  summary: string;
  repo: string;
  demo: string;
  media?: string;
}

export default function ProjectCard({ p }: { p: Project }) {
  const [hover, setHover] = useState(false);

  return (
    <Card 
      onMouseEnter={() => setHover(true)} 
      onMouseLeave={() => setHover(false)}
      className="group overflow-hidden relative transition-all duration-300 will-change-transform hover:shadow-lg"
    >
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold">{p.title}</h3>
          <span className="text-sm text-muted-foreground">{p.year}</span>
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
          <Button variant="outline" size="sm" asChild>
            <a href={p.repo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              <Github className="h-4 w-4" />
              Code
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={p.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              <ExternalLink className="h-4 w-4" />
              Demo
            </a>
          </Button>
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
