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
    hero { eyebrow, title, description },
    profileSection { eyebrow, title },
    scholarlySection { eyebrow, title, reviewTitle },
    credentialSection { eyebrow, title },
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

const output = {
  ...expertise,
  hero: expertise.hero || {
    eyebrow: 'Research Profile',
    title: 'Training and expertise',
    description:
      "A concise view of Dr. Cash's education, research roles, dissertation and thesis work, methodological strengths, credentials, and scholarly service",
  },
  profileSection: expertise.profileSection || {
    eyebrow: 'Training and Experience',
    title: 'Education and research roles',
  },
  scholarlySection: expertise.scholarlySection || {
    eyebrow: 'Scholarly Foundations',
    title: 'Dissertation, thesis, and manuscript review',
    reviewTitle: 'Manuscript review',
  },
  credentialSection: expertise.credentialSection || {
    eyebrow: 'Credentials',
    title: 'Licenses and certifications',
  },
}

await fs.mkdir(path.dirname(outputPath), {recursive: true})
await fs.writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`)

console.log(`Synced expertise page data to ${outputPath}`)
