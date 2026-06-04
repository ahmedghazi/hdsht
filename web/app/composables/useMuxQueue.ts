// composable/useMuxQueue.ts
const MAX_CONCURRENT = 2 // max 3 vidéos qui chargent en même temps
const queue = ref<(() => void)[]>([])
const active = ref(0)

export function useMuxQueue() {
  function enqueue(load: () => void) {
    if (active.value < MAX_CONCURRENT) {
      active.value++
      load()
    } else {
      queue.value.push(load)
    }
  }

  function done() {
    active.value--
    if (queue.value.length > 0) {
      const next = queue.value.shift()!
      active.value++
      next()
    }
  }

  return { enqueue, done }
}
