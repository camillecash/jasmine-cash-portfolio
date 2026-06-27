import {defineField, defineType} from 'sanity'

const legacyOrderField = defineField({
  name: 'order',
  title: 'Legacy Order',
  type: 'number',
  hidden: true,
  readOnly: true,
})

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.required(),
        }),
        defineField({
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
                legacyOrderField,
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
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: {
                select: {title: 'label', subtitle: 'url'},
              },
            }),
          ],
        }),
        defineField({
          name: 'professionalLinks',
          title: 'Professional Links',
          type: 'array',
          of: [
            defineField({
              name: 'professionalLink',
              title: 'Professional Link',
              type: 'object',
              fields: [
                defineField({name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required()}),
                defineField({name: 'url', title: 'URL', type: 'string', validation: (rule) => rule.required()}),
                legacyOrderField,
                defineField({name: 'download', title: 'Download Link', type: 'boolean', initialValue: false}),
              ],
              preview: {
                select: {title: 'label', subtitle: 'url'},
              },
            }),
          ],
        }),
        defineField({
          name: 'portrait',
          title: 'Portrait',
          type: 'object',
          fields: [
            defineField({
              name: 'uploadedImage',
              title: 'Headshot Image',
              type: 'image',
              description: 'Upload a replacement headshot here. If empty, the site uses the current repo image.',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'image',
              title: 'Fallback Image Path',
              type: 'string',
              description: 'Developer fallback path used when no uploaded image is selected.',
              readOnly: true,
              hidden: true,
            }),
            defineField({name: 'alt', title: 'Alt Text', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'noteTitle', title: 'Note Title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'noteText', title: 'Note Text', type: 'string', validation: (rule) => rule.required()}),
          ],
        }),
      ],
    }),
    defineField({
      name: 'about',
      title: 'About',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', validation: (rule) => rule.required()}),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 6,
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'interests',
      title: 'Research Interests',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', validation: (rule) => rule.required()}),
        defineField({
          name: 'items',
          title: 'Items',
          type: 'array',
          of: [{type: 'string'}],
          validation: (rule) => rule.required().min(1),
        }),
      ],
    }),
    defineField({
      name: 'researchThemes',
      title: 'Research Themes',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
        defineField({
          name: 'items',
          title: 'Items',
          type: 'array',
          of: [
            defineField({
              name: 'researchTheme',
              title: 'Research Theme',
              type: 'object',
              fields: [
                defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
                legacyOrderField,
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 3,
                  validation: (rule) => rule.required(),
                }),
                defineField({name: 'linkLabel', title: 'Link Label', type: 'string', validation: (rule) => rule.required()}),
                defineField({name: 'linkUrl', title: 'Link URL', type: 'string', validation: (rule) => rule.required()}),
              ],
              preview: {
                select: {title: 'title', subtitle: 'description'},
              },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Home Page'}),
  },
})
