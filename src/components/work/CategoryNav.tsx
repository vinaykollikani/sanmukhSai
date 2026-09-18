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
  active: CategoryKey | null;
  onChange: (key: CategoryKey | null) => void;
  counts?: Record<CategoryKey, number>;
}

export function CategoryNav({ active, onChange, counts }: CategoryNavProps) {
  return (
    <nav aria-label="Filter work by category" className="category-nav">
      <h2 className="category-nav-heading">WORK</h2>
      <ul className="category-nav-list" role="list">
        <li>
          <button
            type="button"
            onClick={() => onChange(null)}
            className={`category-nav-btn ${active === null ? 'is-active' : ''}`}
            aria-current={active === null ? 'page' : undefined}
          >
            All Projects
          </button>
        </li>
        {CATEGORIES.filter(c => c.key !== "ALL").map(category => (
          <li key={category.key}>
            <button
              type="button"
              onClick={() => onChange(category.key)}
              className={`category-nav-btn ${active === category.key ? 'is-active' : ''}`}
              aria-current={active === category.key ? 'page' : undefined}
            >
              {category.label} 
              {counts && counts[category.key] !== undefined && (
                <span className="category-nav-count">[{counts[category.key].toString().padStart(2, '0')}]</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
