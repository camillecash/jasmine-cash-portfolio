import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Jasmine J. Cash, PhD, CSCS',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'siteTagline',
      title: 'Site Tagline',
      type: 'string',
      initialValue: 'Clinical researcher and postdoctoral scholar',
      description: 'Short line shown under the name in the site header.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Postdoctoral scholar studying stroke recovery, neuromodulation, rehabilitation outcomes, and physical function.',
      description: 'Default SEO/social sharing description for the site.',
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      initialValue: 'https://jasminecash.com',
      description: 'Primary public website URL, without a trailing slash.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'uploadedSocialImage',
      title: 'Social Preview Image',
      type: 'image',
      description: 'Upload the image shown when the website is shared. If empty, the site uses the current repo image.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'socialImage',
      title: 'Fallback Social Preview Image Path',
      type: 'string',
      initialValue: 'assets/social-preview.png',
      description: 'Developer fallback path used when no uploaded social preview image is selected.',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'footerName',
      title: 'Footer Name',
      type: 'string',
      initialValue: 'Jasmine J. Cash, PhD, CSCS',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer Links',
      description: 'Drag links to reorder them. These appear in the footer across the site.',
      type: 'array',
      of: [
        defineField({
          name: 'footerLink',
          title: 'Footer Link',
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'url', title: 'URL', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'download', title: 'Download Link', type: 'boolean', initialValue: false}),
          ],
          preview: {
            select: {title: 'label', subtitle: 'url'},
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
    },
  },
})
