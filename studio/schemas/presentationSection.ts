import {defineField, defineType} from 'sanity'

export const presentationSection = defineType({
  name: 'presentationSection',
  title: 'Presentation Sections',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Standard list', value: 'standard'},
          {title: 'Compact list', value: 'compact'},
          {title: 'Abstract strip', value: 'abstractStrip'},
        ],
      },
      initialValue: 'standard',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (rule) => rule.required().integer().min(1),
    }),
    defineField({
      name: 'items',
      title: 'Presentation Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'presentationItem',
          title: 'Presentation Item',
          fields: [
            defineField({
              name: 'year',
              title: 'Year',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'venue',
              title: 'Venue',
              type: 'text',
              rows: 2,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'year',
            },
          },
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'eyebrow',
    },
  },
})
