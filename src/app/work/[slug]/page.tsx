import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchProjects } from "@/lib/data/fetcher";
import { WorkDetailClient } from "./WorkDetailClient";
import { Project } from "@/types/project";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const projects = await fetchProjects();
  const project = projects.find((p: Project) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Sanmukh",
    };
  }

  return {
    title: `${project.title} | Sanmukh`,
    description: project.description,
  };
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const projects = await fetchProjects();

  if (!projects || projects.length === 0) {
    return notFound();
  }

  const currentIndex = projects.findIndex((p: Project) => p.slug === slug);

  if (currentIndex === -1) {
    return (
      <main className="min-h-screen bg-[#0C0C0C] flex flex-col items-center justify-center text-white selection:bg-orange selection:text-[#0C0C0C]">
        <div className="text-[10px] font-sans text-white/50 uppercase tracking-widest mb-4">
          Project Not Found
        </div>
        <Link
          href="/#work"
          className="text-orange text-[10px] font-sans uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> BACK TO WORK
        </Link>
      </main>
    );
  }

  const project = projects[currentIndex];
  
  // Modulo arithmetic for previous/next project logic
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

  return (
    <WorkDetailClient 
      project={project} 
      prevProject={prevProject} 
      nextProject={nextProject} 
    />
  );
}
