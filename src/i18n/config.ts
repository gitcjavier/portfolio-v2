export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'es';

export const LOCALE_COOKIE = 'preferred-locale';

/** Países donde el español es el idioma principal del sitio por defecto */
export const SPANISH_COUNTRIES = new Set([
  'AR', 'BO', 'CL', 'CO', 'CR', 'CU', 'DO', 'EC', 'ES', 'GQ',
  'GT', 'HN', 'MX', 'NI', 'PA', 'PE', 'PR', 'PY', 'SV', 'UY', 'VE',
]);

/** Países donde se prioriza inglés si no hay preferencia guardada */
export const ENGLISH_PREFERRED_COUNTRIES = new Set([
  'US', 'GB', 'AU', 'CA', 'NZ', 'IE', 'ZA', 'IN', 'SG', 'PH', 'NG', 'KE',
]);
