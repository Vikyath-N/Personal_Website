import data from "../../../../content/projects.json";
import ProjectCard from "@/components/projects/project-card";

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

export const metadata = { 
  title: "Projects - Vikyath Naradasi",
  description: "A collection of my projects and work"
};

export default function Projects() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Projects</h1>
        <p className="text-muted-foreground text-lg">
          A collection of things I&apos;ve built and worked on.
        </p>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((project: Project) => (
          <ProjectCard key={project.slug} p={project} />
        ))}
      </div>
    </main>
  );
}
