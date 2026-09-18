"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Project } from "@/types/project";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface WorkArchiveCardProps {
  project: Project;
}

export function WorkArchiveCard({ project }: WorkArchiveCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const card = cardRef.current;
    if (!card) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onMouseEnter = () => {
      if (!prefersReducedMotion) {
        gsap.to(imgRef.current, { scale: 1.05, duration: 0.6, ease: "power2.out" });
        gsap.to(arrowRef.current, { x: 4, y: -4, duration: 0.3, ease: "power2.out" });
      }
    };

    const onMouseLeave = () => {
      if (!prefersReducedMotion) {
        gsap.to(imgRef.current, { scale: 1, duration: 0.6, ease: "power2.out" });
        gsap.to(arrowRef.current, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
      }
    };

    card.addEventListener("mouseenter", onMouseEnter);
    card.addEventListener("mouseleave", onMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", onMouseEnter);
      card.removeEventListener("mouseleave", onMouseLeave);
    };
  }, { scope: cardRef });

  return (
    <Link
      ref={cardRef}
      href={`/work/${project.slug}`}
      className="group flex flex-col gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded-xl"
    >
      <div className="card relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden group-hover:[--card-border-color:rgba(243,108,33,0.5)] transition-colors duration-300">
        <img
          ref={imgRef}
          src={project.cover}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="flex flex-col gap-1 px-1">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-black tracking-tight text-white group-hover:text-orange transition-colors duration-300">
            {project.title}
          </h3>
          <svg 
            ref={arrowRef}
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-white/40 group-hover:text-orange transition-colors duration-300 mt-1 shrink-0"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-white/50 uppercase tracking-widest">
          <span>{project.category}</span>
          <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-orange transition-colors duration-300" />
          <span>{project.year}</span>
        </div>
      </div>
    </Link>
  );
}
