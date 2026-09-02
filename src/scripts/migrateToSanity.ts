import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Setup Sanity Admin Client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

if (!process.env.SANITY_API_TOKEN) {
  console.error("Missing SANITY_API_TOKEN in .env.local");
  process.exit(1);
}

// Import local data
import { siteConfig } from '../lib/data/site';
import { workProjects } from '../lib/data/workProjects';
import { socialPosts } from '../lib/data/socialPosts';
import { skills } from '../lib/data/skills';
import { tools } from '../lib/data/tools';
import { experience } from '../lib/data/experience';
import { testimonials } from '../lib/data/testimonials';

async function uploadImageFromUrl(url: string) {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const asset = await client.assets.upload('image', Buffer.from(buffer), {
      filename: 'migration-placeholder.jpg',
    });
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.error(`Failed to upload image ${url}:`, error);
    return undefined;
  }
}

async function migrate() {
  console.log('Starting migration...');

  // 1. Site Config
  console.log('Migrating Site Config...');
  const heroPhotoRef = siteConfig.hero.portraitPhoto 
    ? await uploadImageFromUrl(siteConfig.hero.portraitPhoto) 
    : undefined;

  await client.createOrReplace({
    _id: 'siteConfig',
    _type: 'siteConfig',
    ...siteConfig,
    hero: {
      ...siteConfig.hero,
      portraitPhoto: heroPhotoRef
    }
  });

  // 2. Projects
  console.log('Migrating Projects...');
  for (const project of workProjects) {
    const coverRef = project.cover ? await uploadImageFromUrl(project.cover) : undefined;
    await client.create({
      _type: 'project',
      ...project,
      slug: { _type: 'slug', current: project.slug },
      cover: coverRef,
      // For arrays/objects that might be undefined, Sanity handles them gracefully if omitted
    });
    console.log(`- Migrated ${project.slug}`);
  }

  // 3. Social Posts
  console.log('Migrating Social Posts...');
  for (const post of socialPosts) {
    const imageRef = post.cover ? await uploadImageFromUrl(post.cover) : undefined;
    await client.create({
      _type: 'socialPost',
      ...post,
      image: imageRef,
    });
    console.log(`- Migrated ${post.title}`);
  }

  // 4. Skills
  console.log('Migrating Skills...');
  for (const skill of skills) {
    await client.create({
      _type: 'skillCategory',
      ...skill,
    });
    console.log(`- Migrated ${skill.title}`);
  }

  // 5. Tools
  console.log('Migrating Tools...');
  for (const tool of tools) {
    await client.create({
      _type: 'tool',
      ...tool,
    });
    console.log(`- Migrated ${tool.title}`);
  }

  // 6. Experience
  console.log('Migrating Experience...');
  for (const exp of experience) {
    await client.create({
      _type: 'experienceItem',
      ...exp,
    });
    console.log(`- Migrated ${exp.role} at ${exp.company}`);
  }

  // 7. Testimonials
  console.log('Migrating Testimonials...');
  for (const test of testimonials) {
    await client.create({
      _type: 'testimonial',
      ...test,
    });
    console.log(`- Migrated ${test.author}`);
  }

  console.log('Migration complete!');
}

migrate().catch(console.error);
