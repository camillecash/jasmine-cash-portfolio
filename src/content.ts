import homeData from '../_data/home.json';
import siteSettingsData from '../_data/site_settings.json';
import projectThemesData from '../_data/project_themes.json';
import publicationsData from '../_data/publications.json';
import presentationSectionsData from '../_data/presentation_sections.json';
import recognitionSectionsData from '../_data/recognition_sections.json';
import expertiseData from '../_data/expertise.json';
import teachingData from '../_data/teaching.json';

export const home = homeData;
export const settings = siteSettingsData;
export const projectThemes = [...projectThemesData].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
export const publications = [...publicationsData].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
export const presentationSections = [...presentationSectionsData].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
export const recognitionSections = [...recognitionSectionsData].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
export const expertise = expertiseData;
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
