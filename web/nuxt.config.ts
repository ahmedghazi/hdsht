// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxtjs/sanity',
  ],
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    },
  },
  css: ['~/assets/css/main.css', '~/assets/css/index.scss'],

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'mux-player',
    },
  },

  runtimeConfig: {
    public: {
      siteUrl: 'https://www.hdsht.pink', // overridden by NUXT_PUBLIC_SITE_URL
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/sitemap.xml': { prerender: true },
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
    providers: {
      bunny: false,
    },
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
        name: 'Display-Dots-v4',
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
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root',
    },
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
        title: 'En',
      },
      {
        code: 'zh',
        name: '中文',
        file: 'zh.json',
        title: '中文',
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
