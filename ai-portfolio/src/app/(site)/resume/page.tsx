"use client";
import json from "../../../../content/resume.json";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState, useEffect } from "react";

interface Personal {
  name: string;
  location: string;
  contact: {
    mobile: string;
    email: string;
    linkedin: string;
    github: string;
  };
}

interface Experience {
  company: string;
  role: string;
  years: string;
  bullets: string[];
}

interface Education {
  school: string;
  degree: string;
  years: string;
  details: string[];
}

interface Project {
  name: string;
  skills: string[];
  description: string[];
  link: string;
}


export default function Resume() {
  const personal: Personal = json.personal;
  const [isDark, setIsDark] = useState(false);

  // Track theme changes
  useEffect(() => {
    const checkTheme = () => {
      const dark = document.documentElement.classList.contains('dark');
      setIsDark(dark);
    };

    // Check initial theme
    checkTheme();

    // Listen for theme changes using MutationObserver
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold">Interactive Résumé</h1>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/resume.pdf';
              link.download = 'Vikyath_Naradasi_Resume.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
        <p className="text-muted-foreground text-lg relative inline-block px-6 py-3 rounded-full border-2 border-blue-500/60 shadow-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-white hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-default">
          Click on any experience or education item to see more details.
        </p>
      </div>

      {/* Personal Information */}
      <section className="mb-12">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{personal.name}</h1>
          <p className="text-lg text-muted-foreground mb-4">{personal.location}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <span>💼 <a href={`https://${personal.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary">{personal.contact.linkedin}</a></span>
            <span>🐙 <a href={`https://${personal.contact.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary">{personal.contact.github}</a></span>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Experience</h2>
        <div className="space-y-8">
          {json.experience.map((e: Experience, i: number) => (
            <div key={i} className="flex gap-4">
              <div className="text-sm text-muted-foreground font-mono w-32 flex-shrink-0 pt-1">
                {e.years}
              </div>
              <div className="flex-1">
                <Sheet>
                  <SheetTrigger className="link link-hover text-lg font-medium text-left">
                    {e.role} · {e.company}
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[400px] sm:w-[540px] p-6">
                    <SheetHeader>
                      <SheetTitle className="text-xl">
                        {e.role} @ {e.company}
                      </SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <p className="text-sm text-muted-foreground mb-4">{e.years}</p>
                      <ul className="space-y-3">
                        {e.bullets.map((bullet: string, j: number) => (
                          <li key={j} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Education</h2>
        <div className="space-y-8">
          {json.education.map((edu: Education, i: number) => (
            <div key={i} className="flex gap-4">
              <div className="text-sm text-muted-foreground font-mono w-32 flex-shrink-0 pt-1">
                {edu.years}
              </div>
              <div className="flex-1">
                <Sheet>
                  <SheetTrigger className="link link-hover text-lg font-medium text-left">
                    <div>
                      <div>{edu.degree}</div>
                      <div className="text-sm text-muted-foreground">{edu.school}</div>
                    </div>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[400px] sm:w-[540px] p-6">
                    <SheetHeader>
                      <SheetTitle className="text-xl">
                        {edu.degree}
                      </SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <p className="text-lg font-medium mb-2">{edu.school}</p>
                      <p className="text-sm text-muted-foreground mb-4">{edu.years}</p>
                      <ul className="space-y-3">
                        {edu.details.map((detail: string, j: number) => (
                          <li key={j} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Projects</h2>
        <div className="space-y-8">
          {json.projects.map((project: Project, i: number) => (
            <Card key={i} className="p-6">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 text-sm font-medium"
                  >
                    View Project →
                  </a>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.skills.map((skill: string) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <ul className="space-y-2">
                {project.description.map((desc: string, j: number) => (
                  <li key={j} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{desc}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Skills</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(json.skills).map(([category, skills]) => {
            // Toggle between old and new light mode styles
            const useNewLightModeStyles = true; // Set to false to use old light mode styles

            const getCategoryStyles = (cat: string) => {
              switch (cat) {
                case 'languages':
                  return isDark ? {
                    // ORIGINAL DARK MODE STYLES (restored)
                    card: 'border-blue-500/30',
                    title: 'text-blue-300',
                    badge: 'bg-slate-800 text-blue-300 border border-blue-500/40 hover:bg-blue-900/20 hover:border-blue-400/60'
                  } : useNewLightModeStyles ? {
                    // NEW LIGHT MODE STYLES
                    card: 'border-blue-200 bg-blue-50/80',
                    title: 'text-blue-800',
                    badge: 'bg-blue-100 text-blue-800 border border-blue-300 hover:bg-blue-200 hover:border-blue-400'
                  } : {
                    // OLD LIGHT MODE STYLES (preserved)
                    card: 'border-blue-500/30',
                    title: 'text-blue-300',
                    badge: 'bg-slate-800 text-blue-300 border border-blue-500/40 hover:bg-blue-900/20 hover:border-blue-400/60'
                  };
                case 'frameworks':
                  return isDark ? {
                    // ORIGINAL DARK MODE STYLES (restored)
                    card: 'border-emerald-500/30',
                    title: 'text-emerald-300',
                    badge: 'bg-slate-800 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/20 hover:border-emerald-400/60'
                  } : useNewLightModeStyles ? {
                    // NEW LIGHT MODE STYLES
                    card: 'border-emerald-200 bg-emerald-50/80',
                    title: 'text-emerald-800',
                    badge: 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200 hover:border-emerald-400'
                  } : {
                    // OLD LIGHT MODE STYLES (preserved)
                    card: 'border-emerald-500/30',
                    title: 'text-emerald-300',
                    badge: 'bg-slate-800 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/20 hover:border-emerald-400/60'
                  };
                case 'ai_ml':
                  return isDark ? {
                    // ORIGINAL DARK MODE STYLES (restored)
                    card: 'border-purple-500/30',
                    title: 'text-purple-300',
                    badge: 'bg-slate-800 text-purple-300 border border-purple-500/40 hover:bg-purple-900/20 hover:border-purple-400/60'
                  } : useNewLightModeStyles ? {
                    // NEW LIGHT MODE STYLES
                    card: 'border-purple-200 bg-purple-50/80',
                    title: 'text-purple-800',
                    badge: 'bg-purple-100 text-purple-800 border border-purple-300 hover:bg-purple-200 hover:border-purple-400'
                  } : {
                    // OLD LIGHT MODE STYLES (preserved)
                    card: 'border-purple-500/30',
                    title: 'text-purple-300',
                    badge: 'bg-slate-800 text-purple-300 border border-purple-500/40 hover:bg-purple-900/20 hover:border-purple-400/60'
                  };
                case 'tools':
                  return isDark ? {
                    // ORIGINAL DARK MODE STYLES (restored)
                    card: 'border-orange-500/30',
                    title: 'text-orange-300',
                    badge: 'bg-slate-800 text-orange-300 border border-orange-500/40 hover:bg-orange-900/20 hover:border-orange-400/60'
                  } : useNewLightModeStyles ? {
                    // NEW LIGHT MODE STYLES
                    card: 'border-orange-200 bg-orange-50/80',
                    title: 'text-orange-800',
                    badge: 'bg-orange-100 text-orange-800 border border-orange-300 hover:bg-orange-200 hover:border-orange-400'
                  } : {
                    // OLD LIGHT MODE STYLES (preserved)
                    card: 'border-orange-500/30',
                    title: 'text-orange-300',
                    badge: 'bg-slate-800 text-orange-300 border border-orange-500/40 hover:bg-orange-900/20 hover:border-orange-400/60'
                  };
                case 'methodologies':
                  return isDark ? {
                    // ORIGINAL DARK MODE STYLES (restored)
                    card: 'border-cyan-500/30',
                    title: 'text-cyan-300',
                    badge: 'bg-slate-800 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900/20 hover:border-cyan-400/60'
                  } : useNewLightModeStyles ? {
                    // NEW LIGHT MODE STYLES
                    card: 'border-cyan-200 bg-cyan-50/80',
                    title: 'text-cyan-800',
                    badge: 'bg-cyan-100 text-cyan-800 border border-cyan-300 hover:bg-cyan-200 hover:border-cyan-400'
                  } : {
                    // OLD LIGHT MODE STYLES (preserved)
                    card: 'border-cyan-500/30',
                    title: 'text-cyan-300',
                    badge: 'bg-slate-800 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900/20 hover:border-cyan-400/60'
                  };
                default:
                  return isDark ? {
                    // ORIGINAL DARK MODE STYLES (restored)
                    card: 'border-slate-500/30',
                    title: 'text-slate-300',
                    badge: 'bg-slate-800 text-slate-300 border border-slate-500/40 hover:bg-slate-700/20 hover:border-slate-400/60'
                  } : useNewLightModeStyles ? {
                    // NEW LIGHT MODE STYLES
                    card: 'border-slate-200 bg-slate-50/80',
                    title: 'text-slate-800',
                    badge: 'bg-slate-100 text-slate-800 border border-slate-300 hover:bg-slate-200 hover:border-slate-400'
                  } : {
                    // OLD LIGHT MODE STYLES (preserved)
                    card: 'border-slate-500/30',
                    title: 'text-slate-300',
                    badge: 'bg-slate-800 text-slate-300 border border-slate-500/40 hover:bg-slate-700/20 hover:border-slate-400/60'
                  };
              }
            };

            const styles = getCategoryStyles(category);
            
            return (
              <Card key={category} className={`p-6 ${styles.card}`}>
                <h3 className={`text-lg font-medium mb-3 capitalize ${styles.title}`}>
                  {category === 'ai_ml' ? 'AI/ML' : category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(skills as string[]).map((skill: string) => (
                    <Badge 
                      key={skill} 
                      variant="default" 
                      className={`text-xs ${styles.badge}`}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}
