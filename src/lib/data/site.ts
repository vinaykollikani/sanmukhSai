import { SiteConfig } from "@/types/site";

export const siteConfig: SiteConfig = {
  brand: {
    name: "SANMUKH SAI",
    shortName: "SANMUKH",
  },
  hero: {
    designRoles: ["Visual Designer", "Art Director"],
    tagline: "Designing Impactful Visual Identities.",
    bio: "I specialize in brand identity, packaging design, and 3D product visualization, creating premium graphic experiences that elevate brands.",
    years: "2020 - 2026",
    portraitCharacter: "Sanmukh Sai",
    portraitPhoto: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
  },
  navigation: {
    items: [
      { label: "Home", href: "#home" },
      { label: "Work", href: "#work" },
      { label: "About", href: "#about" },
      { label: "Skills", href: "#skills" },
      { label: "Social", href: "#social" },
      { label: "Contact", href: "#contact" },
    ],
    ctaLabel: "Get In Touch",
  },
  contact: {
    email: "hello@sanmukhsai.com", // Placeholder
    behance: "https://behance.net/sanmukhsai", // Placeholder
    instagram: "https://instagram.com/sanmukhsai", // Placeholder
  },
  social: {
    behance: "https://behance.net/sanmukhsai", // Placeholder
    linkedin: "https://linkedin.com/in/sanmukhsai", // Placeholder
    instagram: "https://instagram.com/sanmukhsai", // Placeholder
  },
  location: "Rayagada, Odisha, IN",
  footerTagline: "Let's create something extraordinary together.", // Placeholder
};
