import {createClient} from '@sanity/client'
import fs from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const inputPath = path.resolve(__dirname, '../../_data/home.json')

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

const home = JSON.parse(await fs.readFile(inputPath, 'utf8'))

const document = {
  _id: 'home-page',
  _type: 'homePage',
  hero: {
    ...home.hero,
    actions: (home.hero.actions || []).map((action) => ({
      ...action,
      _key: keyFrom(['hero-action', action.order, action.label]),
    })),
    professionalLinks: (home.hero.professionalLinks || []).map((link) => ({
      ...link,
      _key: keyFrom(['professional-link', link.order, link.label]),
    })),
  },
  about: home.about,
  interests: home.interests,
  researchThemes: {
    ...home.researchThemes,
    items: (home.researchThemes.items || []).map((theme) => ({
      ...theme,
      _key: keyFrom(['research-theme', theme.order, theme.title]),
    })),
  },
}

console.log('Importing home page')
await client.createOrReplace(document)

console.log('Imported 1 home page document.')
