"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
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
    <div className="tool-card-icon-wrapper">
      <span className={`tool-card-icon ${color}`}>
        {abrv}
      </span>
    </div>
  );
};

const ToolCard = ({ tool }: { tool: Tool }) => {
  return (
    <article className="card tool-card">
      <div className="tool-card-header">
        <div>
          <h4 className="tool-card-category">
            {tool.category}
          </h4>
          <h3 className="tool-card-title">
            {tool.title}
          </h3>
        </div>
        <ToolLogo title={tool.title} />
      </div>

      <div className="tool-card-content">
        <p className="tool-card-description">
          {tool.description}
        </p>
      </div>

      <div className="tool-card-meta">
        <div className="tool-card-tags">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className="tool-card-tag"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {tool.featured && (
        <div className="tool-card-indicator">
          <span className="tool-card-indicator-text">
            OPEN
          </span>
          <div className="tool-card-dot" />
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
      className="section section--tools"
    >


      {/* Section Header */}
      <header className="tools-header-wrapper">
        <div className="container-wide">
          <div className="tools-header-inner">
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
      <div className="tools-stage">
        <div className="tools-stage-inner">
          {/* Folder Back */}
          <div
            ref={folderBackRef}
            className="tools-folder"
          >
            <div className="tools-folder-tab" />
            <span className="tools-folder-text">
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
              className="tools-laptop-screen"
              style={{ zIndex: 10 + i }}
            >
              <ToolCard tool={tool} />
            </div>
          ))}

          {/* Folder Front Flap */}
          <div
            ref={folderFrontRef}
            className="tools-laptop-keyboard"
          >
            <div className="tools-laptop-base">
              <div className="tools-laptop-trackpad" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Grid */}
      <div className="tools-grid-mobile container-wide">
        {tools.map((tool) => (
          <div key={`mobile-${tool.id}`} className="tools-grid-mobile-item">
            <ToolCard tool={tool} />
          </div>
        ))}
      </div>
    </section>
  );
}
