<script setup lang="ts">
import '@mux/mux-player'

const { assetId, caption, index } = defineProps<{
  assetId?: string
  caption?: string
  index: number
}>()

const currentTime = ref<string>('00:00:00')
const play = ref<boolean>(false)

function onTimeUpdate(_currentTime: string) {
  currentTime.value = _currentTime
  console.log(_currentTime)
}
function onPlaying(_isPlaying: boolean) {
  play.value = _isPlaying
  console.log(_isPlaying)
}
</script>

<template>
  <figure :class="{ 'is-playing': play, 'is-paused': !play }">
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

    <UiMuxVideo
      :asset-id="assetId"
      :caption="caption"
      :play="play"
      @on-time-update="onTimeUpdate"
      @is-playing="onPlaying"
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
  &.is-paused mux-player {
    cursor:
      url("data:image/svg+xml;utf8,<svg height='30' width='54' xmlns='http://www.w3.org/2000/svg'><text font-family='sans-serif' x='5' y='15' fill='white'>Play</text> </svg>")
        22 15,
      auto;
  }
  &.is-playing mux-player {
    cursor:
      url("data:image/svg+xml;utf8,<svg height='30' width='54' xmlns='http://www.w3.org/2000/svg'><text font-family='sans-serif' x='5' y='15' fill='white'>Pause</text> </svg>")
        22 15,
      auto;
  }
}
mux-player {
  --controls: none;
  vertical-align: top;
}
</style>
