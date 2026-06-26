import {createClient} from '@sanity/client'
import fs from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const outputPath = path.resolve(__dirname, '../../_data/expertise.json')

const client = createClient({
  projectId: 'qu5bojff',
  dataset: 'production',
  apiVersion: '2026-06-26',
  useCdn: false,
  perspective: 'published',
  token: process.env.SANITY_READ_TOKEN,
})

const expertise = await client.fetch(`
  *[_type == "expertisePage"][0] {
    "skills": skills[] | order(order asc) {
      icon,
      title,
      description,
      order
    },
    "profiles": profiles[] | order(order asc) {
      title,
      order,
      "items": items[] | order(order asc) {
        date,
        title,
        description,
        order
      }
    },
    "scholarly": scholarly[] | order(order asc) {
      label,
      title,
      description,
      tags,
      order
    },
    reviewJournals,
    "credentials": credentials[] | order(order asc) {
      date,
      title,
      issuer,
      tags,
      order
    }
  }
`)

if (!expertise) {
  throw new Error(
    'No expertise page returned from Sanity. Import/publish the Expertise Page first, or set SANITY_READ_TOKEN if needed.'
  )
}

await fs.mkdir(path.dirname(outputPath), {recursive: true})
await fs.writeFile(outputPath, `${JSON.stringify(expertise, null, 2)}\n`)

console.log(`Synced expertise page data to ${outputPath}`)
