import { ExperienceItem } from "@/types/experience";

type ExperienceSectionProps = {
  experience?: ExperienceItem[];
};

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section id="experience">
      <div className="container mx-auto px-4">
        <h2>ExperienceSection</h2>
      </div>
    </section>
  )
}
