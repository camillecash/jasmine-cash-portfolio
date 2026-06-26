import {defineField, defineType} from 'sanity'

export const publication = defineType({
  name: 'publication',
  title: 'Publications',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
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
    defineField({
      name: 'doiUrl',
      title: 'DOI URL',
      type: 'url',
    }),
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (rule) => rule.required().integer().min(1),
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Year, Newest First',
      name: 'yearDesc',
      by: [{field: 'year', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'year',
    },
    prepare({title, subtitle}) {
      return {
        title,
        subtitle: subtitle ? String(subtitle) : 'No year set',
      }
    },
  },
})
