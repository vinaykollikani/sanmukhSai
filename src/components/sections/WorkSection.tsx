"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Project } from "@/types/project";
import { useCursor } from "@/hooks/useCursor";

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

  // Deterministically sort the projects according to the requested order
  const orderedProjects = ORDERED_SLUGS.map((slug) => 
    projects.find((p) => p.slug === slug)
  ).filter((p): p is Project => p !== undefined);

  // IntersectionObserver for scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ws-visible");
            // Optional: stop observing once it has revealed
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    const elements = document.querySelectorAll(".ws-fade-up");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [projects]); // Re-run if projects array changes

  return (
    <section 
      id="work" 
      ref={sectionRef}
      className="relative w-full py-32 bg-[#0C0C0C] text-white overflow-hidden select-none"
    >
      {/* Decorative Glow 1 */}
      <div 
        className="absolute top-[25%] right-[25%] w-[600px] h-[600px] bg-orange opacity-[0.07] rounded-full blur-[160px] pointer-events-none z-0" 
        aria-hidden="true" 
      />

      {/* Decorative Glow 2 */}
      <div 
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange opacity-[0.05] rounded-full blur-[120px] pointer-events-none z-0" 
        aria-hidden="true" 
      />

      {/* Section Spotlight */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-0 blur-[90px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "radial-gradient(circle, rgba(243,108,33,0.18) 0%, rgba(243,108,33,0.06) 45%, transparent 70%)"
        }}
        aria-hidden="true"
      />

      {/* SELECTED Wordmark */}
      <div 
        className="absolute top-[24px] w-full text-center pointer-events-none overflow-hidden z-0"
        aria-hidden="true"
      >
        <span className="text-[18vw] font-black text-white opacity-[0.02] tracking-tighter uppercase whitespace-nowrap leading-none">
          SELECTED
        </span>
      </div>

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-8 space-y-16">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <div 
            className="ws-fade-up flex flex-col items-center bg-black/40 backdrop-blur-sm border border-orange/20 rounded-lg py-3 px-6"
            style={{ animationDelay: "0ms" }}
          >
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
              <span className="text-orange text-xs font-bold uppercase tracking-widest">
                SELECTED WORK
              </span>
            </div>
            <div className="w-full h-[1px] bg-white/10 my-2" />
            <span className="text-white/60 text-xs font-bold uppercase tracking-widest">
              2023 – 2026
            </span>
          </div>

          <h2 
            className="ws-fade-up text-5xl md:text-7xl font-display font-black tracking-tighter text-white"
            style={{ lineHeight: 0.92, animationDelay: "100ms" }}
          >
            DESIGN THAT SELLS.
          </h2>

          <p 
            className="ws-fade-up text-white/60 font-light text-sm md:text-base max-w-[28rem] leading-relaxed mx-auto font-sans"
            style={{ animationDelay: "200ms" }}
          >
            A selection of brand systems, packaging, and 3D work built for the shelf,
            the listing page, and the scroll.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orderedProjects.map((project, index) => {
            const fallbackBackground = "linear-gradient(135deg, #140803 0%, #0C0C0C 50%, #0a0502 100%)";
            
            return (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="ws-fade-up group relative flex flex-col rounded-xl overflow-hidden border border-white/5 bg-[#0C0C0C]/80 transition-all duration-500 hover:-translate-y-2 hover:border-orange hover:shadow-[0_8px_30px_rgba(243,108,33,0.15)] z-20"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                
                {/* Image Area */}
                <div 
                  className="relative w-full aspect-[4/3] overflow-hidden"
                  style={{ background: fallbackBackground }}
                >
                  {project.cover && (
                    <img
                      src={project.cover}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                    <span className="bg-orange text-[#0C0C0C] font-display font-bold text-xs uppercase tracking-[0.3em] px-6 py-2 rounded shadow-[0_0_15px_rgba(243,108,33,0.5)]">
                      VIEW PROJECT
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-orange text-[#0C0C0C] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded flex items-center gap-2 shadow-[0_0_10px_rgba(243,108,33,0.3)]">
                    <span className="w-1 h-1 bg-[#0C0C0C] rounded-full" />
                    {project.category}
                  </div>

                  {/* Arrow Button */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:rotate-45 group-hover:border-orange">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white transition-colors duration-300 group-hover:text-orange">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                  <h3 className="text-[18px] font-black tracking-tight text-white transition-colors duration-300 group-hover:text-orange">
                    {project.title}
                  </h3>
                  <p className="text-xs text-white/50 font-display leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="px-5 py-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-display text-white/50 uppercase tracking-widest">
                    {project.year} · {project.client}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-orange opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_8px_rgba(243,108,33,0.8)]" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
