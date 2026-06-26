import {createClient} from '@sanity/client'
import fs from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const inputPath = path.resolve(__dirname, '../../_data/recognition_sections.json')

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

const sections = JSON.parse(await fs.readFile(inputPath, 'utf8'))

for (const section of sections) {
  const items = (section.items || []).map((item) => ({
    ...item,
    _key: keyFrom([section.anchor, item.order, item.title]),
  }))

  const cards = (section.cards || []).map((card) => ({
    ...card,
    _key: keyFrom([section.anchor, card.order, card.title]),
    bullets: (card.bullets || []).map((bullet) => ({
      ...bullet,
      _key: keyFrom([section.anchor, card.order, bullet.order, bullet.date, bullet.text]),
    })),
  }))

  const document = {
    _id: `recognition-section-${section.anchor}`,
    _type: 'recognitionSection',
    anchor: section.anchor,
    eyebrow: section.eyebrow,
    title: section.title,
    layout: section.layout,
    open: section.open,
    compact: section.compact,
    order: section.order,
    items,
    cards,
  }

  console.log(`Importing recognition section: ${document.title}`)
  await client.createOrReplace(document)
}

console.log(`Imported ${sections.length} recognition section document(s).`)
