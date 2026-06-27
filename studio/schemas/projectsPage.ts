import {defineField, defineType} from 'sanity'
import {heroFields} from './sharedPageFields'

const legacyOrderField = defineField({
  name: 'order',
  title: 'Legacy Order',
  type: 'number',
  hidden: true,
  readOnly: true,
})

export const projectsPage = defineType({
  name: 'projectsPage',
  title: 'Projects Page',
  type: 'document',
  initialValue: {
    hero: {
      eyebrow: 'Research Portfolio',
      title: 'Projects',
      description:
        "Dr. Cash's projects span three connected themes: brain-body interactions in recovery, neuroplasticity and neuromodulation, and behavioral outcomes research.",
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
      name: 'themes',
      title: 'Project Sections',
      type: 'array',
      of: [
        defineField({
          name: 'projectTheme',
          title: 'Project Section',
          type: 'object',
          fields: [
            defineField({
              name: 'anchor',
              title: 'Page Anchor',
              type: 'string',
              description: 'Used for the section link, for example brain-body.',
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            legacyOrderField,
            defineField({
              name: 'projects',
              title: 'Projects',
              type: 'array',
              of: [
                defineField({
                  name: 'project',
                  title: 'Project',
                  type: 'object',
                  fields: [
                    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
                    defineField({
                      name: 'summary',
                      title: 'Summary',
                      type: 'text',
                      rows: 3,
                      validation: (rule) => rule.required(),
                    }),
                    legacyOrderField,
                    defineField({
                      name: 'details',
                      title: 'Details',
                      type: 'array',
                      of: [
                        defineField({
                          name: 'projectDetail',
                          title: 'Project Detail',
                          type: 'object',
                          fields: [
                            defineField({name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required()}),
                            defineField({
                              name: 'value',
                              title: 'Value',
                              type: 'text',
                              rows: 2,
                              validation: (rule) => rule.required(),
                            }),
                          ],
                          preview: {
                            select: {title: 'label', subtitle: 'value'},
                          },
                        }),
                      ],
                    }),
                  ],
                  preview: {
                    select: {title: 'title', subtitle: 'summary'},
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'description'},
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Projects Page'}),
  },
})
