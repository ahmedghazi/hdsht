<script lang="ts" setup>
import { on } from '~/utils/pubsub'

const sounds = ['/audio/beep-1.mp3', '/audio/pop-1.mp3']
const { audioUnlocked } = useAudioUnlock()

function play() {
  console.log('play')
  console.log('audioUnlocked', audioUnlocked)
  if (!audioUnlocked.value) return
  const src = sounds[Math.floor(Math.random() * sounds.length)]
  new Audio(src).play().catch(() => {})
}

let offSfx: (() => void) | undefined

onMounted(() => {
  offSfx = on('sfx', play)
})

onBeforeUnmount(() => {
  offSfx?.()
})
</script>

<template>
  <div style="display: none"></div>
</template>
