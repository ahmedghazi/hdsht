<script lang="ts" setup>
import type { ProjectExpanded } from '~/utils/sanity-api/sanity-expanded.types'

const { input } = defineProps<{ input: ProjectExpanded }>()
const hover = ref<boolean>(false)
</script>

<template>
  <div
    :class="{
      card: true,
      'card--project-img': true,
      'card--rip': input.rip,
      'is-active': hover,
    }"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <NuxtLink :to="_linkResolver(input as any)">
      <div class="bubble bubble-dot">
        <div>{{ input?.ID }}</div>
      </div>
      <Client
        v-if="input.client"
        :input="input.client"
        :disc-only="true"
        :size="'md'"
      />

      <figure v-for="(media, i) in input.media" :key="i">
        <template v-if="media._type === 'image'">
          <img
            :src="$urlFor(media).height(90).url()"
            :alt="$localizeField(media.caption)"
          />
        </template>
        <template v-else-if="media._type === 'video'">
          <UiMuxVideo
            v-if="media.video?.asset?.playbackId"
            :asset-id="media.video?.asset?.playbackId || ''"
            :autoplay="true"
          />
        </template>
        <template v-else>
          <div class="aspect-square">Unsupported media type</div>
        </template>
      </figure>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.card {
  font-size: 0;
  line-height: 0;
  display: inline;
  vertical-align: top;
  padding-top: calc(var(--line-height-md) * 1);
  position: relative;
  a {
    font-size: 0;
    line-height: 0;
    display: inline;
    position: relative;
  }

  .client,
  figure {
    display: inline-block;
    vertical-align: top;
    margin-bottom: var(--line-height-md);
  }

  .bubble {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
  }
  .disc {
    height: 9rem;
    width: 9rem;
  }
  figure {
  }
  img,
  mux-player {
    height: var(--line-height-2xl);
    width: auto;
  }
}
@media (min-width: 575px) {
}

@media (min-width: 800px) {
}
</style>
