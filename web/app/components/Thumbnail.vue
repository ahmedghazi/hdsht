<script setup lang="ts">
import type { Image } from '@sanity/types'
import { getSanityImageDimensionsFromRef } from '~/utils/sanity-api/sanity-utils'
import type { SanityImageAsset } from '~/utils/sanity-api/sanity.types'

const { asset, size = 60 } = defineProps<{
  asset?: SanityImageAsset
  alt?: string
  size?: number
}>()

const { $urlFor } = useNuxtApp()

const isGif = computed(() => asset?.mimeType === 'image/gif')
const src = computed(() => {
  if (!asset) return undefined
  if (isGif.value) return asset.url
  return $urlFor(asset as unknown as Image)
    .height(size)
    .format('webp')
    .url()
})
// const srcset = computed(() => {
//   const b = $urlFor(asset)
//   return [400, 800, 1200]
//     .map((w) => `${b.width(w).format('webp').url()} ${w}w`)
//     .join(', ')
// })
const srcset = ''

const dims = computed(() => getSanityImageDimensionsFromRef(asset?._ref))
const height = size
const width = size ? size * (dims?.aspectRatio || 1) : 'auto'
</script>

<template>
  <img
    v-if="src"
    class="visual-thumbnail"
    :src="src"
    :srcset="srcset"
    sizes="(max-width: 600px) 400px, (max-width: 1024px) 800px, 1200px"
    :alt="alt || ''"
    loading="lazy"
    decoding="async"
    :height="height"
    :width="width"
    :style="{ aspectRatio: dims?.aspectRatio, height: '100%' }"
  />
</template>

<style lang="scss">
img.visual-thumbnail {
  min-height: var(--line-height-xl);
  max-height: var(--line-height-xl);
  @media (min-width: 800px) {
    min-height: var(--line-height-2xl);
    max-height: var(--line-height-2xl);
  }
}
</style>
