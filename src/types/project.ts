export interface Deliverable {
  label: string;
  detail: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  detail: string;
}

export interface ProjectImage {
  image: string;
  alt: string;
  caption?: string;
}

export interface Project {
  // Required fields for WorkSection
  slug: string;
  title: string;
  category: string;
  year: string;
  client: string;
  description: string;
  cover: string; // URL or static path
  overview: string;
  scope: string[];
  deliverables: string[];
  
  // Optional fields for WorkDetailPage
  timeline?: string;
  tags?: string[];
  challenge?: string;
  structuredDeliverables?: Deliverable[];
  process?: ProcessStep[];
  gallery?: ProjectImage[];
}
