<script setup lang="ts">
import type { PageModulaire, Seo } from '~/utils/sanity-api/sanity.types'
import { HOME_QUERY } from '~/utils/sanity-api/queries'
import ContentModules from '../components/ContentModules.vue'
import website from '~/config/website'

const route = useRoute()
const { data } = await useSanityData<PageModulaire>(HOME_QUERY, {
  slug: route.params.slug,
})

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'orry, the requested page does not exist.',
  })
}

const pageData = data.value || ({} as PageModulaire)
const seo = pageData.seo || ({} as Seo)
const pageTitle = seo.metaTitle || pageData?.title?.en || 'Lambert Lénack'

useSeoMeta({
  title: `${website.title} — ${pageTitle}`,
  ogTitle: pageTitle,
  ogDescription: seo?.metaDescription || '',
  description: seo?.metaDescription || '',
  ogImage: (seo?.metaImage?.asset as any)?.url || '',
})

// Debug logging
// console.log('SEO Data:', {
//   title: pageTitle,
//   description: seo?.metaDescription,
//   image: seo?.metaImage?.asset?.url,
// })
</script>

<template>
  <div class="content content--home content--page-modulaire">
    <ContentModules v-if="data && data.modules" :input="data.modules" />
  </div>
</template>

<style lang="scss">
body:has(.content--home) {
  main {
    padding: 0;
  }
  footer {
    display: none;
  }
}
.content {
}
@media (max-width: 800px) {
}
</style>
