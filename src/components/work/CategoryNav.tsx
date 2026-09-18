"use client";

export const CATEGORIES = [
  { key: "ALL",             label: "ALL" },
  { key: "Brand Identity",  label: "BRAND IDENTITY" },
  { key: "Packaging Design",label: "PACKAGING" },
  { key: "3D Visualization",label: "3D VISUALISATION" },
  { key: "Campaign Design", label: "MOTION & CAMPAIGN" },
  { key: "Digital",         label: "DIGITAL / UI" },
] as const;

export type CategoryKey = (typeof CATEGORIES)[number]["key"];

interface CategoryNavProps {
  active: CategoryKey;
  onChange: (key: CategoryKey) => void;
  counts?: Record<CategoryKey, number>;
}

export function CategoryNav({ active, onChange, counts }: CategoryNavProps) {
  return (
    <nav aria-label="Filter work by category" className="flex flex-col gap-4 sticky top-32">
      <h2 className="text-sm font-bold tracking-[0.2em] text-white/50 mb-4">WORK</h2>
      <ul className="flex flex-col gap-3" role="list">
        {CATEGORIES.map(({ key, label }) => {
          const isActive = active === key;
          const count = counts?.[key];
          
          return (
            <li key={key}>
              <button
                type="button"
                className={`text-left text-sm font-bold tracking-widest uppercase transition-colors duration-300 ${
                  isActive ? "text-orange" : "text-white hover:text-orange/70"
                }`}
                data-active={isActive ? "true" : "false"}
                aria-pressed={isActive}
                onClick={() => onChange(key as CategoryKey)}
              >
                {label} {count !== undefined && <span className="opacity-50 ml-1">[{count.toString().padStart(2, '0')}]</span>}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
