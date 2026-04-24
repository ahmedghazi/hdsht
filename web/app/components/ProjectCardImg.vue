<script lang="ts" setup>
import type { ProjectExpanded } from '~/utils/sanity-api/sanity-expanded.types'
import { on, emit } from '~/utils/pubsub'

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
    console.log('hover', val)
    if (val) {
      emit('PROJECT-HOVER', input._id)
    } else {
      emit('PROJECT-HOVER', null)
    }
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
          <!-- <pre>{{ JSON.stringify(media, null, 2) }}</pre> -->
          <!-- <img
            :src="$urlFor(media).height(90).url()"
            :alt="$localizeField(media.caption)"
          /> -->
          <img
            v-if="media.asset"
            class="visual"
            :src="
              $urlFor(media.asset as any)
                .height(90)
                .url()
            "
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
