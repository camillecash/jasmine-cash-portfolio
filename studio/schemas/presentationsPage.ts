import {defineField, defineType} from 'sanity'
import {buttonField, heroFields, simpleSectionFields} from './sharedPageFields'

const legacyOrderField = defineField({
  name: 'order',
  title: 'Legacy Order',
  type: 'number',
  hidden: true,
  readOnly: true,
})

export const presentationsPage = defineType({
  name: 'presentationsPage',
  title: 'Presentations Page',
  type: 'document',
  initialValue: {
    hero: {
      eyebrow: 'Conference and Invited Talks',
      title: 'Presentations',
      description:
        'Selected national, international, and invited presentations on stroke recovery, neuromodulation, rehabilitation outcomes, and brain-body interactions',
    },
    summary: {
      eyebrow: 'Selected Highlights',
      title: 'Disseminating research across rehabilitation, neuroscience, and movement science communities',
      description:
        "These selections emphasize recent and representative presentations. Additional abstracts are available in Dr. Cash's CV.",
      actions: [
        {
          label: 'Download CV',
          url: 'assets/cv.pdf',
          style: 'secondary',
          newTab: false,
          download: true,
        },
      ],
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
        buttonField,
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Presentation Sections',
      type: 'array',
      of: [
        defineField({
          name: 'presentationSection',
          title: 'Presentation Section',
          type: 'object',
          fields: [
            defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
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
            legacyOrderField,
            defineField({
              name: 'items',
              title: 'Presentation Items',
              type: 'array',
              of: [
                defineField({
                  name: 'presentationItem',
                  title: 'Presentation Item',
                  type: 'object',
                  fields: [
                    defineField({name: 'year', title: 'Year', type: 'string', validation: (rule) => rule.required()}),
                    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
                    defineField({
                      name: 'venue',
                      title: 'Venue',
                      type: 'text',
                      rows: 2,
                      validation: (rule) => rule.required(),
                    }),
                    legacyOrderField,
                  ],
                  preview: {
                    select: {title: 'title', subtitle: 'year'},
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
    prepare: () => ({title: 'Presentations Page'}),
  },
})
