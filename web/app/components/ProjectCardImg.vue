<script lang="ts" setup>
import type { ProjectExpanded } from '~/utils/sanity-api/sanity-expanded.types'
import { on, emit } from '~/utils/pubsub'
import Thumbnail from './Thumbnail.vue'
import { gsap } from 'gsap'

const { input, index = 0 } = defineProps<{
  input: ProjectExpanded
  index?: number
}>()

const wrapper = ref<HTMLElement | null>(null)
const { animeClass } = useDominoAnime(wrapper, index)

const hover = ref<boolean>(false)
const activeTimelines = ref<gsap.core.Timeline[]>([])
const isVisible = ref(false)

onMounted(() => {
  const obs = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        isVisible.value = true
        obs.disconnect()
      }
    },
    { rootMargin: '200px' },
  )
  if (wrapper.value) obs.observe(wrapper.value)
})

watch(
  () => hover.value,
  (val) => {
    if (wrapper.value && val) {
      const children = Array.from(
        wrapper.value.querySelectorAll('figure .overlay-blended'),
      )
      const step = 0.012
      const on = 0.15
      const masterTl = gsap.timeline({ repeat: 2, yoyo: true })
      children.forEach((child, i) => {
        masterTl
          .set(child, { visibility: 'visible' }, i * step)
          .set(child, { visibility: 'hidden' }, i * step + on)
      })
      activeTimelines.value.push(masterTl)
    } else if (wrapper.value && !val) {
      activeTimelines.value.forEach((tl) => tl.kill())
      activeTimelines.value = []
      const children = wrapper.value.querySelectorAll('figure .overlay-blended')
      children.forEach((child) => {
        gsap.set(child, { visibility: 'hidden' })
      })
    }
  },
)
</script>

<template>
  <div
    ref="wrapper"
    :class="{
      card: true,
      'card--project-img': true,
      'card--rip': input.rip,
      'is-active': hover,
      // 'is-else-hovered': elseHovered,
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
        <template v-if="media._type === 'image' && media.asset?._id">
          <Thumbnail
            :asset="media.asset"
            :size="360"
            :alt="$localizeField(media.caption) || ''"
          />
        </template>
        <template v-else-if="media._type === 'video'">
          <UiMuxVideo
            v-if="media.video?.asset?.playbackId && isVisible"
            :asset-id="media.video?.asset?.playbackId || ''"
            :autoplay="false"
            :aspect-ratio="media.video?.asset?.data?.aspect_ratio"
          />
        </template>

        <div
          class="overlay-blended"
          :style="{
            '--background':
              i % 2 === 0
                ? input?.client?.backgroundColor?.hex
                : input?.client?.foregroundColor?.hex,
          }"
        ></div>
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
  backface-visibility: hidden;
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
    height: var(--line-height-2xl);
    width: var(--line-height-2xl);
  }
  figure {
  }
  figure {
    position: relative;
    .overlay-blended {
      position: absolute;
      inset: 0;
      background-color: var(--background);
      mix-blend-mode: difference;
      visibility: hidden;
    }
  }
  img,
  mux-player {
    height: var(--line-height-2xl);
    width: auto;
  }

  @media (min-width: 575px) {
  }

  @media (max-width: 800px) {
    .disc {
      height: var(--line-height-xl);
      width: var(--line-height-xl);
    }
    img,
    mux-player {
      height: var(--line-height-xl);
      width: auto;
    }
  }
}
</style>
