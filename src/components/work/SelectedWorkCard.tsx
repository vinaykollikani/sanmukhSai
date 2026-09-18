"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Project } from "@/types/project";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface SelectedWorkCardProps {
  project: Project;
  className?: string;
}

export function SelectedWorkCard({ project, className = "" }: SelectedWorkCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const topImageRef = useRef<HTMLImageElement>(null);
  const bottomImageRef = useRef<HTMLImageElement>(null);

  // Fallback image if no gallery exists
  const secondaryImage = project.gallery?.[0]?.image || project.cover;

  useGSAP(() => {
    const card = cardRef.current;
    if (!card) return;

    // Use a prefers-reduced-motion media query check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onMouseEnter = () => {
      // IMAGE A fades out, IMAGE B scales slightly up while already being behind
      gsap.to(topImageRef.current, {
        opacity: 0,
        duration: prefersReducedMotion ? 0.3 : 0.6,
        ease: "power2.inOut",
      });
      
      if (!prefersReducedMotion) {
        gsap.to(bottomImageRef.current, {
          scale: 1.05,
          duration: 0.8,
          ease: "power2.out",
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to(topImageRef.current, {
        opacity: 1,
        duration: prefersReducedMotion ? 0.3 : 0.6,
        ease: "power2.inOut",
      });
      
      if (!prefersReducedMotion) {
        gsap.to(bottomImageRef.current, {
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        });
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
      className={`card group relative flex flex-col overflow-hidden transition-colors duration-500 hover:[--card-border-color:rgba(255,255,255,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange ${className}`}
    >
      {/* Artwork Container - Fills the card entirely */}
      <div className="absolute inset-0 w-full h-full">
        {/* IMAGE B (Secondary/Hover Image) - Bottom Layer */}
        <img
          ref={bottomImageRef}
          src={secondaryImage}
          alt=""
          role="presentation"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        
        {/* IMAGE A (Cover Image) - Top Layer */}
        <img
          ref={topImageRef}
          src={project.cover}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        
        {/* Very subtle gradient overlay to ensure text legibility if needed, but kept minimal per instructions */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-60" />
      </div>

      {/* Compact Information Box - Sits on top of artwork */}
      <div className="relative z-10 p-5 md:p-6 flex flex-col items-start gap-1">
        <h3 className="text-white font-black text-lg md:text-xl tracking-tight leading-none drop-shadow-md">
          {project.title}
        </h3>
        <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-white/80 uppercase tracking-widest drop-shadow-md">
          <span>{project.category}</span>
          <span className="w-1 h-1 rounded-full bg-orange" />
          <span>{project.year}</span>
        </div>
      </div>
    </Link>
  );
}
