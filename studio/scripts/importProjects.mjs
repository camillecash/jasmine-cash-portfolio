import {createClient} from '@sanity/client'
import fs from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const inputPath = path.resolve(__dirname, '../../_data/project_themes.json')

const client = createClient({
  projectId: 'qu5bojff',
  dataset: 'production',
  apiVersion: '2026-06-26',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
})

if (!process.env.SANITY_AUTH_TOKEN) {
  throw new Error('Missing SANITY_AUTH_TOKEN. Create a Sanity write token and run this script with SANITY_AUTH_TOKEN set.')
}

const themes = JSON.parse(await fs.readFile(inputPath, 'utf8'))

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

for (const theme of themes) {
  const projects = theme.projects.map((project) => ({
    ...project,
    _key: keyFrom([theme.anchor, project.order, project.title]),
    details: (project.details || []).map((detail) => ({
      ...detail,
      _key: keyFrom([theme.anchor, project.order, detail.label]),
    })),
  }))

  const document = {
    _id: `project-theme-${theme.anchor}`,
    _type: 'projectTheme',
    anchor: theme.anchor,
    eyebrow: theme.eyebrow,
    title: theme.title,
    description: theme.description,
    order: theme.order,
    projects,
  }

  console.log(`Importing project theme: ${document.title}`)
  await client.createOrReplace(document)
}

console.log(`Imported ${themes.length} project theme document(s).`)
