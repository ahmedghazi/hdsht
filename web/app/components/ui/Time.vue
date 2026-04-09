<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps<{
  location?: string
}>()

const timeRef = ref<HTMLDivElement>()
const currentTime = ref('')

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: props.location ? getTimeZone(props.location) : undefined,
  })
}

const locationTimezones: Record<string, string> = {
  Berlin: 'Europe/Berlin',
  Paris: 'Europe/Paris',
  London: 'Europe/London',
  'New York': 'America/New_York',
  Tokyo: 'Asia/Tokyo',
  Dubai: 'Asia/Dubai',
  Sydney: 'Australia/Sydney',
}

const getTimeZone = (location: string): string => {
  return locationTimezones[location] ?? location
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
    <!-- <div v-if="location" class="location">{{ location }}</div> -->
    <div>{{ currentTime }}</div>
  </div>
</template>
