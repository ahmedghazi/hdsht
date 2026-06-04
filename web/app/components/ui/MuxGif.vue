<script setup lang="ts">
import Hls from 'hls.js'

const props = defineProps<{
  playbackId: string
  aspect?: string // ex: '16/9', '4/3', '1/1' — default '16/9'
}>()

const { enqueue, done } = useMuxQueue()

const videoRef = useTemplateRef<HTMLVideoElement>('video')
const isLoaded = ref(false)

const posterUrl = computed(
  () => `https://image.mux.com/${props.playbackId}/thumbnail.jpg?time=0`,
)

const streamUrl = computed(
  () => `https://stream.mux.com/${props.playbackId}.m3u8?start=0&end=5`,
)

onMounted(() => {
  const video = videoRef.value
  if (!video) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isLoaded.value) {
          initHls(video) // passe par la queue
          isLoaded.value = true
          observer.unobserve(video)
        }
      })
    },
    {
      rootMargin: '50px', // ← réduit de 200px à 50px
      threshold: 0.1, // ← attend que 10% soit visible
    },
  )

  // Petit délai pour que la queue soit prête avant le premier batch
  setTimeout(() => observer.observe(video), 100)
})

function initHls(video: HTMLVideoElement) {
  enqueue(() => {
    if (Hls.isSupported()) {
      const hls = new Hls({
        maxBufferLength: 5,
        maxMaxBufferLength: 5,
        startLevel: 0,
      })
      hls.loadSource(streamUrl.value)
      hls.attachMedia(video)

      hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
        // Force qualité la plus basse après parsing
        hls.currentLevel = 0
        hls.loadLevel = 0
        video.play().catch(() => {})
        done()
      })

      // Stop le chargement après 5s de vidéo bufferisée
      hls.on(Hls.Events.BUFFER_APPENDED, () => {
        if (video.buffered.length > 0) {
          const bufferedEnd = video.buffered.end(video.buffered.length - 1)
          if (bufferedEnd >= 5) {
            hls.stopLoad()
          }
        }
      })

      hls.on(Hls.Events.ERROR, () => done())
    } else {
      // Safari — HLS natif
      video.src = streamUrl.value
      video.play().catch(() => {})
      done()
    }
  })
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
  border: 1px solid red;
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
