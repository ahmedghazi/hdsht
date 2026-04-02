<script setup lang="ts">
import type { VideoUI } from '~/utils/sanity-api/sanity.types'

defineProps<{ input: VideoUI }>()
</script>

<template>
  <section :class="['module', 'module--videoUI', `col-span-2`]">
    <UiMuxVideo
      :asset-id="input.video?.video?.asset?.playbackId"
      :caption="$localizeField(input.video?.caption)"
      :play="true"
    />
  </section>
</template>

<style lang="scss" scoped>
.module {
  height: 100dvh;
  background-color: black;
  mux-player {
    height: 100dvh;
  }
}
</style>
