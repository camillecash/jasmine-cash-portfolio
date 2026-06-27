import {defineField, defineType} from 'sanity'

const legacyOrderField = defineField({
  name: 'order',
  title: 'Legacy Order',
  type: 'number',
  hidden: true,
  readOnly: true,
})

export const recognitionSection = defineType({
  name: 'recognitionSection',
  title: 'Recognition Sections',
  type: 'document',
  fields: [
    defineField({
      name: 'anchor',
      title: 'Page Anchor',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
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
          {title: 'List', value: 'list'},
          {title: 'Cards', value: 'cards'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'open',
      title: 'Open by default',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'compact',
      title: 'Compact list style',
      type: 'boolean',
      initialValue: false,
      hidden: ({parent}) => parent?.layout !== 'list',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (rule) => rule.required().integer().min(1),
    }),
    defineField({
      name: 'items',
      title: 'List Items',
      type: 'array',
      hidden: ({parent}) => parent?.layout !== 'list',
      of: [
        {
          type: 'object',
          name: 'recognitionItem',
          title: 'Recognition Item',
          fields: [
            defineField({
              name: 'date',
              title: 'Date',
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
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'tags',
              title: 'Tags',
              type: 'array',
              of: [{type: 'string'}],
              options: {
                layout: 'tags',
              },
            }),
            legacyOrderField,
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'date',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      hidden: ({parent}) => parent?.layout !== 'cards',
      of: [
        {
          type: 'object',
          name: 'recognitionCard',
          title: 'Recognition Card',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'bullets',
              title: 'Bullets',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'recognitionBullet',
                  title: 'Recognition Bullet',
                  fields: [
                    defineField({
                      name: 'date',
                      title: 'Date',
                      type: 'string',
                    }),
                    defineField({
                      name: 'text',
                      title: 'Text',
                      type: 'text',
                      rows: 2,
                      validation: (rule) => rule.required(),
                    }),
                    legacyOrderField,
                  ],
                  preview: {
                    select: {
                      title: 'text',
                      subtitle: 'date',
                    },
                  },
                },
              ],
            }),
            legacyOrderField,
          ],
          preview: {
            select: {
              title: 'title',
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
