<script setup lang="ts">
import '@mux/mux-player'

const {
  assetId,
  caption,
  play = false,
  muted = true,
  volume = 0,
  loop = false,
  aspectRatio,
} = defineProps<{
  assetId?: string
  caption?: string
  play?: boolean
  muted?: boolean
  volume?: number
  loop?: boolean
  aspectRatio?: string
}>()

const emit = defineEmits<{
  timeUpdate: [value: string]
  toggle: []
}>()

type MuxPlayerEl = InstanceType<typeof import('@mux/mux-player').default>

const playerRef = ref<MuxPlayerEl | null>(null)

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':')
}

// Set initial mute state when the player element first mounts
watch(playerRef, (player) => {
  if (!player) return
  player.muted = muted
})

watch(
  () => play,
  (val) => {
    const player = playerRef.value
    if (!player) return
    if (val) player.play()
    else player.pause()
  },
  { immediate: true },
)

watch(
  () => muted,
  (val) => {
    if (playerRef.value) playerRef.value.muted = val
  },
)

watch(
  () => volume,
  (val) => {
    if (playerRef.value) playerRef.value.volume = val
  },
)

const aspectRatioCss = aspectRatio ? aspectRatio.replace(':', '/') : ''
</script>

<template>
  <mux-player
    v-if="assetId"
    ref="playerRef"
    :style="{ '--aspect-ratio': aspectRatioCss }"
    :playback-id="assetId"
    :metadata-video-id="assetId"
    :metadata-video-title="caption"
    :metadata-viewer-user-id="assetId"
    :loop="loop"
    @timeupdate="
      (e: Event) =>
        emit('timeUpdate', formatTime((e.target as any).currentTime))
    "
    @click="emit('toggle')"
  />
</template>

<style lang="scss">
mux-player {
  --controls: none;
  vertical-align: top;
  aspect-ratio: var(--aspect-ratio, 16/9);
}
</style>
