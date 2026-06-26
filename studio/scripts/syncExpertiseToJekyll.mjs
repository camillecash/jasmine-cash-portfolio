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
    "skills": skills[] {
      icon,
      title,
      description
    },
    "profiles": profiles[] {
      title,
      "items": items[] {
        date,
        title,
        description
      }
    },
    "scholarly": scholarly[] {
      label,
      title,
      description,
      tags
    },
    reviewJournals,
    "credentials": credentials[] {
      date,
      title,
      issuer,
      tags
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
