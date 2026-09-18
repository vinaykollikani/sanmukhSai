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
      className={`card group work-selected-card ${className}`}
    >
      {/* Artwork Container - Fills the card entirely */}
      <div className="work-selected-bg">
        {/* IMAGE B (Secondary/Hover Image) - Bottom Layer */}
        <img
          ref={bottomImageRef}
          src={secondaryImage}
          alt=""
          role="presentation"
          className="work-selected-img"
        />
        
        {/* IMAGE A (Cover Image) - Top Layer */}
        <img
          ref={topImageRef}
          src={project.cover}
          alt={project.title}
          className="work-selected-img"
        />
        
        {/* Very subtle gradient overlay to ensure text legibility if needed, but kept minimal per instructions */}
        <div className="work-selected-overlay" />
      </div>

      {/* Compact Information Box - Sits on top of artwork */}
      <div className="work-selected-content">
        <h3 className="work-selected-title">
          {project.title}
        </h3>
        <div className="work-selected-meta">
          <span>{project.category}</span>
          <span className="work-selected-dot" />
          <span>{project.year}</span>
        </div>
      </div>
    </Link>
  );
}
