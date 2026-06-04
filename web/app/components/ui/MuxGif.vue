<script setup lang="ts">
import Hls from 'hls.js'

const props = defineProps<{
  playbackId: string
  aspect?: string // ex: '16/9', '4/3', '1/1' — default '16/9'
}>()

const videoRef = useTemplateRef<HTMLVideoElement>('video')
const isLoaded = ref(false)

const posterUrl = computed(
  () => `https://image.mux.com/${props.playbackId}/thumbnail.jpg?time=0`,
)

const streamUrl = computed(
  () => `https://stream.mux.com/${props.playbackId}.m3u8?start=0&end=8`,
)

onMounted(() => {
  const video = videoRef.value
  if (!video) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isLoaded.value) {
          initHls(video)
          isLoaded.value = true
          observer.unobserve(video)
        }
      })
    },
    { rootMargin: '200px' },
  )

  observer.observe(video)
})

function initHls(video: HTMLVideoElement) {
  if (Hls.isSupported()) {
    const hls = new Hls({
      maxBufferLength: 8, // charge max 8s devant la position actuelle
      maxMaxBufferLength: 15, // plafond absolu même si le réseau est rapide
      startLevel: 0,
    })
    hls.loadSource(streamUrl.value)
    hls.attachMedia(video)
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      video.play().catch(() => {})
    })
  } else {
    // Safari — HLS natif
    video.src = streamUrl.value
    video.play().catch(() => {})
  }
}
</script>

<template>
  <div
    class="mux-gif"
    :style="{ aspectRatio: aspect?.replace(':', '/') ?? '16/9' }"
  >
    <video
      ref="video"
      :poster="posterUrl"
      autoplay
      muted
      loop
      playsinline
      preload="none"
    />
  </div>
</template>

<style scoped>
.mux-gif {
  position: relative;
  width: 100%;
  height: var(--line-height-2xl);
  overflow: hidden;
}

.mux-gif video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  min-height: var(--line-height-2xl);
  object-fit: cover;
}
</style>
