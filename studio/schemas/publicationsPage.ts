import {defineField, defineType} from 'sanity'
import {buttonField, heroFields} from './sharedPageFields'

export const publicationsPage = defineType({
  name: 'publicationsPage',
  title: 'Publications Page',
  type: 'document',
  initialValue: {
    hero: {
      eyebrow: 'Peer-Reviewed Work',
      title: 'Publications',
      description:
        'Peer-reviewed publications in rehabilitation measurement, neurophysiology, neuromodulation, biomechanics, and stroke recovery',
      actions: [
        {
          label: 'Google Scholar',
          url: 'https://scholar.google.com/citations?user=A7vh1zEAAAAJ&hl=en&oi=ao',
          style: 'primary',
          newTab: true,
          download: false,
        },
      ],
    },
  },
  fields: [
    defineField({
      name: 'hero',
      title: 'Top Intro',
      type: 'object',
      fields: [...heroFields, buttonField],
    }),
    defineField({
      name: 'publications',
      title: 'Publication Cards',
      type: 'array',
      of: [
        defineField({
          name: 'publication',
          title: 'Publication',
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
            defineField({
              name: 'year',
              title: 'Year',
              type: 'number',
              validation: (rule) => rule.required().integer().min(1900).max(2100),
            }),
            defineField({name: 'doiUrl', title: 'DOI URL', type: 'url'}),
            defineField({
              name: 'topics',
              title: 'Topics',
              type: 'array',
              of: [{type: 'string'}],
              options: {layout: 'tags'},
            }),
            defineField({name: 'order', title: 'Legacy Order', type: 'number', hidden: true, readOnly: true}),
          ],
          preview: {
            select: {title: 'title', subtitle: 'year'},
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Publications Page'}),
  },
})
