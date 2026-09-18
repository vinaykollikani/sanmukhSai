"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useCursor } from "@/hooks/useCursor";
import { Tool } from "@/types/tool";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const getToolLogoConfig = (title: string) => {
  if (title.includes("Photoshop"))
    return { abrv: "Ps", color: "text-blue-400" };
  if (title.includes("Illustrator"))
    return { abrv: "Ai", color: "text-orange-300" };
  if (title.includes("Blender"))
    return { abrv: "Bl", color: "text-orange-400" };
  if (title.includes("Figma")) return { abrv: "Fg", color: "text-pink-300" };
  if (title.includes("After Effects"))
    return { abrv: "Ae", color: "text-violet-300" };
  if (title.includes("Premiere"))
    return { abrv: "Pr", color: "text-indigo-300" };
  if (title.includes("InDesign")) return { abrv: "Id", color: "text-rose-300" };
  if (title.includes("Framer")) return { abrv: "Fr", color: "text-cyan-300" };

  return { abrv: title.substring(0, 2), color: "text-white" };
};

const ToolLogo = ({ title }: { title: string }) => {
  const { abrv, color } = getToolLogoConfig(title);
  return (
    <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] group-hover:border-orange/40 transition-all duration-500">
      <span className={`text-xl font-black tracking-tight ${color}`}>
        {abrv}
      </span>
    </div>
  );
};

const ToolCard = ({ tool }: { tool: Tool }) => {
  return (
    <article className="card tool-card w-full h-full transition-all duration-500 group relative z-10 p-7 flex flex-col hover:scale-[1.04] hover:[--card-border-color:rgba(243,108,33,1)] hover:shadow-[0_35px_80px_rgba(243,108,33,0.35)] hover:-translate-y-2">
      <div className="tool-card__header flex items-start justify-between gap-6">
        <div>
          <h4 className="tool-card__category text-[11px] font-sans uppercase tracking-widest text-white/40 mb-2">
            {tool.category}
          </h4>
          <h3 className="tool-card__title text-2xl font-black text-white tracking-tight leading-tight group-hover:text-orange transition-colors duration-300">
            {tool.title}
          </h3>
        </div>
        <ToolLogo title={tool.title} />
      </div>

      <div className="tool-card__content mt-5">
        <p className="tool-card__description text-xs text-white/70 font-light leading-relaxed line-clamp-2 font-sans">
          {tool.description}
        </p>
      </div>

      <div className="tool-card__meta mt-auto pt-4 border-t border-white/10">
        <div className="tool-card__tags flex flex-wrap gap-1.5 pr-20">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-sans text-white/70 bg-white/5 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {tool.featured && (
        <div className="absolute bottom-6 right-6 flex flex-col items-center gap-2">
          <span className="text-[9px] font-sans tracking-widest uppercase text-orange">
            FEATURED
          </span>
          <div className="w-2 h-2 rounded-full bg-orange shadow-[0_0_15px_#F36C21]" />
        </div>
      )}
    </article>
  );
};

interface ToolsSectionProps {
  tools: Tool[];
}

export function ToolsSection({ tools }: ToolsSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const folderBackRef = useRef<HTMLDivElement | null>(null);
  const folderFrontRef = useRef<HTMLDivElement | null>(null);
  const desktopCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobileCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobileCarouselRef = useRef<HTMLDivElement | null>(null);
  const floatingTween = useRef<gsap.core.Tween | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;

      // Initial folder state
      gsap.set([folderBackRef.current, folderFrontRef.current], {
        xPercent: -50,
        yPercent: -50,
      });
      gsap.set(folderFrontRef.current, { transformOrigin: "bottom center" });

      if (isDesktop) {
        // Desktop Initial State
        desktopCardsRef.current.forEach((card) => {
          if (!card) return;
          gsap.set(card, {
            xPercent: -50,
            yPercent: -50,
            rotation: gsap.utils.random(-6, 6),
            scale: 0.85,
            x: 0,
            y: 0,
          });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 50%",
            end: "bottom 50%",
            toggleActions: "play reverse play reverse",
            onEnter: () => floatingTween.current?.kill(),
            onLeave: () => floatingTween.current?.kill(),
            onEnterBack: () => floatingTween.current?.kill(),
            onLeaveBack: () => floatingTween.current?.kill(),
          },
        });

        tl.to(folderFrontRef.current, {
          rotationX: -130,
          duration: 1.2,
          ease: "power3.inOut",
        })
          .to(
            desktopCardsRef.current,
            {
              y: -140,
              scale: 0.9,
              zIndex: 70,
              duration: 0.6,
              stagger: 0.04,
              ease: "back.out(1.2)",
            },
            "-=0.6",
          )
          .to(desktopCardsRef.current, {
            x: (i) => {
              let col = 0;
              if (i < 3) col = i;
              else if (i === 3) col = 0;
              else if (i === 4) col = 2;
              else col = i - 5;
              return (col - 1) * (360 + 40);
            },
            y: (i) => {
              let row = 0;
              if (i < 3) row = 0;
              else if (i === 3 || i === 4) row = 1;
              else row = 2;
              return (row - 1) * (240 + 40);
            },
            rotation: () => gsap.utils.random(-3, 3),
            scale: 1,
            duration: 1.4,
            stagger: { amount: 0.4, from: "center" },
            ease: "expo.out",
            onComplete: () => {
              floatingTween.current = gsap.to(desktopCardsRef.current, {
                y: "+=12",
                rotation: "+=1",
                duration: 3.5,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                stagger: { amount: 1.5, from: "random" },
              });
            },
          });
        // Mobile Initial State (No GSAP - pure CSS grid)
        // Cleanup refs if needed, but CSS handles it
      }

      return () => {
        floatingTween.current?.kill();
      };
    },
    { scope: containerRef },
  );

  return (
    <section
      id="tools"
      ref={containerRef}
      className="section section--tools  min-h-[100svh] md:min-h-screen relative font-sans overflow-hidden md:overflow-visible text-white w-full flex flex-col pt-24 pb-20 md:pt-32 md:pb-24 select-none"
    >


      {/* Section Header */}
      <header className="section-header relative w-full z-20 pointer-events-none mb-12 md:mb-20 lg:mb-24">
        <div className="container-wide">
          <div className="flex flex-col items-start space-y-4">
            <div className="eyebrow pointer-events-auto">
              <span className="eyebrow-dot" />
              <span className="eyebrow-label">SOFTWARE & TOOLS</span>
            </div>
            <h2 className="section-heading pointer-events-auto">
              TOOLS
            </h2>
          </div>
        </div>
      </header>


      {/* Main Folder Stage (Desktop Only) */}
      <div className="tools-stage relative w-full h-[600px] md:h-[760px] hidden md:flex items-center justify-center perspective-[2000px] z-10">
        <div className="relative w-0 h-0 transform-style-3d">
          {/* Folder Back */}
          <div
            ref={folderBackRef}
            className="tools-folder absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video  rounded-[24px] border border-orange/40 shadow-[0_20px_50px_rgba(243,108,33,0.25)] flex items-center justify-center z-[5]"
          >
            <div className="absolute -top-6 left-6 w-32 h-8  rounded-t-xl border-t border-orange/30" />
            <span className="relative z-10 text-orange font-sans font-black text-2xl tracking-widest uppercase opacity-60">
              TOOLS_ARCHIVE
            </span>
          </div>

          {/* Desktop Cards Wrappers */}
          {tools.map((tool, i) => (
            <div
              key={`desktop-${tool.id}`}
              ref={(el) => {
                desktopCardsRef.current[i] = el;
              }}
              className="hidden md:block absolute w-[80vw] md:w-[33vw] max-w-[380px] aspect-[16/10] will-change-transform"
              style={{ zIndex: 10 + i }}
            >
              <ToolCard tool={tool} />
            </div>
          ))}

          {/* Folder Front Flap */}
          <div
            ref={folderFrontRef}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video pointer-events-none will-change-transform z-[60]"
          >
            <div className="absolute bottom-0 w-full h-[85%] bg-[#141414] rounded-b-[24px] rounded-t-md shadow-[0_-5px_20px_rgba(0,0,0,0.8)] flex flex-col justify-end p-6 border-t border-orange/40">
              <div className="w-20 h-1.5 bg-white/20 rounded-full mx-auto mb-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Grid */}
      <div className="tools-grid md:hidden container-wide grid grid-cols-1 gap-6 z-20 mt-24 pb-32">
        {tools.map((tool) => (
          <div key={`mobile-${tool.id}`} className="w-full relative z-10">
            <ToolCard tool={tool} />
          </div>
        ))}
      </div>
    </section>
  );
}
