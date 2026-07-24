<script lang="ts" setup>
import { on } from '~/utils/pubsub'

const sounds = ['/audio/beep-1.mp3', '/audio/pop-1.mp3']
const { audioUnlocked, unlock } = useAudioUnlock()

function play() {
  if (!audioUnlocked.value) return
  const src = sounds[Math.floor(Math.random() * sounds.length)]
  const audio = new Audio(src)
  audio.volume = 0.02
  audio.play().catch(() => {})
}

let offSfx: (() => void) | undefined

onMounted(() => {
  offSfx = on('sfx', play)
  document.addEventListener('click', unlock)
})

onBeforeUnmount(() => {
  offSfx?.()
  document.removeEventListener('click', unlock)
})
</script>

<template>
  <div style="display: none"></div>
</template>
