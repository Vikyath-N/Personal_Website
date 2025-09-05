"use client";
import json from "../../../../content/resume.json";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";

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

export default function Resume() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold">Interactive Résumé</h1>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
        <p className="text-muted-foreground text-lg">
          Click on any experience or education item to see more details.
        </p>
      </div>

      {/* Experience Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Experience</h2>
        <ul className="timeline timeline-vertical">
          {json.experience.map((e: Experience, i: number) => (
            <li key={i} className={i !== json.experience.length - 1 ? "mb-8" : ""}>
              <div className="timeline-start text-sm text-muted-foreground font-mono">
                {e.years}
              </div>
              <div className="timeline-middle">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
              </div>
              <div className="timeline-end">
                <Sheet>
                  <SheetTrigger className="link link-hover text-lg font-medium text-left">
                    {e.role} · {e.company}
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[400px] sm:w-[540px]">
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
            </li>
          ))}
        </ul>
      </section>

      {/* Education Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Education</h2>
        <ul className="timeline timeline-vertical">
          {json.education.map((edu: Education, i: number) => (
            <li key={i} className={i !== json.education.length - 1 ? "mb-8" : ""}>
              <div className="timeline-start text-sm text-muted-foreground font-mono">
                {edu.years}
              </div>
              <div className="timeline-middle">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
              </div>
              <div className="timeline-end">
                <Sheet>
                  <SheetTrigger className="link link-hover text-lg font-medium text-left">
                    {edu.degree} · {edu.school}
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[400px] sm:w-[540px]">
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
            </li>
          ))}
        </ul>
      </section>

      {/* Skills Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Skills</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {Object.entries(json.skills).map(([category, skills]) => (
            <Card key={category} className="p-6">
              <h3 className="text-lg font-medium mb-3 capitalize">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {(skills as string[]).map((skill: string) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
