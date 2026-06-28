import homeData from '../_data/home.json';
import siteSettingsData from '../_data/site_settings.json';
import projectsPageData from '../_data/projects_page.json';
import projectThemesData from '../_data/project_themes.json';
import publicationsPageData from '../_data/publications_page.json';
import publicationsData from '../_data/publications.json';
import presentationsPageData from '../_data/presentations_page.json';
import presentationSectionsData from '../_data/presentation_sections.json';
import recognitionPageData from '../_data/recognition_page.json';
import recognitionSectionsData from '../_data/recognition_sections.json';
import expertiseData from '../_data/expertise.json';
import teachingData from '../_data/teaching.json';

export const home = homeData;
export const settings = siteSettingsData;
const byOrder = (items = []) => [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

export const projectsPage = projectsPageData;
export const projectThemes = projectsPageData.themes || byOrder(projectThemesData);
export const publicationsPage = publicationsPageData;
export const publications = publicationsPageData.publications || byOrder(publicationsData);
export const presentationsPage = presentationsPageData;
export const presentationSections = presentationsPageData.sections || byOrder(presentationSectionsData);
export const recognitionPage = recognitionPageData;
export const recognitionSections = recognitionPageData.sections || byOrder(recognitionSectionsData);
export const expertise = {
  ...expertiseData,
  hero: expertiseData.hero || {
    eyebrow: 'Research Profile',
    title: 'Training and expertise',
    description:
      "A concise view of Dr. Cash's education, research roles, dissertation and thesis work, methodological strengths, credentials, and scholarly service",
  },
  profileSection: expertiseData.profileSection || {
    eyebrow: 'Training and Experience',
    title: 'Education and research roles',
  },
  scholarlySection: expertiseData.scholarlySection || {
    eyebrow: 'Scholarly Foundations',
    title: 'Dissertation, thesis, and manuscript review',
    reviewTitle: 'Manuscript review',
  },
  credentialSection: expertiseData.credentialSection || {
    eyebrow: 'Credentials',
    title: 'Licenses and certifications',
  },
};
export const teaching = teachingData;

export const siteTitle = settings.siteTitle || 'Jasmine J. Cash, PhD, CSCS';
export const siteTagline = settings.siteTagline || 'Clinical researcher and postdoctoral scholar';
export const siteDescription = settings.siteDescription || 'Postdoctoral scholar studying stroke recovery, neuromodulation, rehabilitation outcomes, and physical function.';
export const siteUrl = settings.siteUrl || 'https://jasminecash.com';

export function absoluteUrl(path = '') {
  if (!path) return siteUrl;
  if (path.includes('://')) return path;
  return `${siteUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export const socialImage = absoluteUrl(settings.socialImage || 'assets/social-preview.png');
