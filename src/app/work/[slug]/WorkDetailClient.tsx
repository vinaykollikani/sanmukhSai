"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useCursor } from "@/hooks/useCursor";
import { Project } from "@/types/project";
import { CustomCursor } from "@/components/layout/CustomCursor";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface WorkDetailClientProps {
  project: Project;
  prevProject: Project;
  nextProject: Project;
}

export function WorkDetailClient({ project, prevProject, nextProject }: WorkDetailClientProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useCursor(containerRef);
  const heroRef = useRef<HTMLDivElement | null>(null);

  // Force scroll restoration
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.slug]);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Hero entrance animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.1 }
      );
    }

    // Scroll reveal-up animation for all .reveal-up elements
    const revealElements = gsap.utils.toArray(".reveal-up") as HTMLElement[];
    
    revealElements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

  }, { scope: containerRef });

  const categoryText = (project.category || "").replace(/\s/g, "");
  const firstWordOfTitle = (project.title || "").split(" ")[0];

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-[#0C0C0C] text-white overflow-x-hidden relative selection:bg-orange selection:text-[#0C0C0C]"
    >
      <CustomCursor />

      {/* Cursor Spotlight */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-0 blur-[90px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "radial-gradient(circle, rgba(243,108,33,0.18) 0%, rgba(243,108,33,0.06) 45%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-16 py-6 flex items-center justify-between bg-gradient-to-b from-[#0C0C0C]/90 to-transparent pointer-events-none">
        <Link
          href="/#work"
          className="group pointer-events-auto flex items-center gap-2 text-[10px] font-sans text-white/50 hover:text-orange uppercase tracking-widest transition-colors duration-300"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span> BACK TO WORK
        </Link>
        <Link href="/" className="pointer-events-auto">
          <div className="text-xl font-black text-orange tracking-tighter flex items-center gap-1.5 drop-shadow-[0_0_10px_rgba(243,108,33,0.3)]">
            SANMUKH<span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
          </div>
        </Link>
      </nav>

      {/* Hero */}
      <header className="relative min-h-[65vh] flex items-end pb-16 px-6 md:px-16 overflow-hidden">
        {/* Background Category Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="text-[18vw] font-black text-white/[0.025] tracking-tight leading-none uppercase whitespace-nowrap font-sans">
            {categoryText}
          </div>
        </div>

        {/* Scanline Texture */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
          style={{
            background: "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 4px)"
          }}
        />

        <div ref={heroRef} className="relative z-10 max-w-5xl w-full pt-28 opacity-0">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-orange bg-orange/10 border border-orange/20 px-3 py-1 rounded">
              {project.category}
            </span>
            <span className="text-[10px] font-sans text-white/50 uppercase tracking-widest">
              {project.category}
            </span>
          </div>

          <h1 className="text-[11vw] md:text-[7vw] font-black tracking-tighter leading-[0.9] uppercase mb-8">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-[11px] font-sans text-white/50 uppercase tracking-widest">
            {project.client && (
              <div className="flex gap-2">
                <span className="text-white/30">{"//"}</span> {project.client}
              </div>
            )}
            {project.timeline && (
              <div className="flex gap-2">
                <span className="text-white/30">{"//"}</span> {project.timeline}
              </div>
            )}
            {project.scope && project.scope.length > 0 && (
              <div className="flex gap-2">
                <span className="text-white/30">{"//"}</span> {project.scope.join(", ")}
              </div>
            )}
            {project.year && (
              <div className="flex gap-2">
                <span className="text-white/30">{"//"}</span> {project.year}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Tags Strip */}
      {project.tags && project.tags.length > 0 && (
        <div className="border-y border-white/5 bg-white/5 px-6 md:px-16 py-4 flex items-center gap-3 flex-wrap">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] font-sans text-white/60 bg-white/5 border border-white/10 px-3 py-1 rounded tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 md:px-16 py-20 space-y-24">
        
        {/* Overview */}
        <div className="reveal-up grid md:grid-cols-[1fr_2fr] gap-12 items-start opacity-0">
          <div className="text-[10px] font-sans text-orange uppercase tracking-widest">
            — Overview
          </div>
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight mb-6">The Brief</h2>
              <p className="text-white/75 text-[15px] leading-relaxed font-sans">
                {project.overview ?? project.description}
              </p>
            </div>
            
            {project.challenge && (
              <div className="pt-12 border-t border-white/5">
                <h2 className="text-2xl font-black uppercase tracking-tight mb-6">The Challenge</h2>
                <p className="text-white/75 text-[15px] leading-relaxed font-sans">
                  {project.challenge}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Main Visual Placeholder */}
        <div className="reveal-up relative w-full aspect-[21/9] rounded-3xl overflow-hidden border border-white/5 opacity-0">
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(1,86,254,0.3) 0%, #0C0C0C 50%, rgba(243,108,33,0.8) 100%)"
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs font-sans text-white/40 uppercase tracking-widest mb-4">Project Visual</span>
            <span className="text-6xl md:text-8xl font-black text-white/10 uppercase tracking-tight">
              {firstWordOfTitle}
            </span>
          </div>

          {/* Corner Marks */}
          <div className="absolute top-6 left-6 w-2 h-2 border-t border-l border-white/30" />
          <div className="absolute top-6 right-6 w-2 h-2 border-t border-r border-white/30" />
          <div className="absolute bottom-6 left-6 w-2 h-2 border-b border-l border-white/30" />
          <div className="absolute bottom-6 right-6 w-2 h-2 border-b border-r border-white/30" />

          {/* Bottom Left Metadata */}
          <div className="absolute bottom-6 left-10 text-[10px] font-sans text-white/40 uppercase tracking-widest">
            {project.category} — {project.category}
          </div>
        </div>

        {/* Deliverables */}
        {(project.structuredDeliverables && project.structuredDeliverables.length > 0) || (project.deliverables && project.deliverables.length > 0) ? (
          <div className="reveal-up opacity-0">
            <div className="flex items-center gap-4 mb-12">
              <span className="text-[10px] font-sans text-orange uppercase tracking-widest whitespace-nowrap">
                — Deliverables
              </span>
              <div className="h-px w-full bg-white/10" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {(project.structuredDeliverables || project.deliverables.map(d => ({ label: d, detail: "" }))).map((item, idx) => (
                <div
                  key={idx}
                  className="group p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between min-h-[120px]"
                >
                  <div className="text-[10px] font-sans text-white/30 mb-4">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="font-bold text-sm tracking-wide uppercase group-hover:text-orange transition-colors">
                      {item.label}
                    </div>
                    {item.detail && (
                      <div className="text-[11px] font-sans text-white/50 mt-2 line-clamp-2">
                        {item.detail}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Secondary Visual Blocks */}
        <div className="reveal-up grid grid-cols-2 gap-4 opacity-0">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5">
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(160deg, rgba(243,108,33,0.8) 0%, #0C0C0C 80%)"
              }}
            />
            <div className="absolute bottom-4 left-4 text-[10px] font-sans text-white/40 uppercase tracking-widest">
              Detail View 01
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5">
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(200deg, rgba(1,86,254,0.3) 0%, #0C0C0C 70%)"
              }}
            />
            <div className="absolute bottom-4 left-4 text-[10px] font-sans text-white/40 uppercase tracking-widest">
              Detail View 02
            </div>
          </div>
        </div>

        {/* Process */}
        {project.process && project.process.length > 0 && (
          <div className="reveal-up opacity-0">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] font-sans text-orange uppercase tracking-widest whitespace-nowrap">
                — Process
              </span>
              <div className="h-px w-full bg-white/10" />
            </div>

            <div>
              {project.process.map((item, idx) => (
                <div
                  key={idx}
                  className="group flex flex-col md:flex-row gap-2 md:gap-12 py-7 border-b border-white/5 hover:border-white/15 transition-colors"
                >
                  <div className="md:w-[15%] text-[10px] font-sans text-white/40 uppercase tracking-widest shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold uppercase tracking-tight mb-2 flex items-center gap-3">
                      {item.title}
                      <span className="w-1.5 h-1.5 rounded-full bg-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-white/60 text-sm font-sans leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Previous / Next Navigation */}
      <div className="border-t border-white/5 mt-8">
        <div className="max-w-5xl mx-auto px-6 md:px-16 py-16 grid grid-cols-2 gap-4">
          
          <Link
            href={`/work/${prevProject.slug}`}
            className="group p-6 rounded-2xl border border-white/5 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 text-left flex flex-col justify-between min-h-[140px]"
          >
            <div className="text-[10px] font-sans text-white/40 uppercase tracking-widest flex items-center gap-2">
              <span className="group-hover:-translate-x-1 transition-transform">←</span> PREVIOUS
            </div>
            <div>
              <div className="text-xl font-black uppercase tracking-tight group-hover:text-orange transition-colors">
                {prevProject.title}
              </div>
              <div className="text-xs font-sans text-white/50 uppercase tracking-widest mt-2">
                {prevProject.category}
              </div>
            </div>
          </Link>

          <Link
            href={`/work/${nextProject.slug}`}
            className="group p-6 rounded-2xl border border-white/5 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 text-right flex flex-col justify-between min-h-[140px]"
          >
            <div className="text-[10px] font-sans text-white/40 uppercase tracking-widest flex items-center justify-end gap-2">
              NEXT <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <div>
              <div className="text-xl font-black uppercase tracking-tight group-hover:text-orange transition-colors">
                {nextProject.title}
              </div>
              <div className="text-xs font-sans text-white/50 uppercase tracking-widest mt-2">
                {nextProject.category}
              </div>
            </div>
          </Link>

        </div>
      </div>

      {/* Back to All Projects */}
      <div className="flex justify-center pb-16">
        <Link
          href="/#work"
          className="group flex items-center gap-4 text-[10px] font-sans uppercase tracking-widest text-white/50 hover:text-white transition-colors"
        >
          <span className="w-6 h-px bg-white/20 group-hover:w-10 group-hover:bg-orange transition-all duration-300" />
          BACK TO ALL PROJECTS
          <span className="w-6 h-px bg-white/20 group-hover:w-10 group-hover:bg-orange transition-all duration-300" />
        </Link>
      </div>

    </main>
  );
}
