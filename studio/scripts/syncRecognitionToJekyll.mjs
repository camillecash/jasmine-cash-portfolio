import {createClient} from '@sanity/client'
import fs from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const outputPath = path.resolve(__dirname, '../../_data/recognition_sections.json')

const client = createClient({
  projectId: 'qu5bojff',
  dataset: 'production',
  apiVersion: '2026-06-26',
  useCdn: false,
  perspective: 'published',
  token: process.env.SANITY_READ_TOKEN,
})

const recognitionSections = await client.fetch(`
  *[_type == "recognitionSection"] | order(order asc) {
    anchor,
    eyebrow,
    title,
    layout,
    open,
    compact,
    order,
    "items": items[] {
      date,
      title,
      description,
      tags
    },
    "cards": cards[] {
      title,
      "bullets": bullets[] {
        date,
        text
      }
    }
  }
`)

if (!recognitionSections.length) {
  throw new Error(
    'No recognition sections returned from Sanity. Import/publish Recognition Sections first, or set SANITY_READ_TOKEN if needed.'
  )
}

await fs.mkdir(path.dirname(outputPath), {recursive: true})
await fs.writeFile(outputPath, `${JSON.stringify(recognitionSections, null, 2)}\n`)

console.log(`Synced ${recognitionSections.length} recognition section document(s) to ${outputPath}`)
