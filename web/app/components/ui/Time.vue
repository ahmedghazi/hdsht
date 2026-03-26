<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'

const timeRef = ref<HTMLDivElement>()
const currentTime = ref('')

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

let intervalId: NodeJS.Timeout

onMounted(() => {
  updateTime()
  intervalId = setInterval(updateTime, 60000) // Update every minute
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <div ref="timeRef" class="time bubble">
    <span>{{ currentTime }}</span>
  </div>
</template>
