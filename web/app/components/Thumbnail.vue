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
    .url()
})

const dims = computed(() => getSanityImageDimensionsFromRef(asset?._ref))
</script>

<template>
  <img
    v-if="src"
    class="visual"
    :src="src"
    :alt="alt || ''"
    :style="{ aspectRatio: dims?.aspectRatio, height: '100%' }"
  />
</template>

<style lang="scss">
img {
  min-height: var(--line-height-2xl);
  max-height: var(--line-height-2xl);
}
</style>
