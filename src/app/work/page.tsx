import type { Metadata } from "next";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Navbar }       from "@/components/layout/Navbar";
import { Footer }       from "@/components/layout/Footer";
import { WorkArchive }  from "@/components/work/WorkArchive";
import { fetchProjects } from "@/lib/data/fetcher";

export const metadata: Metadata = {
  title: "Work — Sanmukh Sai | Brand Identity, Packaging & 3D Design",
  description:
    "A collection of identities, packaging systems, 3D visualisations and visual campaigns created for brands across different industries.",
};

/**
 * /work — Editorial Work Archive
 *
 * Server component: fetches project data then passes it to the
 * client-side WorkArchive for filtering and interaction.
 */
export default async function WorkPage() {
  const projects = await fetchProjects();

  return (
    <>
      <CustomCursor />
      <Navbar />
      <WorkArchive projects={projects} />
      <Footer />
    </>
  );
}
