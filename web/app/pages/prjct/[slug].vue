<script setup lang="ts">
import type { Project, Seo } from '~/utils/sanity-api/sanity.types'
import website from '~/config/website'
import { PROJECT_QUERY } from '~/utils/sanity-api/queries'

const route = useRoute()
const { data } = await useSanityData<Project>(PROJECT_QUERY, {
  slug: route.params.slug,
})

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Sorry, the requested page does not exist.',
  })
}

const pageData = data.value || ({} as Project)
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
  <div class="content content--page-project">
    <pre>{{ data }}</pre>
  </div>
</template>

<style scoped>
.content {
}
@media (max-width: 800px) {
}
</style>
