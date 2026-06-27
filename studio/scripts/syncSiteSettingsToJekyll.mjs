import {createClient} from '@sanity/client'
import fs from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const outputPath = path.resolve(__dirname, '../../_data/site_settings.json')

const defaultSettings = {
  siteTitle: 'Jasmine J. Cash, PhD, CSCS',
  siteTagline: 'Clinical researcher and postdoctoral scholar',
  siteDescription:
    'Postdoctoral scholar studying stroke recovery, neuromodulation, rehabilitation outcomes, and physical function.',
  siteUrl: 'https://jasminecash.com',
  socialImage: 'assets/social-preview.png',
  footerName: 'Jasmine J. Cash, PhD, CSCS',
  footerLinks: [
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/jasmine-cash/',
      download: false,
    },
    {
      label: 'GitHub',
      url: 'https://github.com/jasminecash',
      download: false,
    },
    {
      label: 'CV',
      url: 'assets/cv.pdf',
      download: true,
    },
  ],
}

const client = createClient({
  projectId: 'qu5bojff',
  dataset: 'production',
  apiVersion: '2026-06-26',
  useCdn: false,
  perspective: 'published',
  token: process.env.SANITY_READ_TOKEN,
})

const settings = await client.fetch(`
  *[_type == "siteSettings"][0] {
    siteTitle,
    siteTagline,
    siteDescription,
    siteUrl,
    "socialImage": coalesce(uploadedSocialImage.asset->url, socialImage),
    footerName,
    "footerLinks": footerLinks[] {
      label,
      url,
      download
    }
  }
`)

const mergedSettings = {
  ...defaultSettings,
  ...(settings || {}),
  footerLinks: settings?.footerLinks?.length ? settings.footerLinks : defaultSettings.footerLinks,
}

await fs.mkdir(path.dirname(outputPath), {recursive: true})
await fs.writeFile(outputPath, `${JSON.stringify(mergedSettings, null, 2)}\n`)

console.log(`Synced site settings data to ${outputPath}`)
