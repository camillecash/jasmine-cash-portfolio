import {createClient} from '@sanity/client'
import fs from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const inputPath = path.resolve(__dirname, '../../_data/presentation_sections.json')

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
  const items = section.items.map((item) => ({
    ...item,
    _key: keyFrom([section.order, item.order, item.title]),
  }))

  const document = {
    _id: `presentation-section-${section.order}-${keyFrom([section.title])}`,
    _type: 'presentationSection',
    eyebrow: section.eyebrow,
    title: section.title,
    layout: section.layout,
    order: section.order,
    items,
  }

  console.log(`Importing presentation section: ${document.title}`)
  await client.createOrReplace(document)
}

console.log(`Imported ${sections.length} presentation section document(s).`)
