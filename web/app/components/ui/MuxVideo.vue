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
  timeUpdate: [currentTime: string, duration: string]
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

// Set initial mute + volume when the player element first mounts
watch(playerRef, (player) => {
  if (!player) return
  player.muted = muted
  player.volume = volume
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
    if (!playerRef.value) return
    playerRef.value.muted = val
    // sync volume on unmute so the player doesn't blast at browser-stored level
    if (!val) playerRef.value.volume = volume
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
        emit(
          'timeUpdate',
          formatTime((e.target as any).currentTime),
          formatTime((e.target as any).duration),
        )
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
