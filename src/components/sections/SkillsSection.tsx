import { SkillCategory } from "@/types/skill";

type SkillsSectionProps = {
  skills?: SkillCategory[];
};

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills">
      <div className="container mx-auto px-4">
        <h2>SkillsSection</h2>
      </div>
    </section>
  )
}
