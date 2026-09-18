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
  const rowsRef = useRef<(HTMLLIElement | null)[]>([]);

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
      className="section section--experience relative overflow-hidden w-full  py-28 text-white"
    >

      <div className="container-wide relative z-20">
        {/* Header */}
        <header className="section-header mb-20 pb-8 border-b border-white/10">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            <span className="eyebrow-label">CAREER HISTORY</span>
            <span className="eyebrow-divider">|</span>
            <span className="font-bold">2023 TO PRESENT</span>
          </div>
          <h2 className="section-heading">
            EXPERIENCE
          </h2>
        </header>

        {/* Timeline */}
        <ol className="experience-list">
          {items.map((item, index) => (
            <li
              key={index}
              ref={(el) => { rowsRef.current[index] = el; }}
              className="experience-item group grid grid-cols-[3rem_1fr] md:grid-cols-[5rem_1fr] gap-4 md:gap-10 py-10 border-b border-white/10 first:pt-0"
            >
              {/* Ordinal */}
              <div className="experience-item__index font-serif text-3xl md:text-4xl text-white/25 pt-1 group-hover:text-orange transition-colors duration-500">
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Content */}
              <div className="experience-item__content">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-6 mb-3">
                  <div className="relative inline-block w-fit">
                    <h3 className="experience-item__role font-serif text-2xl md:text-3xl text-white tracking-tight">
                      {item.role}
                    </h3>
                    <span className="absolute left-0 -bottom-1 h-px w-0 bg-orange group-hover:w-full transition-[width] duration-500 ease-out" />
                  </div>
                  <span className="experience-item__period text-xs font-sans text-white/40 tabular-nums shrink-0">
                    {item.period}
                  </span>
                </div>

                <div className="experience-item__company text-sm font-sans text-white/50 mb-4">
                  {item.company}
                </div>

                <p className="experience-item__description font-sans text-white/65 text-sm md:text-base leading-relaxed max-w-xl mb-5">
                  {item.description}
                </p>

                <ul className="experience-item__highlights mb-5 max-w-xl space-y-2.5">
                  {item.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex gap-3 text-sm font-sans text-white/55 leading-relaxed">
                      <span className="text-orange/70 mt-[2px] shrink-0">–</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="experience-item__tags text-xs font-sans text-white/35">
                  {item.tags.join("  ·  ")}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
