import {createClient} from '@sanity/client'
import fs from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const outputPath = path.resolve(__dirname, '../../_data/project_themes.json')

const client = createClient({
  projectId: 'qu5bojff',
  dataset: 'production',
  apiVersion: '2026-06-26',
  useCdn: false,
  perspective: 'published',
  token: process.env.SANITY_READ_TOKEN,
})

const projectThemes = await client.fetch(`
  *[_type == "projectTheme"] | order(order asc) {
    anchor,
    eyebrow,
    title,
    description,
    order,
    "projects": projects[] {
      title,
      summary,
      "details": details[] {
        label,
        value
      }
    }
  }
`)

if (!projectThemes.length) {
  throw new Error(
    'No project themes returned from Sanity. Import/publish Project Themes first, or set SANITY_READ_TOKEN if needed.'
  )
}

await fs.mkdir(path.dirname(outputPath), {recursive: true})
await fs.writeFile(outputPath, `${JSON.stringify(projectThemes, null, 2)}\n`)

console.log(`Synced ${projectThemes.length} project theme document(s) to ${outputPath}`)
