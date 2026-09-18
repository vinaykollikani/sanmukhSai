import type { Metadata } from "next";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { fetchSocialPosts } from "@/lib/data/fetcher";
import { SocialGallery } from "@/components/social/SocialGallery";

export const metadata: Metadata = {
  title: "Social — Sanmukh Sai | Content That Stops The Scroll",
  description:
    "An infinite gallery of social media content, 3D explorations, and brand identity reels.",
};

export default async function SocialPage() {
  const posts = await fetchSocialPosts();

  return (
    <>
      <CustomCursor />
      <SocialGallery posts={posts} />
    </>
  );
}
