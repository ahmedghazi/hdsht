<script setup lang="ts">
import '@mux/mux-player'

const { assetId, caption, index } = defineProps<{
  assetId?: string
  caption?: string
  index: number
}>()

/*
:autoplay="'muted'"
:loop="true"
*/

const currentTime = ref('00:00:00')
const playerRef = ref<InstanceType<
  typeof import('@mux/mux-player').default
> | null>(null)
// const playState = ref<'playing' | 'paused'>('paused')
const isPlaying = useState<boolean>('player.isPlaying', () => false)

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':')
}

function onTimeUpdate(e: Event) {
  const player = e.target as HTMLElement & { currentTime: number }
  currentTime.value = formatTime(player.currentTime)
}

// function togglePlay() {
//   const player = playerRef.value
//   if (!player) return
//   player.paused ? player.play() : player.pause()
//   playState.value = player.paused ? 'paused' : 'playing'
// }
function togglePlay() {
  isPlaying.value = !isPlaying.value
}

watch(
  isPlaying,
  (val) => {
    console.log(isPlaying.value)
    const player = playerRef.value
    if (player) {
      if (val) {
        player.play()
      } else {
        player.pause()
      }
    }
    // logique...
  },
  {
    immediate: true, // exécute aussi au montage avec la valeur initiale
  },
)
</script>

<template>
  <figure :class="{ 'is-playing': isPlaying, 'is-paused': !isPlaying }">
    <div class="header">
      <figcaption v-if="caption">
        <div class="bubble bubble-dots-n-primary">
          <div>
            <span class="dots ellipsis">{{ caption }}</span>
            <span class="font-primary">{{ index }}</span>
          </div>
        </div>
      </figcaption>
      <div class="timer bubble">
        <div>
          <span>{{ currentTime }}</span>
          <!-- <span v-if="!isPlaying" class="ml-sm inline-block">⏸︎</span> -->
        </div>
      </div>
    </div>
    <mux-player
      v-if="assetId"
      ref="playerRef"
      :playback-id="assetId"
      :metadata-video-id="assetId"
      :metadata-video-title="caption"
      :metadata-viewer-user-id="assetId"
      @timeupdate="onTimeUpdate"
      @click="togglePlay"
    />
  </figure>
</template>

<style lang="scss">
figure {
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  &.is-paused {
    cursor:
      url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='40'><text x='50%' y='50%' font-family='sans-serif' font-weight='' font-size='14' dominant-baseline='middle' text-anchor='middle' fill='white'>Play</text></svg>")
        16 0,
      auto;
  }
  &.is-playing {
    cursor:
      url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='40'><text x='50%' y='50%' font-family='sans-serif' font-weight='' font-size='14' dominant-baseline='middle' text-anchor='middle' fill='white'>Pause</text></svg>")
        16 0,
      auto;
  }
}
mux-player {
  --controls: none;
  vertical-align: top;
}
</style>
