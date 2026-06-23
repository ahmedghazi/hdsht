<script lang="ts" setup>
import type { ProjectExpanded } from '~/utils/sanity-api/sanity-expanded.types'
import { emit } from '~/utils/pubsub'
import Thumbnail from './Thumbnail.vue'
import { gsap } from 'gsap'

const { input, index = 0 } = defineProps<{
  input: ProjectExpanded
  index?: number
}>()

const wrapper = ref<HTMLElement | null>(null)
// const { animeClass } = useDominoAnime(wrapper, index)
const animeClass = ''

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
      const step = 0.05
      const on = 0.15
      const masterTl = gsap.timeline({ repeat: -1, yoyo: false })
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
    @mouseenter="
      () => {
        hover = true
        emit('sfx')
      }
    "
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
      <template v-for="(media, i) in input.media" :key="i">
        <figure
          :class="[animeClass, `media--${media._type}`]"
          :title="input.title?.en"
        >
          <template v-if="media._type === 'image' && media.asset?._id">
            <Thumbnail
              :asset="media.asset"
              :size="360"
              :alt="$localizeField(media.caption) || ''"
            />
          </template>
          <template
            v-else-if="
              media._type === 'video' && media.video?.asset?.playbackId
            "
          >
            <UiMuxGif
              :playback-id="media.video?.asset?.playbackId || ''"
              :aspect="media.video?.asset?.data?.aspect_ratio"
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
      </template>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.card {
  font-size: 0;
  line-height: 0;
  display: inline;
  vertical-align: top;
  margin-right: var(--line-height-md);
  padding-top: calc(var(--line-height-md) * 1);
  position: relative;
  backface-visibility: hidden;
  transition: opacity 0.15s ease;
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
  mux-player,
  video {
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
    mux-player,
    video {
      height: var(--line-height-xl);
      // height: var(--spacing-xl) !important;
      // min-height: var(--line-height-xl) !important;
      width: auto;
    }
    .client-wrapper,
    .client,
    figure {
      // margin-bottom: var(--spacing-sm, 20px);
    }
  }
}
</style>
