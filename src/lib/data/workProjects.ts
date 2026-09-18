import { Project } from "@/types/project";

export const workProjects: Project[] = [
  {
    slug: "brewcraft-brand",
    title: "Brewcraft Brand",
    category: "Brand Identity",
    year: "2023",
    client: "Brewcraft",
    description: "A comprehensive brand identity for a modern craft brewery, balancing heritage and contemporary design.",
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    overview: "Brewcraft needed a visual identity that stood out on crowded shelves while communicating their commitment to quality ingredients.",
    scope: ["Brand Identity", "Packaging", "Art Direction"],
    deliverables: ["Logo Design", "Brand Guidelines", "Can Labels"],
    gallery: [
      { image: "https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?q=80&w=2564&auto=format&fit=crop", alt: "Brewcraft packaging detail" },
      { image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=2564&auto=format&fit=crop", alt: "Brewcraft lifestyle" }
    ],
  },
  {
    slug: "oribel-packaging",
    title: "Oribel Packaging",
    category: "Packaging Design",
    year: "2024",
    client: "Oribel",
    description: "Premium, sustainable packaging design for a luxury skincare line emphasizing natural ingredients.",
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    overview: "The packaging design for Oribel reflects the purity of their products using minimalist typography and eco-friendly materials.",
    scope: ["Packaging Design", "3D Visualization"],
    deliverables: ["Primary Packaging", "Secondary Packaging", "3D Renders"],
    gallery: [
      { image: "https://images.unsplash.com/photo-1556228720-192a6af4e661?q=80&w=2564&auto=format&fit=crop", alt: "Oribel box open" },
      { image: "https://images.unsplash.com/photo-1608248593842-8d7653606f71?q=80&w=2564&auto=format&fit=crop", alt: "Oribel bottle detail" }
    ],
  },
  {
    slug: "lumio-3d",
    title: "Lumio 3D",
    category: "3D Visualization",
    year: "2023",
    client: "Lumio",
    description: "High-end 3D product visualizations and animations for a smart lighting startup.",
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    overview: "Creating photorealistic 3D environments to showcase the Lumio smart lamp in various architectural contexts.",
    scope: ["3D Modeling", "Rendering", "Motion Design"],
    deliverables: ["Key Visuals", "Product Animation", "Social Media Assets"],
    gallery: [
      { image: "https://images.unsplash.com/photo-1563810842777-62e5b64249a0?q=80&w=2564&auto=format&fit=crop", alt: "Lumio lamp side view" }
    ],
  },
  {
    slug: "vanta-identity",
    title: "Vanta Identity",
    category: "Brand Identity",
    year: "2022",
    client: "Vanta",
    description: "A bold, dark-mode-first identity for a cyber-security firm.",
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    overview: "Vanta's identity was designed to communicate trust and cutting-edge technology through a stark, geometric visual language.",
    scope: ["Brand Strategy", "Visual Identity", "Web Design"],
    deliverables: ["Brand Identity System", "Website Design", "Stationery"],
    gallery: [
      { image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop&hue=200", alt: "Vanta brand assets" }
    ],
  },
  {
    slug: "terroir-packaging",
    title: "Terroir Packaging",
    category: "Packaging Design",
    year: "2024",
    client: "Terroir Coffee",
    description: "Artisanal coffee packaging that highlights the origin story of single-estate beans.",
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    overview: "Using tactile paper and topographic illustrations, the Terroir packaging creates a sensory experience before the coffee is even brewed.",
    scope: ["Illustration", "Packaging Design", "Typography"],
    deliverables: ["Coffee Bags", "Shipping Boxes", "Stickers"],
    gallery: [
      { image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=2564&auto=format&fit=crop", alt: "Terroir packaging detail" }
    ],
  },
  {
    slug: "solace-campaign",
    title: "Solace Campaign",
    category: "Campaign Design",
    year: "2023",
    client: "Solace App",
    description: "An integrated digital campaign for a mental wellness application.",
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    overview: "The Solace campaign focused on bringing calmness and clarity through soft gradients, gentle motion, and empathetic typography.",
    scope: ["Campaign Strategy", "Motion Graphics", "Social Media"],
    deliverables: ["Digital Ads", "App Store Preview Videos", "Social Posts"],
    gallery: [
      { image: "https://images.unsplash.com/photo-1505322022379-7c3353ee6291?q=80&w=2564&auto=format&fit=crop", alt: "Solace campaign still" }
    ],
  }
];
