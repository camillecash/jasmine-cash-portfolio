import {defineField, defineType} from 'sanity'

const legacyOrderField = defineField({
  name: 'order',
  title: 'Legacy Order',
  type: 'number',
  hidden: true,
  readOnly: true,
})

export const teachingPage = defineType({
  name: 'teachingPage',
  title: 'Teaching Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
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
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 4,
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'object',
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
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 4,
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'positions',
      title: 'Teaching Positions',
      type: 'array',
      of: [
        defineField({
          name: 'teachingPosition',
          title: 'Teaching Position',
          type: 'object',
          fields: [
            defineField({
              name: 'date',
              title: 'Date',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'institution',
              title: 'Institution',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Role',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 4,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'coursesLabel',
              title: 'Courses Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'courses',
              title: 'Courses',
              type: 'array',
              of: [{type: 'string'}],
              validation: (rule) => rule.required().min(1),
            }),
            defineField({
              name: 'featured',
              title: 'Featured',
              type: 'boolean',
              initialValue: false,
            }),
            legacyOrderField,
          ],
          preview: {
            select: {
              title: 'institution',
              subtitle: 'role',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Teaching Page',
    }),
  },
})
