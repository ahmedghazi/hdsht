<script setup lang="ts">
import '@mux/mux-player'
import gsap from 'gsap'

const { assetId, caption, index } = defineProps<{
  assetId?: string
  caption?: string
  index: number
}>()

const { audioUnlocked, unlock } = useAudioUnlock()

const currentTime = ref<string>('00:00:00')
const play = ref<boolean>(false)
const figureEl = useTemplateRef<HTMLElement>('figure')
const isHovered = ref(false)
const vol = reactive({ value: 0 })

const isMuted = computed(() => !audioUnlocked.value)

function fadeVolume(target: number) {
  gsap.to(vol, { value: target, duration: 0.6, ease: 'power2.inOut' })
}

function onMouseEnter() {
  isHovered.value = true
  if (audioUnlocked.value) fadeVolume(1)
}

function onMouseLeave() {
  isHovered.value = false
  fadeVolume(0)
}

function onDocumentClick() {
  unlock()
  if (isHovered.value) fadeVolume(1)
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!figureEl.value) return
  observer = new IntersectionObserver(
    (entries) => { play.value = entries[0]?.isIntersecting ?? false },
    { threshold: 0.5 },
  )
  observer.observe(figureEl.value)
  document.addEventListener('click', onDocumentClick)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  document.removeEventListener('click', onDocumentClick)
})
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
            <span class="font-primary">{{ index }}</span>
          </div>
        </div>
      </figcaption>
      <div class="timer bubble">
        <div>
          <span>{{ currentTime }}</span>
        </div>
      </div>
    </div>

    <UiMuxVideo
      :asset-id="assetId"
      :caption="caption"
      :play="play"
      :muted="isMuted"
      :volume="vol.value"
      @time-update="currentTime = $event"
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
      url("data:image/svg+xml;utf8,<svg height='30' width='54' xmlns='http://www.w3.org/2020/svg'><text font-family='sans-serif' x='5' y='15' fill='white'>Pause</text> </svg>")
        22 15,
      auto;
  }
}
mux-player {
  --controls: none;
  vertical-align: top;
}
</style>
