export interface SocialPost {
  id: number;
  platform: string;
  title: string;
  description: string;
  cover: string;
  type: 'post' | 'reel';
  url: string;
}
