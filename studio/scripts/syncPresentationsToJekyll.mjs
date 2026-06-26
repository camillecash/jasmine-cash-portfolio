import {createClient} from '@sanity/client'
import fs from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const outputPath = path.resolve(__dirname, '../../_data/presentation_sections.json')

const client = createClient({
  projectId: 'qu5bojff',
  dataset: 'production',
  apiVersion: '2026-06-26',
  useCdn: false,
  perspective: 'published',
  token: process.env.SANITY_READ_TOKEN,
})

const presentationSections = await client.fetch(`
  *[_type == "presentationSection"] | order(order asc) {
    eyebrow,
    title,
    layout,
    order,
    "items": items[] | order(order asc) {
      year,
      title,
      venue,
      order
    }
  }
`)

if (!presentationSections.length) {
  throw new Error(
    'No presentation sections returned from Sanity. Import/publish Presentation Sections first, or set SANITY_READ_TOKEN if needed.'
  )
}

await fs.mkdir(path.dirname(outputPath), {recursive: true})
await fs.writeFile(outputPath, `${JSON.stringify(presentationSections, null, 2)}\n`)

console.log(`Synced ${presentationSections.length} presentation section document(s) to ${outputPath}`)
