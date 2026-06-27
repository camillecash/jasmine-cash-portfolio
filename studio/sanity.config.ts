import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

import {schemaTypes} from './schemas'

const previewBaseUrl = 'https://preview.jasminecash.com'

function pageForType(type?: string) {
  const map: Record<string, string> = {
    siteSettings: 'home',
    homePage: 'home',
    projectsPage: 'projects',
    projectTheme: 'projects',
    publicationsPage: 'publications',
    publication: 'publications',
    presentationsPage: 'presentations',
    presentationSection: 'presentations',
    expertisePage: 'expertise',
    teachingPage: 'teaching',
    recognitionPage: 'recognition',
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
            S.listItem()
              .title('Home Page')
              .child(S.document().schemaType('homePage').documentId('home-page')),
            S.listItem()
              .title('Projects Page')
              .child(S.document().schemaType('projectsPage').documentId('projects-page')),
            S.listItem()
              .title('Publications Page')
              .child(S.document().schemaType('publicationsPage').documentId('publications-page')),
            S.listItem()
              .title('Presentations Page')
              .child(S.document().schemaType('presentationsPage').documentId('presentations-page')),
            S.listItem()
              .title('Expertise Page')
              .child(S.document().schemaType('expertisePage').documentId('expertise-page')),
            S.listItem()
              .title('Teaching Page')
              .child(S.document().schemaType('teachingPage').documentId('teaching-page')),
            S.listItem()
              .title('Recognition Page')
              .child(S.document().schemaType('recognitionPage').documentId('recognition-page')),
          ]),
    }),
    presentationTool({
      title: 'Preview',
      previewUrl: {
        initial: `${previewBaseUrl}/preview/home`,
      },
      allowOrigins: [
        'https://preview.jasminecash.com',
        'https://jasminecash.com',
        'https://www.jasminecash.com',
        'https://jasmine-cash-portfolio.pages.dev',
        'http://localhost:4321',
        'http://127.0.0.1:4321',
      ],
      resolve: {
        locations: {
          homePage: () => ({
            message: 'Preview this page',
            locations: [{title: 'Home preview', href: `${previewBaseUrl}/preview/home`}],
          }),
          siteSettings: () => ({
            message: 'Preview this page',
            locations: [{title: 'Home preview', href: `${previewBaseUrl}/preview/home`}],
          }),
          projectsPage: () => ({
            message: 'Preview this page',
            locations: [{title: 'Projects preview', href: `${previewBaseUrl}/preview/projects`}],
          }),
          projectTheme: () => ({
            message: 'Preview this page',
            locations: [{title: 'Projects preview', href: `${previewBaseUrl}/preview/projects`}],
          }),
          publicationsPage: () => ({
            message: 'Preview this page',
            locations: [{title: 'Publications preview', href: `${previewBaseUrl}/preview/publications`}],
          }),
          publication: () => ({
            message: 'Preview this page',
            locations: [{title: 'Publications preview', href: `${previewBaseUrl}/preview/publications`}],
          }),
          presentationsPage: () => ({
            message: 'Preview this page',
            locations: [{title: 'Presentations preview', href: `${previewBaseUrl}/preview/presentations`}],
          }),
          presentationSection: () => ({
            message: 'Preview this page',
            locations: [{title: 'Presentations preview', href: `${previewBaseUrl}/preview/presentations`}],
          }),
          expertisePage: () => ({
            message: 'Preview this page',
            locations: [{title: 'Expertise preview', href: `${previewBaseUrl}/preview/expertise`}],
          }),
          teachingPage: () => ({
            message: 'Preview this page',
            locations: [{title: 'Teaching preview', href: `${previewBaseUrl}/preview/teaching`}],
          }),
          recognitionPage: () => ({
            message: 'Preview this page',
            locations: [{title: 'Recognition preview', href: `${previewBaseUrl}/preview/recognition`}],
          }),
          recognitionSection: () => ({
            message: 'Preview this page',
            locations: [{title: 'Recognition preview', href: `${previewBaseUrl}/preview/recognition`}],
          }),
        },
        mainDocuments: [
          {route: '/preview/home', type: 'homePage'},
          {route: '/preview/home', type: 'siteSettings'},
          {route: '/preview/projects', type: 'projectsPage'},
          {route: '/preview/projects', type: 'projectTheme'},
          {route: '/preview/publications', type: 'publicationsPage'},
          {route: '/preview/publications', type: 'publication'},
          {route: '/preview/presentations', type: 'presentationsPage'},
          {route: '/preview/presentations', type: 'presentationSection'},
          {route: '/preview/expertise', type: 'expertisePage'},
          {route: '/preview/teaching', type: 'teachingPage'},
          {route: '/preview/recognition', type: 'recognitionPage'},
          {route: '/preview/recognition', type: 'recognitionSection'},
        ],
      },
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
