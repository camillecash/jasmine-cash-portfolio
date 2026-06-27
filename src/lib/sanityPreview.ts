import {createClient} from '@sanity/client'
import {env} from 'cloudflare:workers'
import staticHome from '../../_data/home.json'
import staticSettings from '../../_data/site_settings.json'
import staticProjectsPage from '../../_data/projects_page.json'
import staticProjectThemes from '../../_data/project_themes.json'
import staticPublicationsPage from '../../_data/publications_page.json'
import staticPublications from '../../_data/publications.json'
import staticPresentationsPage from '../../_data/presentations_page.json'
import staticPresentationSections from '../../_data/presentation_sections.json'
import staticRecognitionPage from '../../_data/recognition_page.json'
import staticRecognitionSections from '../../_data/recognition_sections.json'
import staticExpertise from '../../_data/expertise.json'
import staticTeaching from '../../_data/teaching.json'

const projectId = 'qu5bojff'
const dataset = 'production'
const apiVersion = '2026-06-26'

const defaultSettings = {
  siteTitle: 'Jasmine J. Cash, PhD, CSCS',
  siteTagline: 'Clinical researcher and postdoctoral scholar',
  siteDescription:
    'Postdoctoral scholar studying stroke recovery, neuromodulation, rehabilitation outcomes, and physical function.',
  siteUrl: 'https://jasminecash.com',
  socialImage: 'assets/social-preview.png',
  footerName: 'Jasmine J. Cash, PhD, CSCS',
  footerLinks: [
    {label: 'LinkedIn', url: 'https://www.linkedin.com/in/jasmine-cash/', download: false},
    {label: 'GitHub', url: 'https://github.com/jasminecash', download: false},
    {label: 'CV', url: 'assets/cv.pdf', download: true},
  ],
}

function getToken() {
  return (
    env.SANITY_API_READ_TOKEN ||
    env.SANITY_READ_TOKEN ||
    import.meta.env.SANITY_API_READ_TOKEN ||
    import.meta.env.SANITY_READ_TOKEN
  )
}

function createDraftClient() {
  const token = getToken()

  if (!token) {
    throw new Error('Missing SANITY_API_READ_TOKEN. Add it as a secret environment variable on the Cloudflare preview Worker.')
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    perspective: 'drafts',
    token,
  })
}

export const previewPages = new Set([
  'home',
  'projects',
  'publications',
  'presentations',
  'expertise',
  'teaching',
  'recognition',
])

export function pageForType(type = '') {
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

  return map[type] || 'home'
}

export async function getPreviewData() {
  const client = createDraftClient()

  const [
    settings,
    home,
    projectsPage,
    projectThemes,
    publicationsPage,
    publications,
    presentationsPage,
    presentationSections,
    expertise,
    teaching,
    recognitionPage,
    recognitionSections,
  ] =
    await Promise.all([
      client.fetch(`
        *[_type == "siteSettings"][0] {
          siteTitle,
          siteTagline,
          siteDescription,
          siteUrl,
          "socialImage": coalesce(uploadedSocialImage.asset->url, socialImage),
          footerName,
          "footerLinks": footerLinks[] { label, url, download }
        }
      `),
      client.fetch(`
        *[_type == "homePage"][0] {
          hero {
            eyebrow,
            title,
            description,
            "actions": actions[] { label, url, style },
            "professionalLinks": professionalLinks[] { label, url, download },
            "portrait": {
              "image": coalesce(portrait.uploadedImage.asset->url, portrait.image),
              "alt": portrait.alt,
              "noteTitle": portrait.noteTitle,
              "noteText": portrait.noteText
            }
          },
          about,
          interests,
          researchThemes {
            eyebrow,
            title,
            "items": items[] { title, description, linkLabel, linkUrl }
          }
        }
      `),
      client.fetch(`
        *[_type == "projectsPage"][0] {
          hero { eyebrow, title, description },
          "themes": themes[] {
            anchor,
            eyebrow,
            title,
            description,
            order,
            "projects": projects[] { title, summary, "details": details[] { label, value }, order }
          }
        }
      `),
      client.fetch(`
        *[_type == "projectTheme"] | order(order asc) {
          anchor,
          eyebrow,
          title,
          description,
          order,
          "projects": projects[] { title, summary, "details": details[] { label, value } }
        }
      `),
      client.fetch(`
        *[_type == "publicationsPage"][0] {
          hero {
            eyebrow,
            title,
            description,
            "actions": actions[] { label, url, style, newTab, download }
          },
          "publications": publications[] {
            title,
            summary,
            year,
            "doiUrl": doiUrl,
            topics,
            order
          }
        }
      `),
      client.fetch(`
        *[_type == "publication"] | order(order asc) {
          title,
          summary,
          year,
          "doiUrl": doiUrl,
          topics,
          order
        }
      `),
      client.fetch(`
        *[_type == "presentationsPage"][0] {
          hero { eyebrow, title, description },
          summary {
            eyebrow,
            title,
            description,
            "actions": actions[] { label, url, style, newTab, download }
          },
          "sections": sections[] {
            eyebrow,
            title,
            layout,
            order,
            "items": items[] { year, title, venue, order }
          }
        }
      `),
      client.fetch(`
        *[_type == "presentationSection"] | order(order asc) {
          eyebrow,
          title,
          layout,
          order,
          "items": items[] { year, title, venue }
        }
      `),
      client.fetch(`
        *[_type == "expertisePage"][0] {
          hero { eyebrow, title, description },
          profileSection { eyebrow, title },
          scholarlySection { eyebrow, title, reviewTitle },
          credentialSection { eyebrow, title },
          "skills": skills[] { icon, title, description },
          "profiles": profiles[] { title, "items": items[] { date, title, description } },
          "scholarly": scholarly[] { label, title, description, tags },
          reviewJournals,
          "credentials": credentials[] { date, title, issuer, tags }
        }
      `),
      client.fetch(`
        *[_type == "teachingPage"][0] {
          hero,
          summary,
          "positions": positions[] { date, institution, role, description, coursesLabel, courses, featured }
        }
      `),
      client.fetch(`
        *[_type == "recognitionPage"][0] {
          hero { eyebrow, title, description },
          summary { eyebrow, title, description },
          "sections": sections[] {
            anchor,
            eyebrow,
            title,
            layout,
            open,
            compact,
            order,
            "items": items[] { date, title, description, tags, order },
            "cards": cards[] { title, order, "bullets": bullets[] { date, text, order } }
          }
        }
      `),
      client.fetch(`
        *[_type == "recognitionSection"] | order(order asc) {
          anchor,
          eyebrow,
          title,
          layout,
          open,
          compact,
          order,
          "items": items[] { date, title, description, tags },
          "cards": cards[] { title, "bullets": bullets[] { date, text } }
        }
      `),
    ])

  return {
    settings: {
      ...defaultSettings,
      ...(settings || staticSettings),
      footerLinks: settings?.footerLinks?.length ? settings.footerLinks : staticSettings.footerLinks || defaultSettings.footerLinks,
    },
    home: home || staticHome,
    projectsPage: projectsPage || staticProjectsPage,
    projectThemes: projectsPage?.themes?.length ? projectsPage.themes : projectThemes?.length ? projectThemes : staticProjectThemes,
    publicationsPage: publicationsPage || staticPublicationsPage,
    publications: publicationsPage?.publications?.length
      ? publicationsPage.publications
      : publications?.length
        ? publications
        : staticPublications,
    presentationsPage: presentationsPage || staticPresentationsPage,
    presentationSections: presentationsPage?.sections?.length
      ? presentationsPage.sections
      : presentationSections?.length
        ? presentationSections
        : staticPresentationSections,
    expertise: {
      ...staticExpertise,
      ...(expertise || {}),
      hero: expertise?.hero || staticExpertise.hero,
      profileSection: expertise?.profileSection || staticExpertise.profileSection,
      scholarlySection: expertise?.scholarlySection || staticExpertise.scholarlySection,
      credentialSection: expertise?.credentialSection || staticExpertise.credentialSection,
    },
    teaching: teaching || staticTeaching,
    recognitionPage: recognitionPage || staticRecognitionPage,
    recognitionSections: recognitionPage?.sections?.length
      ? recognitionPage.sections
      : recognitionSections?.length
        ? recognitionSections
        : staticRecognitionSections,
  }
}
