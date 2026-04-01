<script setup lang="ts">
import type { SanityImageAssetReference } from '~/utils/sanity-api/sanity.types'

const { asset, caption, index } = defineProps<{
  asset?: SanityImageAssetReference
  caption?: string
  index: number
}>()
</script>

<template>
  <figure>
    <figcaption v-if="caption">
      <div class="bubble bubble-dots-n-primary">
        <div>
          <span class="dots ellipsis">{{ caption }}</span>
          <span class="font-primary">{{ index }}</span>
        </div>
      </div>
    </figcaption>
    <img
      v-if="asset"
      class="visual"
      :src="
        $urlFor(asset as any)
          .width(2000)
          .url()
      "
      :alt="caption || ''"
    />
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
