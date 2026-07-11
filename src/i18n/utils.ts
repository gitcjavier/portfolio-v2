import type { Lang } from './config';
import { defaultLang } from './config';
import ui from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  if (first === 'en') return 'en';
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return ui[lang];
}

/** Ruta localizada para un path interno (ej. `/experiences` → `/en/experiences`) */
export function getLocalizedPath(path: string, lang: Lang): string {
  const stripped = path.replace(/^\/en(\/|$)/, '/');
  const normalized = stripped === '/' ? '' : stripped.replace(/\/$/, '');
  if (lang === 'en') return `/en${normalized}` || '/en/';
  return normalized || '/';
}

/** Paths alternos ES/EN para la página actual */
export function getAlternatePaths(pathname: string): { es: string; en: string } {
  const stripped = pathname.replace(/^\/en(\/|$)/, '/');
  const base = stripped === '/' ? '' : stripped.replace(/\/$/, '');
  return {
    es: base || '/',
    en: `/en${base}` || '/en/',
  };
}

export function getHomePath(lang: Lang): string {
  return lang === 'en' ? '/en/' : '/';
}

export function getExperiencesPath(lang: Lang): string {
  return lang === 'en' ? '/en/experiences' : '/experiences';
}

export function getHeroHashPath(lang: Lang): string {
  return `${getHomePath(lang)}#hero`;
}
