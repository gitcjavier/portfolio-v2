import {
  LOCALE_COOKIE,
  SPANISH_COUNTRIES,
  ENGLISH_PREFERRED_COUNTRIES,
} from '../i18n/config';

const COOKIE_MAX_AGE = 365 * 24 * 60 * 60;

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=${COOKIE_MAX_AGE};SameSite=Lax`;
}

function toEnPath(path: string): string {
  if (path === '/' || path === '') return '/en/';
  if (path === '/experiences' || path === '/experiences/') return '/en/experiences';
  return `/en${path}`;
}

function toEsPath(path: string): string {
  if (path === '/en' || path === '/en/') return '/';
  if (path === '/en/experiences' || path === '/en/experiences/') return '/experiences';
  if (path.startsWith('/en/')) return path.slice(3) || '/';
  return path;
}

function isLocaleEntryPath(path: string): boolean {
  return (
    path === '/' ||
    path === '/experiences' ||
    path === '/experiences/' ||
    path === '/en' ||
    path === '/en/' ||
    path === '/en/experiences' ||
    path === '/en/experiences/'
  );
}

async function detectLocale(): Promise<'es' | 'en'> {
  const browserLang = (navigator.language || 'es').split('-')[0].toLowerCase();
  if (browserLang === 'en') return 'en';
  if (browserLang === 'es') return 'es';

  const languages = navigator.languages ?? [];
  for (const lang of languages) {
    const code = lang.split('-')[0].toLowerCase();
    if (code === 'en') return 'en';
    if (code === 'es') return 'es';
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
    clearTimeout(timeout);
    if (res.ok) {
      const data = (await res.json()) as { country_code?: string };
      const country = data.country_code ?? '';
      if (SPANISH_COUNTRIES.has(country)) return 'es';
      if (ENGLISH_PREFERRED_COUNTRIES.has(country)) return 'en';
    }
  } catch {
    // Sin geo: español por defecto
  }

  return 'es';
}

function redirectIfNeeded(target: 'es' | 'en', path: string) {
  const isEn = path.startsWith('/en');
  if (target === 'en' && !isEn) {
    window.location.replace(toEnPath(path));
    return true;
  }
  if (target === 'es' && isEn) {
    window.location.replace(toEsPath(path));
    return true;
  }
  return false;
}

export function initLocaleDetect(isNavigation = false) {
  const path = window.location.pathname;
  if (!isLocaleEntryPath(path)) return;

  const saved = getCookie(LOCALE_COOKIE);
  if (saved === 'es' || saved === 'en') {
    redirectIfNeeded(saved, path);
    return;
  }

  if (isNavigation) return;

  detectLocale().then((locale) => {
    setCookie(LOCALE_COOKIE, locale);
    redirectIfNeeded(locale, path);
  });
}

initLocaleDetect(false);
document.addEventListener('astro:page-load', () => initLocaleDetect(true));
