<script setup lang="ts">
import type { VideoUI } from '~/utils/sanity-api/sanity.types'

defineProps<{ input: VideoUI }>()
</script>

<template>
  <section :class="['module', 'module-video-ui', `col-span-2`]">
    <UiMuxVideo
      :asset-id="input.video?.video?.asset?.playbackId"
      :caption="$localizeField(input.video?.caption)"
      :autoplay="true"
      :aspect-ratio="input.video?.video?.asset?.data?.aspect_ratio || '16/9'"
    />
  </section>
</template>

<style lang="scss" scoped>
.module {
  height: 100dvh;
  background-color: black;
  mux-player {
    height: 100%;
    width: 100%;
    // aspect-ratio: var(--aspect-video);
    --media-object-fit: cover;
    --media-object-position: center;
  }
}
</style>
