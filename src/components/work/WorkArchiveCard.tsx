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
  const arrowRef = useRef<HTMLSpanElement>(null);

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
      className="work-archive-card"
    >
      <div className="work-archive-card-image-wrap card-interactive card-bordered">
        <img
          ref={imgRef}
          src={project.cover}
          alt={project.title}
          className="work-archive-card-image"
        />
      </div>
      
      <div className="work-archive-card-content">
        <div className="work-archive-card-header">
          <h3 className="work-archive-card-title">
            {project.title}
          </h3>
          <span ref={arrowRef} className="work-archive-card-arrow">→</span>
        </div>
        
        <div className="work-archive-card-meta">
          <span>{project.category}</span>
          <span className="work-archive-card-dot" />
          <span>{project.year}</span>
        </div>
      </div>
    </Link>
  );
}
