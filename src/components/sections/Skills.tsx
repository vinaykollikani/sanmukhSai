"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useCursor } from "@/hooks/useCursor";
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
      className="section section--skills relative w-full h-auto min-h-screen md:h-screen  text-white overflow-hidden flex flex-col md:flex-row items-center justify-center select-none md:[perspective:1000px] py-32 md:py-0"
    >


      {/* Giant Typography Layers */}
      {categories.map((_, i) => (
        <div
          key={`text-${i}`}
          ref={(el) => {
            textRefs.current[i] = el;
          }}
          className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none opacity-0"
          aria-hidden="true"
        >
          <span
            className="absolute text-[22vw] md:text-[18vw] font-black uppercase text-transparent leading-none tracking-tighter mix-blend-overlay"
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
      <header className="section-header absolute top-24 md:top-32 w-full z-20 pointer-events-none">
        <div className="container-wide">
          <div className="flex flex-col items-start space-y-4">
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
        className="skills-stage relative w-full h-full flex flex-col md:flex-row items-center px-6 gap-6 md:gap-0 md:px-0 md:justify-center md:z-10 md:[transform-style:preserve-3d] md:overflow-visible mt-20 md:mt-0"
      >
        {categories.map((category, i) => (
          <div
            key={i}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className="skill-card relative w-full sm:w-[400px] min-h-[460px] md:absolute md:w-[440px] md:h-[540px] rounded-[32px] p-8 md:p-10 bg-background/95 backdrop-blur-2xl border border-white/15 flex flex-col justify-between overflow-hidden group shadow-[0_30px_60px_rgba(0,0,0,0.9)] hover:border-orange/80 data-[active=true]:border-orange/80 transition-colors duration-500"
          >
            {/* Hover Overlay Wash */}
            <div className="absolute inset-0 bg-gradient-to-tr from-orange/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-data-[active=true]:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />

            {/* Accent Dot */}
            <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-orange transition-all duration-300 group-hover:shadow-[0_0_15px_#F36C21] group-data-[active=true]:shadow-[0_0_15px_#F36C21]" />

            {/* Header */}
            <div className="flex items-center justify-between relative z-10">
              <span className="skill-card__tag text-[10px] font-sans font-bold tracking-widest uppercase text-orange bg-orange/10 px-3 py-1 rounded border border-orange/20">
                {category.tag}
              </span>
              <span className="skill-card__index text-xs font-sans text-white/40">
                [ 0{i + 1} / 0{categories.length} ]
              </span>
            </div>

            {/* Content */}
            <div className="space-y-4 relative z-10 my-auto">
              <h3 className="skill-card__title text-3xl md:text-4xl font-black text-white tracking-tight group-hover:text-orange group-data-[active=true]:text-orange transition-colors duration-300">
                {category.title}
              </h3>
              <p className="skill-card__description text-sm md:text-base text-white/70 font-light leading-relaxed">
                {category.description}
              </p>
            </div>

            {/* Skills Map */}
            <div className="skill-card__list flex flex-wrap gap-2 pt-4 border-t border-white/10 relative z-10">
              {category.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-xs font-sans text-white/80 bg-white/5 border border-white/10 px-3 py-1 rounded transition-colors group-hover:border-orange/30 group-data-[active=true]:border-orange/30"
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
