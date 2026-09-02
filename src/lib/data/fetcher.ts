import { sanityClient } from '@/lib/sanity/client';
import * as queries from '@/lib/sanity/queries';

// Local fallbacks
import { siteConfig } from './site';
import { workProjects } from './workProjects';
import { socialPosts } from './socialPosts';
import { skills } from './skills';
import { tools } from './tools';
import { experience } from './experience';
import { testimonials } from './testimonials';

export async function fetchSiteConfig() {
  try {
    const data = await sanityClient.fetch(queries.siteConfigQuery);
    if (data) return data;
  } catch (error) {
    console.warn('Failed to fetch site config from Sanity, using fallback:', (error as Error).message);
  }
  return siteConfig;
}

export async function fetchProjects() {
  try {
    const data = await sanityClient.fetch(queries.projectsQuery);
    if (data && data.length > 0) return data;
  } catch (error) {
    console.warn('Failed to fetch projects from Sanity, using fallback:', (error as Error).message);
  }
  return workProjects;
}

export async function fetchProjectBySlug(slug: string) {
  try {
    const data = await sanityClient.fetch(queries.projectBySlugQuery, { slug });
    if (data) return data;
  } catch (error) {
    console.warn(`Failed to fetch project ${slug} from Sanity, using fallback:`, (error as Error).message);
  }
  return workProjects.find(p => p.slug === slug) || null;
}

export async function fetchSocialPosts() {
  try {
    const data = await sanityClient.fetch(queries.socialPostsQuery);
    if (data && data.length > 0) return data;
  } catch (error) {
    console.warn('Failed to fetch social posts from Sanity, using fallback:', (error as Error).message);
  }
  return socialPosts;
}

export async function fetchSkillCategories() {
  try {
    const data = await sanityClient.fetch(queries.skillCategoriesQuery);
    if (data && data.length > 0) return data;
  } catch (error) {
    console.warn('Failed to fetch skills from Sanity, using fallback:', (error as Error).message);
  }
  return skills;
}

export async function fetchTools() {
  try {
    const data = await sanityClient.fetch(queries.toolsQuery);
    if (data && data.length > 0) return data;
  } catch (error) {
    console.warn('Failed to fetch tools from Sanity, using fallback:', (error as Error).message);
  }
  return tools;
}

export async function fetchExperience() {
  try {
    const data = await sanityClient.fetch(queries.experienceQuery);
    if (data && data.length > 0) return data;
  } catch (error) {
    console.warn('Failed to fetch experience from Sanity, using fallback:', (error as Error).message);
  }
  return experience;
}

export async function fetchTestimonials() {
  try {
    const data = await sanityClient.fetch(queries.testimonialsQuery);
    if (data && data.length > 0) return data;
  } catch (error) {
    console.warn('Failed to fetch testimonials from Sanity, using fallback:', (error as Error).message);
  }
  return testimonials;
}
