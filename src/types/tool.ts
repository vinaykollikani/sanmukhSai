export interface Tool {
  id: string;
  episode: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  stars?: number;
  proficiency?: number;
  featured?: boolean;
}
