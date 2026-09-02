import { Tool } from "@/types/tool";

export const tools: Tool[] = [
  {
    id: 't01-e01',
    episode: 'T01 E01',
    category: 'Image Editing & Compositing',
    title: 'Adobe Photoshop',
    description: 'Primary retouching and compositing tool. Used across every packaging, branding, and social creative deliverable — from mockup prep to final export-ready artwork.',
    tags: ['Retouching', 'Mockups', 'Compositing', 'Smart Objects']
  },
  {
    id: 't01-e02',
    episode: 'T01 E02',
    category: 'Vector & Print Design',
    title: 'Adobe Illustrator',
    description: 'Core tool for logo construction, dieline work, and brand identity systems. Every mark, type system, and packaging artwork starts here before going to print or production.',
    tags: ['Logo Design', 'Dielines', 'Brand Marks', 'Print Artwork']
  },
  {
    id: 't01-e03',
    episode: 'T01 E03',
    category: '3D & Visualisation',
    title: 'Blender 3D',
    description: 'Used for photorealistic product renders, 360° spin animations, and pre-production e-commerce visuals. Handles scenes where no physical sample exists yet.',
    tags: ['Product Renders', '360° Spins', 'Lighting']
  },
  {
    id: 't01-e04',
    episode: 'T01 E04',
    category: 'UI & Brand Guidelines',
    title: 'Figma',
    description: 'Used for website UI design, brand guideline documents, and client handoff decks. The go-to for anything that needs to be presented, shared, or built in-browser.',
    tags: ['Website UI', 'Components', 'Prototyping'],
    stars: 4,
    proficiency: 80
  },
  {
    id: 't01-e05',
    episode: 'T01 E05',
    category: 'Motion & Campaign Design',
    title: 'Adobe After Effects',
    description: 'Cut product films, launch reels, and social motion content. Handles transitions, animated overlays, and the motion layer on top of 3D Blender exports.',
    tags: ['Product Film', 'Social Motion', 'Transitions', 'Compositing']
  },
  {
    id: 't01-e06',
    episode: 'T01 E06',
    category: 'Video Editing',
    title: 'Adobe Premiere Pro',
    description: 'Final assembly and colour grading for campaign videos and reel edits. Brings together motion graphics, product footage, and audio into one polished deliverable.',
    tags: ['Video Edit', 'Colour Grade', 'Reel Assembly']
  },
  {
    id: 't01-e07',
    episode: 'T01 E07',
    category: 'Print & Layout',
    title: 'Adobe InDesign',
    description: 'Brand guideline documents, pitch decks, and multi-page print layouts. Handles the production-ready side of deliverables once design is locked in Illustrator.',
    tags: ['Brand Docs', 'Print Layout', 'Multi-Page']
  },
  {
    id: 't01-e08',
    episode: 'T01 E08',
    category: 'Web & Portfolio',
    title: 'Framer',
    description: 'No-code web publishing for portfolio builds and client site launches. Previously the platform of choice before moving to a custom React + Supabase stack.',
    tags: ['Portfolio Sites', 'Interactions', 'No-Code Deploy']
  }
];
