import {createClient} from '@sanity/client'
import fs from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const client = createClient({
  projectId: 'qu5bojff',
  dataset: 'production',
  apiVersion: '2026-06-26',
  useCdn: false,
  perspective: 'published',
  token: process.env.SANITY_READ_TOKEN,
})

const pageDocuments = [
  {
    type: 'projectsPage',
    file: 'projects_page.json',
    query:
      '*[_type == "projectsPage"][0] { hero { eyebrow, title, description }, "themes": themes[] { anchor, eyebrow, title, description, order, "projects": projects[] { title, summary, "details": details[] { label, value }, order } } }',
  },
  {
    type: 'publicationsPage',
    file: 'publications_page.json',
    query:
      '*[_type == "publicationsPage"][0] { hero { eyebrow, title, description, "actions": actions[] { label, url, style, newTab, download } }, "publications": publications[] { title, summary, year, "doiUrl": doiUrl, topics, order } }',
  },
  {
    type: 'presentationsPage',
    file: 'presentations_page.json',
    query:
      '*[_type == "presentationsPage"][0] { hero { eyebrow, title, description }, summary { eyebrow, title, description, "actions": actions[] { label, url, style, newTab, download } }, "sections": sections[] { eyebrow, title, layout, order, "items": items[] { year, title, venue, order } } }',
  },
  {
    type: 'recognitionPage',
    file: 'recognition_page.json',
    query:
      '*[_type == "recognitionPage"][0] { hero { eyebrow, title, description }, summary { eyebrow, title, description }, "sections": sections[] { anchor, eyebrow, title, layout, open, compact, order, "items": items[] { date, title, description, tags, order }, "cards": cards[] { title, order, "bullets": bullets[] { date, text, order } } } }',
  },
]

for (const pageDocument of pageDocuments) {
  const outputPath = path.resolve(__dirname, '../../_data', pageDocument.file)
  const fallback = JSON.parse(await fs.readFile(outputPath, 'utf8'))
  const content = (await client.fetch(pageDocument.query)) || fallback

  await fs.mkdir(path.dirname(outputPath), {recursive: true})
  await fs.writeFile(outputPath, `${JSON.stringify(content, null, 2)}\n`)

  console.log(`Synced ${pageDocument.type} to ${outputPath}`)
}
