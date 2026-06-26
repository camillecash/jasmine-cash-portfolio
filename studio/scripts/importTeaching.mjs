import {createClient} from '@sanity/client'
import fs from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const inputPath = path.resolve(__dirname, '../../_data/teaching.json')

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

const teaching = JSON.parse(await fs.readFile(inputPath, 'utf8'))

const positions = (teaching.positions || []).map((position) => ({
  ...position,
  _key: keyFrom(['teaching-position', position.order, position.institution, position.role]),
}))

const document = {
  _id: 'teaching-page',
  _type: 'teachingPage',
  hero: teaching.hero,
  summary: teaching.summary,
  positions,
}

console.log('Importing teaching page')
await client.createOrReplace(document)

console.log('Imported 1 teaching page document.')
