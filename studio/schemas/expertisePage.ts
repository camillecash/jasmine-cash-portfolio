import {defineField, defineType} from 'sanity'

const legacyOrderField = defineField({
  name: 'order',
  title: 'Legacy Order',
  type: 'number',
  hidden: true,
  readOnly: true,
})

export const expertisePage = defineType({
  name: 'expertisePage',
  title: 'Expertise Page',
  type: 'document',
  fields: [
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [
        defineField({
          name: 'skill',
          title: 'Skill',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  {title: 'Chart', value: 'chart'},
                  {title: 'Message', value: 'message'},
                  {title: 'Measure', value: 'measure'},
                  {title: 'Grid', value: 'grid'},
                  {title: 'Data', value: 'data'},
                  {title: 'Person', value: 'person'},
                ],
              },
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
            legacyOrderField,
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'profiles',
      title: 'Education and Research Roles',
      type: 'array',
      of: [
        defineField({
          name: 'profileGroup',
          title: 'Profile Group',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'items',
              title: 'Timeline Items',
              type: 'array',
              of: [
                defineField({
                  name: 'timelineItem',
                  title: 'Timeline Item',
                  type: 'object',
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
                      rows: 2,
                      validation: (rule) => rule.required(),
                    }),
                    legacyOrderField,
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      subtitle: 'date',
                    },
                  },
                }),
              ],
            }),
            legacyOrderField,
          ],
          preview: {
            select: {
              title: 'title',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'scholarly',
      title: 'Scholarly Foundations',
      type: 'array',
      of: [
        defineField({
          name: 'scholarlyItem',
          title: 'Scholarly Item',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
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
            }),
            legacyOrderField,
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'label',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'reviewJournals',
      title: 'Review Journals',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'credentials',
      title: 'Credentials',
      type: 'array',
      of: [
        defineField({
          name: 'credential',
          title: 'Credential',
          type: 'object',
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
              name: 'issuer',
              title: 'Issuer',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'tags',
              title: 'Tags',
              type: 'array',
              of: [{type: 'string'}],
            }),
            legacyOrderField,
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'issuer',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Expertise Page',
    }),
  },
})
