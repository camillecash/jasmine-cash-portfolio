import {createClient} from '@sanity/client'
import fs from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const outputPath = path.resolve(__dirname, '../../_data/teaching.json')

const client = createClient({
  projectId: 'qu5bojff',
  dataset: 'production',
  apiVersion: '2026-06-26',
  useCdn: false,
  perspective: 'published',
  token: process.env.SANITY_READ_TOKEN,
})

const teaching = await client.fetch(`
  *[_type == "teachingPage"][0] {
    hero {
      eyebrow,
      title,
      description,
      paragraphs
    },
    summary,
    "positions": positions[] {
      date,
      institution,
      role,
      description,
      coursesLabel,
      courses,
      featured
    }
  }
`)

if (!teaching) {
  throw new Error(
    'No teaching page returned from Sanity. Import/publish the Teaching Page first, or set SANITY_READ_TOKEN if needed.'
  )
}

const output = {
  ...teaching,
  hero: {
    ...teaching.hero,
    description: teaching.hero?.description || teaching.hero?.paragraphs?.join(' '),
  },
}
delete output.hero.paragraphs

await fs.mkdir(path.dirname(outputPath), {recursive: true})
await fs.writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`)

console.log(`Synced teaching page data to ${outputPath}`)
