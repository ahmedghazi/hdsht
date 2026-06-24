<!-- <script lang="ts" setup>
import { input } from '#build/ui'
import type { Project } from '~/utils/sanity-api/sanity.types'

const { media, title } = defineProps<{
  title: string
  media?: Array<
    NonNullable<Project['media']>[number] extends infer M
      ? M extends { _type: 'video' }
        ? Omit<M, 'video'> & {
            video?: {
              asset?: {
                playbackId?: string
                data?: { aspect_ratio?: string; duration?: number }
              } | null
            } | null
          }
        : M
      : never
  > | null
}>()
const animeClass = ''
</script>

<template>
  <figure
    v-if="media"
    :class="[animeClass, `media--${media._type}`]"
    :title="title?.en"
  >
    <template v-if="media._type === 'image' && media.asset?._id">
      <Thumbnail
        :asset="media.asset"
        :size="360"
        :alt="$localizeField(media.caption) || ''"
      />
    </template>
    <template
      v-else-if="media._type === 'video' && media.video?.asset?.playbackId"
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
</template> -->
