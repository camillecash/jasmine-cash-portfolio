import {createClient} from '@sanity/client'

const token = process.env.SANITY_AUTH_TOKEN

if (!token) {
  throw new Error('Missing SANITY_AUTH_TOKEN. Run with `sanity exec scripts/repairPageSingletonFields.mjs --with-user-token`.')
}

const client = createClient({
  projectId: 'qu5bojff',
  dataset: 'production',
  apiVersion: '2026-06-26',
  useCdn: false,
  token,
})

const expertiseDefaults = {
  hero: {
    eyebrow: 'Research Profile',
    title: 'Training and expertise',
    description:
      "A concise view of Dr. Cash's education, research roles, dissertation and thesis work, methodological strengths, credentials, and scholarly service",
  },
  profileSection: {eyebrow: 'Training and Experience', title: 'Education and research roles'},
  scholarlySection: {
    eyebrow: 'Scholarly Foundations',
    title: 'Dissertation, thesis, and manuscript review',
    reviewTitle: 'Manuscript review',
  },
  credentialSection: {eyebrow: 'Credentials', title: 'Licenses and certifications'},
}

for (const id of ['expertise-page', 'drafts.expertise-page']) {
  const expertise = await client.getDocument(id)

  if (!expertise) continue

  await client
    .patch(id)
    .set({
      hero: expertise.hero || expertiseDefaults.hero,
      profileSection: expertise.profileSection || expertiseDefaults.profileSection,
      scholarlySection: expertise.scholarlySection || expertiseDefaults.scholarlySection,
      credentialSection: expertise.credentialSection || expertiseDefaults.credentialSection,
    })
    .commit()
}

for (const id of ['teaching-page', 'drafts.teaching-page']) {
  const teaching = await client.getDocument(id)

  if (!teaching) continue

  const teachingDescription =
    teaching.hero?.description ||
    teaching.hero?.paragraphs?.filter(Boolean).join(' ') ||
    'Dr. Cash brings her background in clinical research, human movement, and strength and conditioning into the classroom, helping students connect foundational science with health care practice. Dr. Cash also mentors students and emerging scholars as they build research skills, connect coursework to clinical questions, and develop confidence in rehabilitation science.'

  await client
    .patch(id)
    .set({
      hero: {
        eyebrow: teaching.hero?.eyebrow || 'Teaching Experience',
        title: teaching.hero?.title || 'Teaching and mentorship',
        description: teachingDescription,
      },
    })
    .commit()
}

console.log('Repaired Expertise Page and Teaching Page singleton fields.')
