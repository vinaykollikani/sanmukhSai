import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'cover',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      type: 'string',
      description: 'Optional timeline field for the detail page.',
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'text',
      description: 'Optional challenge description for the detail page.',
    }),
    defineField({
      name: 'scope',
      title: 'Scope',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Optional tags for the detail page.',
    }),
    defineField({
      name: 'deliverables',
      title: 'Deliverables (Strings)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'structuredDeliverables',
      title: 'Structured Deliverables',
      type: 'array',
      description: 'Optional detailed deliverables for the detail page.',
      of: [
        defineField({
          name: 'deliverable',
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string' }),
            defineField({ name: 'detail', type: 'text' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'process',
      title: 'Process Steps',
      type: 'array',
      description: 'Optional process steps for the detail page.',
      of: [
        defineField({
          name: 'processStep',
          type: 'object',
          fields: [
            defineField({ name: 'step', type: 'string' }),
            defineField({ name: 'title', type: 'string' }),
            defineField({ name: 'detail', type: 'text' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      description: 'Optional gallery images for the detail page.',
      of: [
        defineField({
          name: 'galleryItem',
          type: 'object',
          fields: [
            defineField({ name: 'image', type: 'image' }),
            defineField({ name: 'alt', type: 'string' }),
            defineField({ name: 'caption', type: 'string' }),
          ],
        }),
      ],
    }),
  ],
});
