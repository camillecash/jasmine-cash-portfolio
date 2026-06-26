import {createClient} from '@sanity/client'
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const publicationsDir = path.resolve(__dirname, '../../_publications')

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

function parseFrontmatter(fileContents) {
  const match = fileContents.match(/^---\n([\s\S]*?)\n---/)

  if (!match) {
    return {}
  }

  const lines = match[1].split('\n')
  const data = {}
  let currentListKey = null

  for (const line of lines) {
    if (/^\s*-\s+/.test(line) && currentListKey) {
      data[currentListKey].push(line.replace(/^\s*-\s+/, '').replace(/^"|"$/g, ''))
      continue
    }

    const field = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/)

    if (!field) {
      continue
    }

    const [, key, rawValue] = field

    if (rawValue === '') {
      data[key] = []
      currentListKey = key
      continue
    }

    currentListKey = null
    const value = rawValue.replace(/^"|"$/g, '')
    const numberValue = Number(value)
    data[key] = Number.isNaN(numberValue) ? value : numberValue
  }

  return data
}

const files = fs
  .readdirSync(publicationsDir)
  .filter((file) => file.endsWith('.md'))
  .sort()

const documents = files.map((file) => {
  const filePath = path.join(publicationsDir, file)
  const data = parseFrontmatter(fs.readFileSync(filePath, 'utf8'))
  const slug = path.basename(file, '.md')

  return {
    _type: 'publication',
    // Use a public-safe ID. Dotted/path-style IDs require authenticated access
    // and will not show up in unauthenticated public dataset queries.
    _id: `publication-${slug}`,
    title: data.title,
    summary: data.summary,
    year: data.year,
    doiUrl: data.doi_url,
    topics: data.topics || [],
    order: data.order,
  }
})

if (process.env.DELETE_OLD_DOTTED_PUBLICATION_IDS === 'true') {
  for (const file of files) {
    const dottedId = `publication.${path.basename(file, '.md')}`

    console.log(`Deleting old dotted-ID document: ${dottedId}`)
    await client.delete(dottedId).catch((error) => {
      if (error.statusCode !== 404) {
        throw error
      }
    })
  }
}

for (const document of documents) {
  console.log(`Importing: ${document.title}`)
  await client.createOrReplace(document)
}

console.log(`Imported ${documents.length} publication document(s).`)
