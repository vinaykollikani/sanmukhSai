"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
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
      className="section section--experience"
    >

      <div className="container-wide relative z-20">
        {/* Header */}
        <header className="section-header experience-header-wrapper">
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
              className="experience-item group"
            >
              {/* Ordinal */}
              <div className="experience-item-index group-hover:text-orange">
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Content */}
              <div className="experience-item-content">
                <div className="experience-item-header">
                  <div className="experience-item-role-wrapper">
                    <h3 className="experience-item-role">
                      {item.role}
                    </h3>
                    <span className="experience-item-role-line" />
                  </div>
                  <span className="experience-item-period">
                    {item.period}
                  </span>
                </div>

                <div className="experience-item-company">
                  {item.company}
                </div>

                <p className="experience-item-description">
                  {item.description}
                </p>

                <ul className="experience-item-highlights">
                  {item.highlights.map((highlight, idx) => (
                    <li key={idx} className="experience-item-highlight">
                      <span className="experience-item-highlight-bullet">–</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="experience-item-tags">
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
