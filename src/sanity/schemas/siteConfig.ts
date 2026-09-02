import { defineField, defineType } from 'sanity';

export const siteConfig = defineType({
  name: 'siteConfig',
  title: 'Site Configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'object',
      fields: [
        defineField({ name: 'name', type: 'string', title: 'Name' }),
        defineField({ name: 'shortName', type: 'string', title: 'Short Name' }),
      ],
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'designRoles',
          title: 'Design Roles',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({ name: 'tagline', type: 'string', title: 'Tagline' }),
        defineField({ name: 'bio', type: 'text', title: 'Bio' }),
        defineField({ name: 'years', type: 'string', title: 'Years' }),
        defineField({ name: 'portraitCharacter', type: 'string', title: 'Portrait Character Name' }),
        defineField({ name: 'portraitPhoto', type: 'image', title: 'Portrait Photo' }),
      ],
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation',
      type: 'object',
      fields: [
        defineField({
          name: 'items',
          title: 'Navigation Items',
          type: 'array',
          of: [
            defineField({
              name: 'navItem',
              type: 'object',
              fields: [
                defineField({ name: 'label', type: 'string' }),
                defineField({ name: 'href', type: 'string' }),
              ],
            }),
          ],
        }),
        defineField({ name: 'ctaLabel', type: 'string', title: 'CTA Label' }),
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact Info',
      type: 'object',
      fields: [
        defineField({ name: 'email', type: 'string' }),
        defineField({ name: 'behance', type: 'url' }),
        defineField({ name: 'instagram', type: 'url' }),
      ],
    }),
    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({ name: 'behance', type: 'url' }),
        defineField({ name: 'linkedin', type: 'url' }),
        defineField({ name: 'instagram', type: 'url' }),
      ],
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'string',
    }),
  ],
});
