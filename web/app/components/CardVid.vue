<script setup lang="ts">
import '@mux/mux-player'
import gsap from 'gsap'

const { assetId, caption, index } = defineProps<{
  assetId?: string
  caption?: string
  index: number
}>()

// audioUnlocked: false on fresh load, becomes true on first document click (useAudioUnlock)
// muted stays true until unlocked — volume is always 0 at start regardless
const { audioUnlocked, unlock } = useAudioUnlock()

const currentTime = ref<number>(0)
const duration = ref<number>(0)
const progress = ref<number>(0)
const play = ref<boolean>(false)
const figureEl = useTemplateRef<HTMLElement>('figure')
const isHovered = ref(false)
// vol is a reactive object so GSAP can tween it; passed as :volume to UiMuxVideo
const vol = reactive({ value: 0 })

// muted = true until user clicks anywhere on the document
const isMuted = computed(() => !audioUnlocked.value)

function fadeVolume(target: number) {
  gsap.to(vol, { value: target, duration: 0.4, ease: 'power2.inOut' })
}

function onMouseEnter() {
  isHovered.value = true
  // only fade in if audio is already unlocked; otherwise stays silent
  if (audioUnlocked.value) fadeVolume(1)
}

function onMouseLeave() {
  isHovered.value = false
  fadeVolume(0)
}

function onDocumentClick() {
  unlock()
  // if the user clicks to unlock while already hovering, trigger the fade immediately
  if (isHovered.value) fadeVolume(1)
}

// play/pause driven by IntersectionObserver (50% visibility threshold)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!figureEl.value) return
  observer = new IntersectionObserver(
    (entries) => {
      play.value = entries[0]?.isIntersecting ?? false
    },
    { threshold: 0.5 },
  )
  observer.observe(figureEl.value)
  document.addEventListener('click', onDocumentClick)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  document.removeEventListener('click', onDocumentClick)
})

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':')
}
</script>

<template>
  <figure
    ref="figure"
    :class="{ 'is-playing': play, 'is-paused': !play }"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="header">
      <figcaption v-if="caption">
        <div class="bubble bubble-dots-n-primary">
          <div>
            <span class="dots ellipsis">{{ caption }}</span>
            <span class="font-primary">{{
              index < 10 ? `0${index}` : index
            }}</span>
          </div>
        </div>
      </figcaption>
      <div class="timer bubble">
        <div>
          <span v-if="currentTime">{{ formatTime(currentTime) }}</span>
          <span v-if="currentTime">/</span>
          <span v-if="duration">{{ formatTime(duration) }}</span>
        </div>
      </div>
      <!-- <div v-if="vol.value > 0" class="timer bubble">
        <span>{{ vol.value }}</span>
      </div> -->
    </div>

    <UiMuxVideo
      :asset-id="assetId"
      :caption="caption"
      :play="play"
      :muted="isMuted"
      :volume="vol.value"
      :loop="true"
      @time-update="
        (t, d) => {
          currentTime = t
          duration = d
          progress = currentTime / duration
        }
      "
    />
    <div
      class="progress"
      :style="{ left: `${progress * 100}%` }"
      :title="currentTime"
    ></div>
    <!-- <div class="progress">{{ duration }}</div>
    <div class="progress">{{ progress }}</div> -->
  </figure>
</template>

<style lang="scss">
figure {
  position: relative;
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
      url("data:image/svg+xml;utf8,<svg height='30' width='54' xmlns='http://www.w3.org/2020/svg'><text font-family='sans-serif' x='5' y='15' fill='white'>Pause</text> </svg>")
        22 15,
      auto;
  }
}
mux-player {
  --controls: none;
  vertical-align: top;
}
.progress {
  width: 0.5em;
  height: 0.5em;
  border-radius: 0.5em;
  background-color: var(--color-primary);
  mix-blend-mode: difference;
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translate(-50%, 50%);
  will-change: left;
  transition: left 0.2s;
}
</style>
