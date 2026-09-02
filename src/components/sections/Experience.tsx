"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useCursor } from "@/hooks/useCursor";
import { ExperienceItem } from "@/types/experience";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ExperienceProps {
  items: ExperienceItem[];
}

export function Experience({ items }: ExperienceProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const spotlightRef = useCursor(sectionRef);

  useGSAP(() => {
    // We only animate the rows that actually exist
    const rows = rowsRef.current.filter(Boolean);

    if (rows.length === 0) return;

    gsap.fromTo(
      rows,
      {
        y: 28,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative overflow-hidden w-full bg-[#0C0C0C] py-28 md:py-36 text-white"
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

      <div className="max-w-5xl mx-auto px-6 md:px-8 w-full relative z-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20 pb-8 border-b border-white/10">
          <h2 className="font-serif italic text-white text-4xl md:text-5xl leading-[1.15] max-w-md">
            Where the work has taken me.
          </h2>
          <span className="text-sm font-sans text-white/40 shrink-0">
            Three roles, 2023 to present
          </span>
        </div>

        {/* Timeline */}
        <div>
          {items.map((item, index) => (
            <div
              key={index}
              ref={(el) => { rowsRef.current[index] = el; }}
              className="group grid grid-cols-[3rem_1fr] md:grid-cols-[5rem_1fr] gap-4 md:gap-10 py-10 border-b border-white/10 first:pt-0"
            >
              {/* Ordinal */}
              <div className="font-serif text-3xl md:text-4xl text-white/25 pt-1 group-hover:text-orange transition-colors duration-500">
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Content */}
              <div>
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-6 mb-3">
                  <div className="relative inline-block w-fit">
                    <h3 className="font-serif text-2xl md:text-3xl text-white tracking-tight">
                      {item.role}
                    </h3>
                    <span className="absolute left-0 -bottom-1 h-px w-0 bg-orange group-hover:w-full transition-[width] duration-500 ease-out" />
                  </div>
                  <span className="text-xs font-sans text-white/40 tabular-nums shrink-0">
                    {item.period}
                  </span>
                </div>

                <div className="text-sm font-sans text-white/50 mb-4">
                  {item.company}
                </div>

                <p className="font-sans text-white/65 text-sm md:text-base leading-relaxed max-w-xl mb-5">
                  {item.description}
                </p>

                <ul className="mb-5 max-w-xl space-y-2.5">
                  {item.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex gap-3 text-sm font-sans text-white/55 leading-relaxed">
                      <span className="text-orange/70 mt-[2px] shrink-0">–</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-xs font-sans text-white/35">
                  {item.tags.join("  ·  ")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
