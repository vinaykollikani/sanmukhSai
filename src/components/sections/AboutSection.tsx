import { SiteBrand } from "@/types/site";

type AboutSectionProps = {
  config?: SiteBrand;
};

export function AboutSection({ config }: AboutSectionProps) {
  return (
    <section id="about">
      <div className="container mx-auto px-4">
        <h2>AboutSection</h2>
      </div>
    </section>
  )
}
