import {createClient} from '@sanity/client'
import fs from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const inputPath = path.resolve(__dirname, '../../_data/expertise.json')

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

function keyFrom(parts) {
  return parts
    .filter(Boolean)
    .join('-')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
}

const expertise = JSON.parse(await fs.readFile(inputPath, 'utf8'))

const skills = (expertise.skills || []).map((skill) => ({
  ...skill,
  _key: keyFrom(['skill', skill.order, skill.title]),
}))

const profiles = (expertise.profiles || []).map((profile) => ({
  ...profile,
  _key: keyFrom(['profile', profile.order, profile.title]),
  items: (profile.items || []).map((item) => ({
    ...item,
    _key: keyFrom(['profile-item', profile.order, item.order, item.title]),
  })),
}))

const scholarly = (expertise.scholarly || []).map((item) => ({
  ...item,
  _key: keyFrom(['scholarly', item.order, item.title]),
}))

const reviewJournals = expertise.reviewJournals || []

const credentials = (expertise.credentials || []).map((credential) => ({
  ...credential,
  _key: keyFrom(['credential', credential.order, credential.title]),
}))

const document = {
  _id: 'expertise-page',
  _type: 'expertisePage',
  skills,
  profiles,
  scholarly,
  reviewJournals,
  credentials,
}

console.log('Importing expertise page')
await client.createOrReplace(document)

console.log('Imported 1 expertise page document.')
