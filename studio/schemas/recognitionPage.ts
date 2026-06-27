import {defineField, defineType} from 'sanity'
import {heroFields, simpleSectionFields} from './sharedPageFields'

const legacyOrderField = defineField({
  name: 'order',
  title: 'Legacy Order',
  type: 'number',
  hidden: true,
  readOnly: true,
})

export const recognitionPage = defineType({
  name: 'recognitionPage',
  title: 'Recognition Page',
  type: 'document',
  initialValue: {
    hero: {
      eyebrow: 'Recognition',
      title: 'Recognition',
      description: 'Selected grants, honors, leadership roles, service activities, and professional contributions',
    },
    summary: {
      eyebrow: 'At a Glance',
      title: 'Funding, leadership, and scholarly service',
      description:
        "Dr. Cash's recognition reflects an emerging independent research program in stroke recovery, neuromodulation, rehabilitation science, and clinical research methods.",
    },
  },
  fields: [
    defineField({
      name: 'hero',
      title: 'Top Intro',
      type: 'object',
      fields: heroFields,
    }),
    defineField({
      name: 'summary',
      title: 'Sidebar Summary',
      type: 'object',
      fields: [
        ...simpleSectionFields,
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Recognition Sections',
      type: 'array',
      of: [
        defineField({
          name: 'recognitionSection',
          title: 'Recognition Section',
          type: 'object',
          fields: [
            defineField({name: 'anchor', title: 'Page Anchor', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
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
            defineField({name: 'open', title: 'Open by default', type: 'boolean', initialValue: false}),
            defineField({
              name: 'compact',
              title: 'Compact list style',
              type: 'boolean',
              initialValue: false,
              hidden: ({parent}) => parent?.layout !== 'list',
            }),
            legacyOrderField,
            defineField({
              name: 'items',
              title: 'List Items',
              type: 'array',
              hidden: ({parent}) => parent?.layout !== 'list',
              of: [
                defineField({
                  name: 'recognitionItem',
                  title: 'Recognition Item',
                  type: 'object',
                  fields: [
                    defineField({name: 'date', title: 'Date', type: 'string', validation: (rule) => rule.required()}),
                    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
                    defineField({
                      name: 'description',
                      title: 'Description',
                      type: 'text',
                      rows: 3,
                      validation: (rule) => rule.required(),
                    }),
                    defineField({name: 'tags', title: 'Tags', type: 'array', of: [{type: 'string'}], options: {layout: 'tags'}}),
                    legacyOrderField,
                  ],
                  preview: {
                    select: {title: 'title', subtitle: 'date'},
                  },
                }),
              ],
            }),
            defineField({
              name: 'cards',
              title: 'Cards',
              type: 'array',
              hidden: ({parent}) => parent?.layout !== 'cards',
              of: [
                defineField({
                  name: 'recognitionCard',
                  title: 'Recognition Card',
                  type: 'object',
                  fields: [
                    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
                    defineField({
                      name: 'bullets',
                      title: 'Bullets',
                      type: 'array',
                      of: [
                        defineField({
                          name: 'recognitionBullet',
                          title: 'Recognition Bullet',
                          type: 'object',
                          fields: [
                            defineField({name: 'date', title: 'Date', type: 'string'}),
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
                            select: {title: 'text', subtitle: 'date'},
                          },
                        }),
                      ],
                    }),
                    legacyOrderField,
                  ],
                  preview: {
                    select: {title: 'title'},
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'eyebrow'},
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Recognition Page'}),
  },
})
