"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Project } from "@/types/project";

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
    "bento-1", // Item 1: Large featured
    "bento-2", // Item 2: Small/Medium
    "bento-3", // Item 3: Small/Medium
    "bento-4", // Item 4: Portrait on mobile, landscape on desktop
    "bento-5", // Item 5: Landscape
    "bento-6", // Item 6: Full width bottom
  ];

  return (
    <section
      id="work"
      ref={sectionRef}
      className="section section--work"
    >
      <div className="container-wide work-container">
        {/* Header */}
        <header className="section-header work-header">
          <div className="ws-fade-up eyebrow mb-6">
            <span className="eyebrow-dot" />
            <span className="eyebrow-label">SELECTED WORK</span>
          </div>

          <h2 className="ws-fade-up section-heading work-heading">
            THIS IS A CURATED SHOWCASE.
          </h2>
        </header>

        {/* Bento Project Grid */}
        <div className="work-bento-grid">
          {orderedProjects.map((project, index) => {
            const layoutClass = bentoClasses[index % bentoClasses.length];
            
            return (
              <div 
                key={project.slug} 
                className={`ws-fade-up bento-item ${layoutClass}`}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <SelectedWorkCard project={project} className="w-full h-full" />
              </div>
            );
          })}
        </div>

        {/* View All Footer */}
        <div className="ws-fade-up work-view-all">
          <Link 
            href="/work"
            className="work-link"
          >
            <span>VIEW ALL WORK</span>
            <span className="work-link-line" />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="work-link-icon">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
