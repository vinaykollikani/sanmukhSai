# Sanmukh Sai Portfolio

This repository contains the Next.js portfolio website for **Sanmukh Sai**, a visual designer specializing in brand identity, packaging design, 3D visualization, motion, and campaign design.

## Phase 1: Foundation / Workspace Setup

This repository is currently in **Phase 1**. The core architecture, dependencies, and file structures have been set up, but the actual visual components and animations have **not** been built yet. The placeholders exist to prove the architecture works.

## Technology Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** GSAP + ScrollTrigger
- **CMS:** Sanity
- **Database:** Supabase
- **Media Storage:** Cloudflare R2
- **Email:** Resend
- **Deployment:** Vercel

## Architecture

```text
Next.js
├── App Router
├── Server Components (for layout, static content, data fetching)
├── Client Components (for GSAP, interactivity)
├── TypeScript
└── Tailwind CSS
```

## Folder Structure

- `src/app/` - Next.js App Router pages and layouts.
- `src/components/ui/` - Reusable granular UI components (buttons, cards, etc.).
- `src/components/layout/` - Global layout components (Navbar, Footer, Preloader).
- `src/components/sections/` - Major page sections for the portfolio.
- `src/hooks/` - Custom React hooks for GSAP animations and scroll interactions.
- `src/lib/` - Integration clients (Sanity, Supabase, R2, Resend, etc.).
- `src/sanity/` - Sanity CMS configuration and schema definitions.
- `src/types/` - TypeScript interface definitions for domain models.
- `src/data/` - Placeholder development data.
- `public/` - Static assets (fonts, icons, images).

## Environment Variables

Copy the `.env.example` to `.env.local` and populate the required keys:

```bash
cp .env.example .env.local
```

Required keys include Sanity Project ID, Supabase URL, Cloudflare R2 credentials, and Resend API keys.

## Local Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Available Scripts

- `npm run dev`: Starts the Next.js local development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a production server locally.
- `npm run lint`: Runs ESLint.

## Integrations

- **Sanity Setup:** Schemas are in `src/sanity/schemaTypes`. 
- **Supabase Setup:** The client is initialized in `src/lib/supabase.ts`.
- **Cloudflare R2 Setup:** R2 configuration is in `src/lib/r2.ts`.
- **Vercel Deployment:** The app is configured for Vercel deployment with standard Next.js settings.

## Development Phases

1. **Phase 1:** Workspace Setup (Current) - Architecture, placeholders, dependencies.
2. **Phase 2+:** (Future) - Visual implementation, GSAP animations, Sanity CMS integration, and final content population.
