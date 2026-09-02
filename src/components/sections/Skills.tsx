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
  const spotlightRef = useCursor(sectionRef);

  useGSAP(() => {
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

          // Update Background and Text Opacity
          const itemOpacity = Math.max(0, 1 - Math.abs(offset));
          if (bgRefs.current[i]) {
            gsap.set(bgRefs.current[i], { opacity: itemOpacity });
          }
          if (textRefs.current[i]) {
            gsap.set(textRefs.current[i], { opacity: itemOpacity });
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
      // Mobile Setup (initialize first card as active)
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const scale = i === 0 ? 1 : 0.9;
        gsap.set(card, { scale });
        
        if (bgRefs.current[i]) {
          gsap.set(bgRefs.current[i], { opacity: i === 0 ? 1 : 0 });
        }
        if (textRefs.current[i]) {
          gsap.set(textRefs.current[i], { opacity: i === 0 ? 1 : 0 });
        }
      });
    }
  }, { scope: sectionRef });

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 769) return;

    const container = e.currentTarget;
    const center = container.scrollLeft + container.offsetWidth / 2;

    let closestIndex = 0;
    let minDiff = Infinity;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const diff = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    });

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const isActive = i === closestIndex;

      gsap.to(card, {
        scale: isActive ? 1 : 0.9,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });

      if (bgRefs.current[i]) {
        gsap.to(bgRefs.current[i], {
          opacity: isActive ? 1 : 0,
          duration: 0.4,
        });
      }

      if (textRefs.current[i]) {
        gsap.to(textRefs.current[i], {
          opacity: isActive ? 1 : 0,
          duration: 0.4,
        });
      }
    });
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#0C0C0C] text-white overflow-hidden flex items-center justify-center select-none md:[perspective:1000px]"
    >
      {/* Global Cursor Spotlight */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-0 blur-[90px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "radial-gradient(circle, rgba(243,108,33,0.18) 0%, rgba(243,108,33,0.06) 45%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Background Layers */}
      {categories.map((_, i) => (
        <div
          key={`bg-${i}`}
          ref={(el) => { bgRefs.current[i] = el; }}
          className="absolute inset-0 z-0 pointer-events-none opacity-0 bg-gradient-to-tr from-black via-orange/10 to-black"
          aria-hidden="true"
        />
      ))}

      {/* Giant Typography Layers */}
      {categories.map((_, i) => (
        <div
          key={`text-${i}`}
          ref={(el) => { textRefs.current[i] = el; }}
          className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none opacity-0"
          aria-hidden="true"
        >
          <span
            className="absolute text-[22vw] md:text-[18vw] font-black uppercase text-transparent leading-none tracking-tighter mix-blend-overlay"
            style={{
              WebkitTextStroke: i % 2 === 0 ? "2px rgba(243,108,33,0.3)" : "2px rgba(255,255,255,0.15)",
            }}
          >
            SKILLS
          </span>
        </div>
      ))}

      {/* Main Container */}
      <div
        ref={containerRef}
        onScroll={handleMobileScroll}
        className="relative w-full h-full flex items-center overflow-x-auto overflow-y-hidden snap-x snap-mandatory touch-pan-x scrollbar-hide page-container px-6 gap-4 md:px-0 md:gap-0 md:justify-center md:z-10 md:[transform-style:preserve-3d] md:overflow-visible"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category, i) => (
          <div
            key={i}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="relative shrink-0 snap-center w-[82vw] sm:w-[360px] h-[460px] md:absolute md:w-[440px] md:h-[540px] rounded-[32px] p-8 md:p-10 bg-[#0C0C0C]/95 backdrop-blur-2xl border border-white/15 flex flex-col justify-between overflow-hidden group shadow-[0_30px_60px_rgba(0,0,0,0.9)] hover:border-orange/80 transition-colors duration-500"
          >
            {/* Hover Overlay Wash */}
            <div className="absolute inset-0 bg-gradient-to-tr from-orange/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />

            {/* Accent Dot */}
            <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-orange transition-all duration-300 group-hover:shadow-[0_0_15px_#F36C21]" />

            {/* Header */}
            <div className="flex items-center justify-between relative z-10">
              <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-orange bg-orange/10 px-3 py-1 rounded border border-orange/20">
                {category.tag}
              </span>
              <span className="text-xs font-sans text-white/40">
                [ 0{i + 1} / 0{categories.length} ]
              </span>
            </div>

            {/* Content */}
            <div className="space-y-4 relative z-10 my-auto">
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight group-hover:text-orange transition-colors duration-300">
                {category.title}
              </h3>
              <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
                {category.description}
              </p>
            </div>

            {/* Skills Map */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 relative z-10">
              {category.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-xs font-sans text-white/80 bg-white/5 border border-white/10 px-3 py-1 rounded transition-colors group-hover:border-orange/30"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
        {/* Right spacing for mobile scrolling */}
        <div className="shrink-0 w-6 md:hidden" aria-hidden="true" />
      </div>
    </section>
  );
}
