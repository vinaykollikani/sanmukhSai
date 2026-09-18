"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SkillCategory } from "@/types/skill";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SkillsProps {
  categories: SkillCategory[];
}

export function Skills({ categories }: SkillsProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const isDesktop = window.matchMedia("(min-width: 769px)").matches;

      // Desktop Pinned 3D Carousel
      if (isDesktop) {
        const updateCards = (p: number) => {
          cardsRef.current.forEach((card, i) => {
            if (!card) return;

            const offset = i - p;
            const radius = 1800;
            const angleSpread = 18;
            const angle = offset * angleSpread;
            const rad = (angle * Math.PI) / 180;

            const x = Math.sin(rad) * radius;
            const y = radius - Math.cos(rad) * radius;
            const z = -Math.abs(offset) * 50;

            const scale = Math.max(0.4, 1 - Math.abs(offset) * 0.15);
            const opacity = Math.max(0.1, 1 - Math.abs(offset) * 0.3);

            gsap.set(card, {
              x,
              y,
              z,
              scale,
              rotationZ: angle,
              rotationY: 0,
              opacity,
              zIndex: Math.round(100 - Math.abs(offset) * 10),
            });

            if (Math.abs(offset) < 0.5) {
              card.setAttribute("data-active", "true");
            } else {
              card.setAttribute("data-active", "false");
            }

            // Update Background and Text Opacity
            const itemOpacity = Math.max(0, 1 - Math.abs(offset));

            if (bgRefs.current[i]) {
              gsap.set(bgRefs.current[i], {
                opacity: itemOpacity,
                yPercent: 0,
              });
            }
            if (textRefs.current[i]) {
              gsap.set(textRefs.current[i], {
                opacity: itemOpacity,
                yPercent: 0,
              });
            }
          });
        };

        // Initial state
        updateCards(0);

        // ScrollTrigger
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=500%",
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const position = progress * (categories.length - 1);
            updateCards(position);
          },
        });
      } else {
        // Mobile Setup (Grid - handled by CSS)
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section section--skills"
    >


      {/* Giant Typography Layers */}
      {categories.map((_, i) => (
        <div
          key={`text-${i}`}
          ref={(el) => {
            textRefs.current[i] = el;
          }}
          className="skills-bg-wordmark"
          aria-hidden="true"
        >
          <span
            className="skills-bg-text"
            style={{
              WebkitTextStroke:
                i % 2 === 0
                  ? "2px rgba(243,108,33,0.3)"
                  : "2px rgba(255,255,255,0.15)",
            }}
          >
            SKILLS
          </span>
        </div>
      ))}

      {/* Section Header */}
      <header className="skills-header-wrapper">
        <div className="container-wide">
          <div className="skills-header-inner">
            <div className="eyebrow pointer-events-auto">
              <span className="eyebrow-dot" />
              <span className="eyebrow-label">CORE CAPABILITIES</span>
            </div>
            <h2 className="section-heading pointer-events-auto">SKILLS</h2>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div
        ref={containerRef}
        className="skills-stage"
      >
        {categories.map((category, i) => (
          <div
            key={i}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className="skill-card"
          >
            {/* Hover Overlay Wash */}
            <div className="skill-card-gradient" />

            {/* Ambient dot indicator */}
            <div className="skill-card-dot" />

            {/* Header */}
            <div className="skill-card-header">
              <span className="skill-card-tag">
                {category.tag}
              </span>
              <span className="skill-card-index">
                [ 0{i + 1} / 0{categories.length} ]
              </span>
            </div>

            {/* Content */}
            <div className="skill-card-body">
              <h3 className="skill-card-title">
                {category.title}
              </h3>
              <p className="skill-card-desc">
                {category.description}
              </p>
            </div>

            {/* Skills Map */}
            <div className="skill-card-list">
              {category.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="skill-card-item"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
