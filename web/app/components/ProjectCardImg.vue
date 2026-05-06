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
const elseHovered = ref<boolean>(false)
onMounted(() => {
  const unsub = on('PROJECT-HOVER', (e, payload) => {
    elseHovered.value = payload === input._id
  })
  onUnmounted(() => {
    unsub()
  })
})

watch(
  () => hover.value,
  (val) => {
    // GSAP random opacity animation for children
    if (wrapper.value && val) {
      // Get all child elements within the wrapper
      const children = wrapper.value.querySelectorAll('figure')

      children.forEach((_child, index) => {
        // Create nervous, chaotic opacity sequence
        const timeline = gsap.timeline({ repeatDelay: 0 })

        // Very random delays and durations for nervous effect
        const initialDelay = Math.random() * 0.2
        const baseDuration = 0.05 + Math.random() * 0.1 // Very fast: 0.05-0.15s

        timeline
          .to(_child, {
            // opacity: Math.random() < 0.5 ? 0 : 0.3,
            opacity: 0.1,
            duration: baseDuration * 0.5,
            ease: 'none',
          })
          .to(_child, {
            // opacity: Math.random() < 0.5 ? 1 : 0.7,
            opacity: 1,
            duration: baseDuration * 0.3,
            ease: 'none',
          })
          .to(_child, {
            // opacity: Math.random() < 0.5 ? 0 : 0.2,
            opacity: 0.2,
            duration: baseDuration * 0.7,
            ease: 'none',
          })
          .to(_child, {
            // opacity: Math.random() < 0.5 ? 1 : 0.8,
            opacity: 1,
            duration: baseDuration * 0.4,
            ease: 'none',
          })
          .to(_child, {
            opacity: Math.random() < 0.5 ? 0.1 : 0.4,
            duration: baseDuration * 0.6,
            ease: 'none',
          })
          .to(_child, {
            opacity: Math.random() < 0.5 ? 0.9 : 1,
            duration: baseDuration * 0.2,
            ease: 'none',
          })

        timeline.play(initialDelay)

        // Add some scale jitter for extra nervousness
        gsap.to(_child, {
          scale: 0.95 + Math.random() * 0.1,
          duration: 0.1,
          // repeat: -1,
          repeat: 5,
          // yoyo: true,
          ease: 'none',
          delay: initialDelay,
        })
      })
    } else if (wrapper.value && !val) {
      // Kill all animations and reset opacity when hover ends
      const children = wrapper.value.querySelectorAll('figure')
      children.forEach((child) => {
        gsap.killTweensOf(child)
        gsap.set(child, { opacity: 1, scale: 1 })
      })
    }

    // if (val) {
    //   emit('PROJECT-HOVER', input._id)
    // } else {
    //   emit('PROJECT-HOVER', null)
    // }
  },
  {
    immediate: true, // exécute aussi au montage avec la valeur initiale
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
      'is-else-hovered': elseHovered,
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
          <Thumbnail
            :asset="media.asset"
            :size="360"
            :alt="$localizeField(media.caption) || ''"
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
    height: var(--line-height-2xl);
    width: var(--line-height-2xl);
  }
  figure {
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
