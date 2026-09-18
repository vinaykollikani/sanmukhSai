import { Preloader } from "@/components/ui/Preloader";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { SocialSection } from "@/components/sections/SocialSection";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { ToolsSection } from "@/components/sections/ToolsSection";
import { Experience } from "@/components/sections/Experience";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import {
  fetchProjects,
  fetchSocialPosts,
  fetchSkillCategories,
  fetchTools,
  fetchExperience,
  fetchTestimonials,
} from "@/lib/data/fetcher";

export default async function Home() {
  const projects = await fetchProjects();
  const socialPosts = await fetchSocialPosts();
  const skillCategories = await fetchSkillCategories();
  const tools = await fetchTools();
  const experience = await fetchExperience();
  const testimonials = await fetchTestimonials();

  return (
    <>
      {/* <Preloader /> */}
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <WorkSection projects={projects} />
      <SocialSection posts={socialPosts} />
      <About />
      <Skills categories={skillCategories} />
      <ToolsSection tools={tools} />
      <Experience items={experience} />
      <Testimonials testimonials={testimonials} />
      <Contact />
      <Footer />
    </>
  );
}
