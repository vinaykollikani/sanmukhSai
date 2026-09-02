import { createClient } from 'next-sanity';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy-project-id';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

// Client for fetching data
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Since this is a portfolio, fresh data is better. Or true if performance is strict. Let's stick to true for production.
});

// Client for writing data (used by migration script)
export const sanityAdminClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
