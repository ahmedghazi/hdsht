<script lang="ts" setup>
import type { ProjectExpanded } from '~/utils/sanity-api/sanity-expanded.types'

const { input, index = 0 } = defineProps<{
  input: ProjectExpanded
  index?: number
}>()
const hover = ref<boolean>(false)
const wrapper = ref<HTMLElement | null>(null)
const { animeClass } = useDominoAnime(wrapper, index)
</script>

<template>
  <div
    ref="wrapper"
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
      <div :class="{ 'client-wrapper': true, [animeClass]: true }">
        <Client
          v-if="input.client"
          :input="input.client"
          :disc-only="true"
          :size="'md'"
        />
      </div>

      <div :class="{ 'bubble bubble-dot': true, [animeClass]: true }">
        <div>{{ input?.ID }}</div>
      </div>

      <figure v-for="(media, i) in input.media" :key="i" :class="animeClass">
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
            :aspect-ratio="media.video?.asset?.data?.aspect_ratio"
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

  .client-wrapper,
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
