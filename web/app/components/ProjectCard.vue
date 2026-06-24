<script lang="ts" setup>
import type { RANDOM_PROJECTS_QUERY_RESULT } from '~/utils/sanity-api/sanity.types'
import Client from './Client.vue'

type ProjectCardInput = RANDOM_PROJECTS_QUERY_RESULT[number]

const {
  input,
  index = 0,
  stagger = 0.01,
  mouseFollowThumbnail,
} = defineProps<{
  input: ProjectCardInput
  index?: number
  stagger?: number
  mouseFollowThumbnail?: boolean
}>()
const items = ref<HTMLElement | null>(null)
const { animeClass } = useDominoAnime(items, index, stagger)
const hover = ref<boolean>(false)
</script>

<template>
  <article
    ref="items"
    :class="{
      card: true,
      'card--project-teaser': true,
    }"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <NuxtLink :to="_linkResolver(input as any)">
      <div class="header">
        <div class="header--item">
          <div class="bubble" :class="animeClass">
            <div>ID</div>
          </div>
          <div class="bubble bubble-dot bubble-dot--lg" :class="animeClass">
            <div>{{ input?.ID }}</div>
          </div>
        </div>
        <div class="header--item">
          <div class="bubble" :class="animeClass">
            <div>{{ $localizeText('client') }}</div>
          </div>
          <div :class="animeClass">
            <Client v-if="input?.client" :input="input.client" />
          </div>
        </div>

        <div class="header--item">
          <div class="bubble" :class="animeClass">
            <div>{{ $localizeText('project') }}</div>
          </div>
          <div
            class="bubble bubble--lg"
            :class="animeClass"
            :style="{
              '--background': input.client?.backgroundColor?.hex,
              '--color': input.client?.foregroundColor?.hex,
            }"
          >
            <h3 v-if="input.title">{{ $localizeField(input?.title) }}</h3>
          </div>
        </div>
      </div>

      <!-- <ThumbnailFollowMouse
        v-if="mouseFollowThumbnail"
        :wrapper="items"
        :hover="hover"
      >
        <figure v-if="input.imageCover" class="image-cover">
          <img
            v-if="input.imageCover?.asset"
            :src="
              $urlFor(input.imageCover?.asset as any)
                .width(800)
                .dpr(2)
                .url()
            "
            :alt="`${$localizeField(input?.title) || ''}`"
          />
        </figure>
        <figure
          v-if="!input.imageCover && input.videoCover"
          class="video-cover"
        >
          <UiMuxVideo
            v-if="input.videoCover.video?.asset?.playbackId"
            :asset-id="input.videoCover.video?.asset?.playbackId || ''"
            :autoplay="true"
            :loop="true"
            :aspect-ratio="input.videoCover.video?.asset?.data?.aspect_ratio"
          />
        </figure>
      </ThumbnailFollowMouse> -->

      <figure v-if="input.imageCover" class="image-cover">
        <img
          v-if="input.imageCover?.asset"
          :src="
            $urlFor(input.imageCover?.asset as any)
              .width(800)
              .dpr(2)
              .url()
          "
          :alt="`${$localizeField(input?.title) || ''}`"
        />
      </figure>
      <figure v-if="!input.imageCover && input.videoCover" class="video-cover">
        <UiMuxVideo
          v-if="input.videoCover.video?.asset?.playbackId"
          :asset-id="input.videoCover.video?.asset?.playbackId || ''"
          :autoplay="true"
          :loop="true"
          :aspect-ratio="input.videoCover.video?.asset?.data?.aspect_ratio"
        />
      </figure>
    </NuxtLink>
  </article>
</template>

<style scoped lang="scss">
.card.card--project-teaser {
  // --background: inherit;
  // --color: inherit;
  position: relative;
  &:hover {
    z-index: 10;
    .image-cover,
    .video-cover {
      visibility: visible;
    }
  }
  .header--item {
    display: flex;
    align-items: flex-start;
  }
  .image-cover,
  .video-cover {
    position: absolute;
    left: 0;
    top: 100%;
    max-width: 32rem;
    visibility: hidden;
    pointer-events: none;
  }
}
</style>
