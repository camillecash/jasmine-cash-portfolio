import {createClient} from '@sanity/client'
import fs from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const outputPath = path.resolve(__dirname, '../../_data/home.json')

const client = createClient({
  projectId: 'qu5bojff',
  dataset: 'production',
  apiVersion: '2026-06-26',
  useCdn: false,
  perspective: 'published',
  token: process.env.SANITY_READ_TOKEN,
})

const home = await client.fetch(`
  *[_type == "homePage"][0] {
    hero {
      eyebrow,
      title,
      description,
      "actions": actions[] {
        label,
        url,
        style
      },
      "professionalLinks": professionalLinks[] {
        label,
        url,
        download
      },
      "portrait": {
        "image": coalesce(portrait.uploadedImage.asset->url, portrait.image),
        "alt": portrait.alt,
        "noteTitle": portrait.noteTitle,
        "noteText": portrait.noteText
      }
    },
    about,
    interests,
    researchThemes {
      eyebrow,
      title,
      "items": items[] {
        title,
        description,
        linkLabel,
        linkUrl
      }
    }
  }
`)

if (!home) {
  throw new Error(
    'No home page returned from Sanity. Import/publish the Home Page first, or set SANITY_READ_TOKEN if needed.'
  )
}

await fs.mkdir(path.dirname(outputPath), {recursive: true})
await fs.writeFile(outputPath, `${JSON.stringify(home, null, 2)}\n`)

console.log(`Synced home page data to ${outputPath}`)
