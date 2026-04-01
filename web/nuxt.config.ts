// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxtjs/sanity',
  ],
  css: ['~/assets/css/main.css', '~/assets/css/index.scss'],

  routeRules: {
    '/': { prerender: true },
  },

  compatibilityDate: '2025-01-15',
  debug: true,
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs',
      },
    },
  },
  fonts: {
    families: [
      {
        name: 'CooperHewitt-Book',
        provider: 'local',
        weights: [400],
        style: 'normal',
      },
      {
        name: 'CooperHewitt-BookItalic',
        provider: 'local',
        weights: [400],
        style: 'italic',
      },
      {
        name: 'Display Dots',
        provider: 'local',
        weights: [400],
        style: 'normal',
      },
      { name: 'Instrument Serif', provider: 'google' },
    ],
  },
  i18n: {
    defaultLocale: 'en',
    langDir: 'locales',
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
      },
      {
        code: 'zh',
        name: '中文',
        file: 'zh.json',
      },
    ],
  },
  sanity: {
    projectId: process.env.NUXT_SANITY_PROJECT_ID,
    dataset: process.env.NUXT_SANITY_DATASET || 'production',
    apiVersion: process.env.NUXT_SANITY_API_VERSION || '2025-10-20',
    token: process.env.NUXT_SANITY_API_READ_TOKEN, // Only required when using a private dataset
    visualEditing: {
      token: process.env.NUXT_SANITY_API_READ_TOKEN,
      studioUrl: process.env.NUXT_SANITY_STUDIO_URL,
      stega: true,
      mode: 'live-visual-editing',
      zIndex: 51,
    },
  },
})
