export const i18n = {
  defaultLocale: 'en',

  // locales: ['en', 'fr', 'ar'],
  locales: ['en'],
  langDirection: {
    en: 'ltr',
    fr: 'ltr',
    ar: 'rtl'
  }
} as const

export type Locale = (typeof i18n)['locales'][number]
