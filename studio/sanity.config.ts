import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

import {schemaTypes} from './schemas'

const previewBaseUrl = 'https://jasminecash.com'

function pageForType(type?: string) {
  const map: Record<string, string> = {
    siteSettings: 'home',
    homePage: 'home',
    projectTheme: 'projects',
    publication: 'publications',
    presentationSection: 'presentations',
    expertisePage: 'expertise',
    teachingPage: 'teaching',
    recognitionSection: 'recognition',
  }

  return map[type || ''] || 'home'
}

export default defineConfig({
  name: 'jasmineCashPortfolio',
  title: 'Jasmine Cash Portfolio',
  projectId: 'qu5bojff',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(S.document().schemaType('siteSettings').documentId('site-settings')),
            ...S.documentTypeListItems().filter((item) => item.getId() !== 'siteSettings'),
          ]),
    }),
    presentationTool({
      title: 'Preview',
      previewUrl: {
        initial: `${previewBaseUrl}/preview/home`,
      },
      allowOrigins: [
        'https://jasminecash.com',
        'https://www.jasminecash.com',
        'https://jasmine-cash-portfolio.pages.dev',
        'http://localhost:4321',
        'http://127.0.0.1:4321',
      ],
      resolve: {
        mainDocuments: [
          {route: '/preview/home', type: 'homePage'},
          {route: '/preview/home', type: 'siteSettings'},
          {route: '/preview/projects', type: 'projectTheme'},
          {route: '/preview/publications', type: 'publication'},
          {route: '/preview/presentations', type: 'presentationSection'},
          {route: '/preview/expertise', type: 'expertisePage'},
          {route: '/preview/teaching', type: 'teachingPage'},
          {route: '/preview/recognition', type: 'recognitionSection'},
        ],
        locations: (params) => {
          const page = pageForType(params.type)
          return {
            locations: [
              {
                title: `Preview ${page === 'home' ? 'Home' : page[0].toUpperCase() + page.slice(1)}`,
                href: `${previewBaseUrl}/preview/${page}`,
              },
            ],
          }
        },
      },
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
