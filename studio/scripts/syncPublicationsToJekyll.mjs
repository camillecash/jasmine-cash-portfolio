import {createClient} from '@sanity/client'
import fs from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const outputPath = path.resolve(__dirname, '../../_data/publications.json')

const client = createClient({
  projectId: 'qu5bojff',
  dataset: 'production',
  apiVersion: '2026-06-26',
  useCdn: false,
  perspective: 'published',
  token: process.env.SANITY_READ_TOKEN,
})

const publications = await client.fetch(`
  *[_type == "publication"] | order(order asc) {
    title,
    summary,
    year,
    "doiUrl": doiUrl,
    topics,
    order
  }
`)

if (!publications.length) {
  throw new Error(
    'No publications returned from Sanity. If the dataset is private, set SANITY_READ_TOKEN before running this script.'
  )
}

await fs.mkdir(path.dirname(outputPath), {recursive: true})
await fs.writeFile(outputPath, `${JSON.stringify(publications, null, 2)}\n`)

console.log(`Synced ${publications.length} publication document(s) to ${outputPath}`)
