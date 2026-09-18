"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Project } from "@/types/project";
import { useCursor } from "@/hooks/useCursor";
import { SelectedWorkCard } from "@/components/work/SelectedWorkCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ORDERED_SLUGS = [
  "brewcraft-brand",
  "oribel-packaging",
  "lumio-3d",
  "vanta-identity",
  "terroir-packaging",
  "solace-campaign",
];

interface WorkSectionProps {
  projects: Project[];
}

export function WorkSection({ projects }: WorkSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const spotlightRef = useCursor(sectionRef);

  useGSAP(() => {
    // Fade in elements logic can be handled by ScrollTrigger or IntersectionObserver as before
  }, { scope: sectionRef });

  // Deterministically sort the projects according to the requested order
  const orderedProjects = ORDERED_SLUGS.map((slug) =>
    projects.find((p) => p.slug === slug),
  ).filter((p): p is Project => p !== undefined);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ws-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );

    const elements = document.querySelectorAll(".ws-fade-up");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [projects]);

  // Bento grid layout classes for 6 items
  const bentoClasses = [
    "col-span-1 md:col-span-2 row-span-2 min-h-[400px] md:min-h-[500px]", // Item 1: Large featured
    "col-span-1 row-span-1 min-h-[250px] md:min-h-[300px]",              // Item 2: Small/Medium
    "col-span-1 row-span-1 min-h-[250px] md:min-h-[300px]",              // Item 3: Small/Medium
    "col-span-1 row-span-2 md:row-span-1 min-h-[350px] md:min-h-[300px]",// Item 4: Portrait on mobile, landscape on desktop
    "col-span-1 md:col-span-2 row-span-1 min-h-[350px] md:min-h-[300px]",// Item 5: Landscape
    "col-span-1 md:col-span-3 row-span-1 min-h-[300px] md:min-h-[400px]",// Item 6: Full width bottom
  ];

  return (
    <section
      id="work"
      ref={sectionRef}
      className="section section--work relative w-full py-32 text-foreground overflow-hidden select-none"
    >


      {/* Content Container */}
      <div className="container-wide relative z-20 space-y-16">
        {/* Header */}
        <header className="section-header max-w-4xl">
          <div className="ws-fade-up eyebrow mb-6">
            <span className="eyebrow-dot" />
            <span className="eyebrow-label text-white/50 tracking-[0.2em]">SELECTED WORK</span>
          </div>

          <h2 className="ws-fade-up section-heading text-4xl md:text-6xl font-black font-display tracking-tight text-white leading-[1.1]">
            THIS IS A CURATED SHOWCASE.
          </h2>
        </header>

        {/* Bento Project Grid */}
        <div className="work-bento-grid grid grid-cols-1 md:grid-cols-3 gap-[4px] md:gap-2 auto-rows-[minmax(0,1fr)]">
          {orderedProjects.map((project, index) => {
            const layoutClass = bentoClasses[index % bentoClasses.length];
            
            return (
              <div 
                key={project.slug} 
                className={`ws-fade-up w-full h-full ${layoutClass}`}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <SelectedWorkCard project={project} className="w-full h-full" />
              </div>
            );
          })}
        </div>

        {/* View All Footer */}
        <div className="ws-fade-up flex justify-center md:justify-end pt-8">
          <Link 
            href="/work"
            className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white/70 hover:text-orange transition-colors"
          >
            <span>VIEW ALL WORK</span>
            <span className="w-8 h-[1px] bg-white/30 group-hover:bg-orange transition-colors" />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
