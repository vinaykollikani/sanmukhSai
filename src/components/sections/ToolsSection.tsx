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
  if (title.includes("Photoshop")) return { abrv: "Ps", color: "text-blue-400" };
  if (title.includes("Illustrator")) return { abrv: "Ai", color: "text-orange-300" };
  if (title.includes("Blender")) return { abrv: "Bl", color: "text-orange-400" };
  if (title.includes("Figma")) return { abrv: "Fg", color: "text-pink-300" };
  if (title.includes("After Effects")) return { abrv: "Ae", color: "text-violet-300" };
  if (title.includes("Premiere")) return { abrv: "Pr", color: "text-indigo-300" };
  if (title.includes("InDesign")) return { abrv: "Id", color: "text-rose-300" };
  if (title.includes("Framer")) return { abrv: "Fr", color: "text-cyan-300" };
  
  return { abrv: title.substring(0, 2), color: "text-white" };
};

const ToolLogo = ({ title }: { title: string }) => {
  const { abrv, color } = getToolLogoConfig(title);
  return (
    <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] group-hover:border-orange/40 transition-all duration-500">
      <span className={`text-xl font-black tracking-tight ${color}`}>{abrv}</span>
    </div>
  );
};

const ToolCard = ({ tool }: { tool: Tool }) => {
  return (
    <div className="w-full h-full rounded-3xl overflow-hidden border border-white/15 bg-[#0C0C0C]/95 backdrop-blur-2xl shadow-[0_25px_50px_rgba(0,0,0,0.9)] transition-all duration-500 group relative z-10 p-7 flex flex-col hover:scale-[1.04] hover:border-orange hover:shadow-[0_35px_80px_rgba(243,108,33,0.35)] hover:-translate-y-2">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h4 className="text-[11px] font-sans uppercase tracking-widest text-white/40 mb-2">
            {tool.category}
          </h4>
          <h3 className="text-2xl font-black text-white tracking-tight leading-tight group-hover:text-orange transition-colors duration-300">
            {tool.title}
          </h3>
        </div>
        <ToolLogo title={tool.title} />
      </div>

      <div className="mt-5">
        <p className="text-xs text-white/70 font-light leading-relaxed line-clamp-2 font-sans">
          {tool.description}
        </p>
      </div>

      <div className="mt-auto pt-4 border-t border-white/10">
        <div className="flex flex-wrap gap-1.5 pr-20">
          {tool.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-sans text-white/70 bg-white/5 px-2 py-0.5 rounded">
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
    </div>
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

  const spotlightRef = useCursor(containerRef);

  useGSAP(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    
    // Initial folder state
    gsap.set([folderBackRef.current, folderFrontRef.current], { xPercent: -50, yPercent: -50 });
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

      tl.to(folderFrontRef.current, { rotationX: -130, duration: 1.2, ease: "power3.inOut" })
        .to(desktopCardsRef.current, {
          y: -140,
          scale: 0.9,
          zIndex: 70,
          duration: 0.6,
          stagger: 0.04,
          ease: "back.out(1.2)"
        }, "-=0.6")
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
              stagger: { amount: 1.5, from: "random" }
            });
          }
        });

    } else {
      // Mobile Initial State
      const cardW = window.innerWidth * 0.8;
      const gap = 20;

      mobileCardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.set(card, {
          x: -(i * (cardW + gap)),
          y: 0,
          scale: 0.4,
          opacity: 0,
          rotation: gsap.utils.random(-15, 15),
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        }
      });

      tl.to(folderFrontRef.current, { rotationX: -130, duration: 0.8, ease: "power3.inOut" })
        .to(mobileCardsRef.current, {
          y: -100,
          opacity: 1,
          scale: 0.85,
          duration: 0.6,
          stagger: 0.05,
          ease: "back.out(1.2)"
        }, "-=0.4")
        .to(mobileCardsRef.current, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: (i) => (i === 0 ? 1 : 0.92),
          opacity: (i) => (i === 0 ? 1 : 0.5),
          duration: 0.8,
          stagger: 0.08,
          ease: "expo.out",
          onComplete: () => {
            if (mobileCarouselRef.current) {
              mobileCarouselRef.current.style.overflowX = 'auto';
              mobileCarouselRef.current.style.pointerEvents = 'auto';
            }
          }
        }, "-=0.2");
    }

    return () => {
      floatingTween.current?.kill();
    };
  }, { scope: containerRef });

  return (
    <section
      id="tools"
      ref={containerRef}
      className="bg-[#0C0C0C] min-h-[100svh] md:min-h-[170vh] relative font-sans overflow-hidden text-white w-full flex items-center justify-center py-24 md:py-40 select-none"
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

      {/* Giant Background Title */}
      <div className="absolute top-10 left-0 w-full flex items-start justify-center pointer-events-none z-0">
        <h2 className="text-[14vw] sm:text-[17vw] md:text-[20vw] font-black text-white/[0.03] tracking-tighter leading-none whitespace-nowrap uppercase">
          TOOLS
        </h2>
      </div>

      {/* Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] bg-orange/15 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Main Folder Stage */}
      <div className="mt-12 relative w-full max-w-7xl h-full flex items-center justify-center perspective-[2000px] z-10">
        <div className="relative w-0 h-0 transform-style-3d">
          
          {/* Folder Back */}
          <div
            ref={folderBackRef}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video bg-[#0C0C0C] rounded-[24px] border border-orange/40 shadow-[0_20px_50px_rgba(243,108,33,0.25)] flex items-center justify-center z-[5]"
          >
            <div className="absolute -top-6 left-6 w-32 h-8 bg-[#0C0C0C] rounded-t-xl border-t border-orange/30" />
            <span className="relative z-10 text-orange font-sans font-black text-2xl tracking-widest uppercase opacity-60">
              TOOLS_ARCHIVE
            </span>
          </div>

          {/* Desktop Cards Wrappers */}
          {tools.map((tool, i) => (
            <div
              key={`desktop-${tool.id}`}
              ref={(el) => { desktopCardsRef.current[i] = el; }}
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

      {/* Mobile Carousel */}
      <div
        ref={mobileCarouselRef}
        className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-auto py-12 flex items-center gap-6 page-container pointer-events-none z-[100] snap-x snap-mandatory overflow-x-hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style dangerouslySetInnerHTML={{ __html: `::-webkit-scrollbar { display: none; }` }} />
        {tools.map((tool, i) => (
          <div
            key={`mobile-${tool.id}`}
            ref={(el) => { mobileCardsRef.current[i] = el; }}
            className="shrink-0 w-[78vw] aspect-[16/11] snap-center will-change-transform relative z-10"
          >
            <ToolCard tool={tool} />
          </div>
        ))}
        {/* Right spacing for mobile scrolling */}
        <div className="shrink-0 w-6" aria-hidden="true" />
      </div>
    </section>
  );
}
