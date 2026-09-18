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
    <div className="relative min-h-screen pt-32 pb-24 bg-background">
      <AtmosphericBg />

      <div className="container-wide relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Left Sidebar Navigation */}
          <aside className="w-full lg:w-1/4 shrink-0">
            <CategoryNav active={activeCategory} onChange={handleCategoryChange} counts={counts} />
          </aside>

          {/* Right Project Grid */}
          <main className="w-full lg:w-3/4 flex-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 opacity-50">
                <p className="text-xl font-bold tracking-tight text-white mb-2">No projects found.</p>
                <p className="text-sm font-display uppercase tracking-widest">New work coming soon.</p>
              </div>
            ) : (
              <div 
                ref={gridRef}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12"
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
