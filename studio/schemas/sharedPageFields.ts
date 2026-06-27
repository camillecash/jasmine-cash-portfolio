import {defineField} from 'sanity'

export const buttonField = defineField({
  name: 'actions',
  title: 'Buttons',
  type: 'array',
  of: [
    defineField({
      name: 'button',
      title: 'Button',
      type: 'object',
      fields: [
        defineField({name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'url', title: 'URL', type: 'string', validation: (rule) => rule.required()}),
        defineField({
          name: 'style',
          title: 'Style',
          type: 'string',
          options: {
            list: [
              {title: 'Primary', value: 'primary'},
              {title: 'Secondary', value: 'secondary'},
            ],
          },
          initialValue: 'primary',
          validation: (rule) => rule.required(),
        }),
        defineField({name: 'newTab', title: 'Open in New Tab', type: 'boolean', initialValue: false}),
        defineField({name: 'download', title: 'Download Link', type: 'boolean', initialValue: false}),
      ],
      preview: {
        select: {title: 'label', subtitle: 'url'},
      },
    }),
  ],
})

export const heroFields = [
  defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', validation: (rule) => rule.required()}),
  defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
  defineField({
    name: 'description',
    title: 'Description',
    type: 'text',
    rows: 3,
    validation: (rule) => rule.required(),
  }),
]

export const simpleSectionFields = [
  defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', validation: (rule) => rule.required()}),
  defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
]
