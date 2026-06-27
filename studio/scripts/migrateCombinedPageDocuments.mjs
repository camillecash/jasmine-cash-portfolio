import {createClient} from '@sanity/client'

const token = process.env.SANITY_AUTH_TOKEN

if (!token) {
  throw new Error('Missing SANITY_AUTH_TOKEN. Run with `sanity exec scripts/migrateCombinedPageDocuments.mjs --with-user-token`.')
}

const client = createClient({
  projectId: 'qu5bojff',
  dataset: 'production',
  apiVersion: '2026-06-26',
  useCdn: false,
  token,
})

function keyFrom(parts) {
  return parts
    .filter(Boolean)
    .join('-')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
}

function keyedArray(items = [], prefix = 'item', getTitle = (item) => item.title || item.label || item.eyebrow) {
  return items.map((item, index) => ({
    ...item,
    _key: item._key || keyFrom([prefix, item.order || index + 1, getTitle(item)]),
  }))
}

const [
  existingProjectsPage,
  projectThemes,
  existingPublicationsPage,
  publications,
  existingPresentationsPage,
  presentationSections,
  existingRecognitionPage,
  recognitionSections,
] = await Promise.all([
  client.fetch('*[_id == "projects-page"][0]'),
  client.fetch('*[_type == "projectTheme"] | order(order asc) { anchor, eyebrow, title, description, order, "projects": projects[] { title, summary, "details": details[] { label, value }, order } }'),
  client.fetch('*[_id == "publications-page"][0]'),
  client.fetch('*[_type == "publication"] | order(order asc) { title, summary, year, "doiUrl": doiUrl, topics, order }'),
  client.fetch('*[_id == "presentations-page"][0]'),
  client.fetch('*[_type == "presentationSection"] | order(order asc) { eyebrow, title, layout, order, "items": items[] { year, title, venue, order } }'),
  client.fetch('*[_id == "recognition-page"][0]'),
  client.fetch('*[_type == "recognitionSection"] | order(order asc) { anchor, eyebrow, title, layout, open, compact, order, "items": items[] { date, title, description, tags, order }, "cards": cards[] { title, order, "bullets": bullets[] { date, text, order } } }'),
])

const projectsPage = {
  _id: 'projects-page',
  _type: 'projectsPage',
  hero: existingProjectsPage?.hero || {
    eyebrow: 'Research Portfolio',
    title: 'Projects',
    description:
      "Dr. Cash's projects span three connected themes: brain-body interactions in recovery, neuroplasticity and neuromodulation, and behavioral outcomes research.",
  },
  themes: keyedArray(projectThemes, 'project-theme').map((theme) => ({
    ...theme,
    projects: keyedArray(theme.projects, 'project', (project) => project.title).map((project) => ({
      ...project,
      details: keyedArray(project.details, 'project-detail', (detail) => detail.label),
    })),
  })),
}

const publicationsPage = {
  _id: 'publications-page',
  _type: 'publicationsPage',
  hero: existingPublicationsPage?.hero || {
    eyebrow: 'Peer-Reviewed Work',
    title: 'Publications',
    description:
      'Peer-reviewed publications in rehabilitation measurement, neurophysiology, neuromodulation, biomechanics, and stroke recovery',
    actions: [
      {
        _key: 'google-scholar',
        label: 'Google Scholar',
        url: 'https://scholar.google.com/citations?user=A7vh1zEAAAAJ&hl=en&oi=ao',
        style: 'primary',
        newTab: true,
        download: false,
      },
    ],
  },
  publications: keyedArray(publications, 'publication'),
}

const presentationsPage = {
  _id: 'presentations-page',
  _type: 'presentationsPage',
  hero: existingPresentationsPage?.hero || {
    eyebrow: 'Conference and Invited Talks',
    title: 'Presentations',
    description:
      'Selected national, international, and invited presentations on stroke recovery, neuromodulation, rehabilitation outcomes, and brain-body interactions',
  },
  summary: existingPresentationsPage?.summary || {
    eyebrow: 'Selected Highlights',
    title: 'Disseminating research across rehabilitation, neuroscience, and movement science communities',
    description:
      "These selections emphasize recent and representative presentations. Additional abstracts are available in Dr. Cash's CV.",
    actions: [
      {
        _key: 'download-cv',
        label: 'Download CV',
        url: 'assets/cv.pdf',
        style: 'secondary',
        newTab: false,
        download: true,
      },
    ],
  },
  sections: keyedArray(presentationSections, 'presentation-section').map((section) => ({
    ...section,
    items: keyedArray(section.items, 'presentation-item', (item) => item.title),
  })),
}

const recognitionPage = {
  _id: 'recognition-page',
  _type: 'recognitionPage',
  hero: existingRecognitionPage?.hero || {
    eyebrow: 'Recognition',
    title: 'Recognition',
    description: 'Selected grants, honors, leadership roles, service activities, and professional contributions',
  },
  summary: existingRecognitionPage?.summary || {
    eyebrow: 'At a Glance',
    title: 'Funding, leadership, and scholarly service',
    description:
      "Dr. Cash's recognition reflects an emerging independent research program in stroke recovery, neuromodulation, rehabilitation science, and clinical research methods.",
  },
  sections: keyedArray(recognitionSections, 'recognition-section').map((section) => ({
    ...section,
    items: keyedArray(section.items, 'recognition-item', (item) => item.title),
    cards: keyedArray(section.cards, 'recognition-card', (card) => card.title).map((card) => ({
      ...card,
      bullets: keyedArray(card.bullets, 'recognition-bullet', (bullet) => bullet.text),
    })),
  })),
}

for (const document of [projectsPage, publicationsPage, presentationsPage, recognitionPage]) {
  console.log(`Migrating ${document._type}`)
  await client.createOrReplace(document)
}

console.log('Migrated combined page documents.')
