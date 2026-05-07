<script setup lang="ts">
import type { Image } from '@sanity/types'
import { getSanityImageDimensionsFromRef } from '~/utils/sanity-api/sanity-utils'
import type { SanityImageAsset } from '~/utils/sanity-api/sanity.types'

const { asset, caption, index } = defineProps<{
  asset?: SanityImageAsset
  caption?: string
  index: number
}>()

const { $urlFor } = useNuxtApp()

const isGif = computed(() => asset?.mimeType === 'image/gif')
const src = computed(() => {
  if (!asset) return undefined
  if (isGif.value) return asset.url
  return $urlFor(asset as unknown as Image)
    .width(3000)
    .format('webp')
    .url()
})

const dims = computed(() => getSanityImageDimensionsFromRef(asset?._ref))
</script>

<template>
  <figure>
    <figcaption v-if="caption">
      <div class="bubble bubble-dots-n-primary">
        <div>
          <span class="dots ellipsis">{{ caption }}</span>
          <span class="font-primary">{{
            index < 10 ? `0${index}` : index
          }}</span>
        </div>
      </div>
    </figcaption>
    <div :style="{ aspectRatio: dims?.aspectRatio, height: '100%' }">
      <img
        v-if="src"
        class="visual"
        :src="src"
        :alt="caption || ''"
        loading="lazy"
        decoding="async"
      />
    </div>
  </figure>
</template>

<style lang="scss">
figure {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  figcaption {
    .bubble {
      overflow: hidden;
      max-width: 100%;
    }
  }
  img {
    vertical-align: top;
  }
}
</style>
