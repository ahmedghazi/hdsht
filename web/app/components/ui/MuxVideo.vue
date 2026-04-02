<script setup lang="ts">
import '@mux/mux-player'

const {
  assetId,
  caption,
  autoplay = false,
  play = false,
  aspectRatio,
} = defineProps<{
  assetId?: string
  caption?: string
  autoplay?: boolean
  play?: boolean
  aspectRatio?: string
}>()

const emit = defineEmits<{
  onTimeUpdate: [value: string]
  isPlaying: [value: boolean]
}>()

const currentTime = ref('00:00:00')
const playerRef = ref<InstanceType<
  typeof import('@mux/mux-player').default
> | null>(null)
// const playState = ref<'playing' | 'paused'>('paused')
const isPlaying = useState<boolean>('player.isPlaying', () => play)

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':')
}

function onTimeUpdate(e: Event) {
  const player = e.target as HTMLElement & { currentTime: number }
  currentTime.value = formatTime(player.currentTime)
  emit('onTimeUpdate', currentTime.value)
}

function togglePlay() {
  isPlaying.value = !isPlaying.value
}

watch(
  isPlaying,
  (val) => {
    // console.log(isPlaying.value)
    const player = playerRef.value
    if (player) {
      if (val) {
        player.play()
      } else {
        player.pause()
      }
      emit('isPlaying', isPlaying.value)
    }
    // logique...
  },
  {
    immediate: true, // exécute aussi au montage avec la valeur initiale
  },
)
const aspectRatioMuxToCss = aspectRatio ? aspectRatio.replace(':', '/') : ''
</script>

<template>
  <mux-player
    :style="{ '--aspect-ratio': aspectRatioMuxToCss }"
    v-if="assetId"
    ref="playerRef"
    :playback-id="assetId"
    :metadata-video-id="assetId"
    :metadata-video-title="caption"
    :metadata-viewer-user-id="assetId"
    :autoplay="autoplay && 'muted'"
    :loop="autoplay"
    @timeupdate="onTimeUpdate"
    @click="togglePlay"
  />
</template>

<style lang="scss">
mux-player {
  --controls: none;
  vertical-align: top;
  aspect-ratio: var(--aspect-ratio, 16/9);
}
</style>
