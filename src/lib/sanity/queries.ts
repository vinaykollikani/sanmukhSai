import { groq } from 'next-sanity';

export const siteConfigQuery = groq`
  *[_type == "siteConfig"][0] {
    brand {
      name,
      shortName
    },
    hero {
      designRoles,
      tagline,
      bio,
      years,
      portraitCharacter,
      "portraitPhoto": portraitPhoto.asset->url
    },
    navigation {
      items[] {
        label,
        href
      },
      ctaLabel
    },
    contact {
      email,
      behance,
      instagram
    },
    social {
      behance,
      linkedin,
      instagram
    },
    location,
    footerTagline
  }
`;

export const projectsQuery = groq`
  *[_type == "project"] | order(_createdAt asc) {
    title,
    "slug": slug.current,
    category,
    year,
    client,
    description,
    "cover": cover.asset->url,
    overview,
    scope,
    deliverables
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    category,
    year,
    client,
    description,
    "cover": cover.asset->url,
    overview,
    timeline,
    challenge,
    scope,
    tags,
    deliverables,
    structuredDeliverables[] {
      label,
      detail
    },
    process[] {
      step,
      title,
      detail
    },
    gallery[] {
      "image": image.asset->url,
      alt,
      caption
    }
  }
`;

export const socialPostsQuery = groq`
  *[_type == "socialPost"] | order(_createdAt asc) {
    platform,
    title,
    description,
    "image": image.asset->url,
    type,
    url
  }
`;

export const skillCategoriesQuery = groq`
  *[_type == "skillCategory"] | order(_createdAt asc) {
    title,
    description,
    tag,
    skills
  }
`;

export const toolsQuery = groq`
  *[_type == "tool"] | order(episode asc) {
    id,
    episode,
    category,
    title,
    description,
    tags,
    stars,
    proficiency,
    featured
  }
`;

export const experienceQuery = groq`
  *[_type == "experienceItem"] | order(_createdAt asc) {
    role,
    company,
    period,
    description,
    highlights,
    tags
  }
`;

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(_createdAt asc) {
    text,
    author,
    role,
    project
  }
`;
