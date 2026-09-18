"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Project } from "@/types/project";
import { CategoryNav, CategoryKey, CATEGORIES } from "./CategoryNav";
import { WorkArchiveCard } from "./WorkArchiveCard";
import { AtmosphericBg } from "./AtmosphericBg";

gsap.registerPlugin(useGSAP);

const ORDERED_SLUGS = [
  "brewcraft-brand",
  "oribel-packaging",
  "lumio-3d",
  "vanta-identity",
  "terroir-packaging",
  "solace-campaign",
];

const CATEGORY_MAP: Record<CategoryKey, string[]> = {
  ALL:                [],
  "Brand Identity":   ["Brand Identity"],
  "Packaging Design": ["Packaging Design"],
  "3D Visualization": ["3D Visualization"],
  "Campaign Design":  ["Campaign Design"],
  Digital:            [],
};

interface WorkArchiveProps {
  projects: Project[];
}

export function WorkArchive({ projects }: WorkArchiveProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("ALL");

  const ordered = useMemo(() => ORDERED_SLUGS
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is Project => p !== undefined), [projects]);

  const filtered = useMemo(() => 
    activeCategory === "ALL" || activeCategory === "Digital"
      ? ordered
      : ordered.filter((p) => CATEGORY_MAP[activeCategory].includes(p.category)),
  [activeCategory, ordered]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { ALL: ordered.length, "Digital": 0 };
    CATEGORIES.forEach(cat => {
      if (cat.key === "ALL" || cat.key === "Digital") return;
      c[cat.key] = ordered.filter(p => CATEGORY_MAP[cat.key].includes(p.category)).length;
    });
    return c as Record<CategoryKey, number>;
  }, [ordered]);

  const gridRef = useRef<HTMLDivElement>(null);

  const handleCategoryChange = useCallback(
    (key: CategoryKey) => {
      if (key === activeCategory) return;
      const cards = gridRef.current?.querySelectorAll(".wa-card");
      if (!cards?.length) { setActiveCategory(key); return; }
      
      gsap.to(Array.from(cards), {
        opacity: 0, 
        y: -10, 
        scale: 0.98,
        duration: 0.2, 
        ease: "power2.in", 
        stagger: 0.02,
        onComplete: () => {
          setActiveCategory(key);
        },
      });
    },
    [activeCategory]
  );

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".wa-card");
    if (!cards?.length) return;
    
    gsap.fromTo(Array.from(cards),
      { opacity: 0, y: 15, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out", stagger: 0.05, clearProps: "all" }
    );
  }, [activeCategory]);

  return (
    <div className="work-archive-page">
      <AtmosphericBg />
      <div className="container-wide">
        <div className="work-archive-container">
          
          {/* Sidebar */}
          <aside className="work-archive-sidebar">
            <CategoryNav active={activeCategory} onChange={(k) => handleCategoryChange(k as CategoryKey)} counts={counts} />
          </aside>

          {/* Right Project Grid */}
          <main className="work-archive-main">
            
            {filtered.length === 0 ? (
              <div className="work-archive-empty">
                <p className="work-archive-empty-title">No projects found.</p>
                <p className="work-archive-empty-text">New work coming soon.</p>
              </div>
            ) : (
              <div 
                ref={gridRef}
                className="work-archive-grid"
              >
                {filtered.map((project) => (
                  <div key={project.slug} className="wa-card">
                    <WorkArchiveCard project={project} />
                  </div>
                ))}
              </div>
            )}
          </main>
          
        </div>
      </div>
    </div>
  );
}
