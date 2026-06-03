<script setup lang="ts">
import type { ProjectExpanded } from '~/utils/sanity-api/sanity-expanded.types'

const props = defineProps<{
  input: ProjectExpanded[]
  itemRefs?: string[]
  total?: number
}>()

const PAGE_SIZE = 12

function shuffleBatch(arr: ProjectExpanded[]): ProjectExpanded[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j]!, a[i]!]
  }
  return a
}

const items = ref<ProjectExpanded[]>(shuffleBatch(props.input))
const loadedCount = ref(props.input.length)
const isLoading = ref(false)
const sentinel = ref<HTMLElement | null>(null)

const hasMore = computed(
  () => !!props.itemRefs && loadedCount.value < props.itemRefs.length,
)

async function loadMore() {
  if (isLoading.value || !hasMore.value || !props.itemRefs) return
  isLoading.value = true
  const nextIds = props.itemRefs.slice(loadedCount.value, loadedCount.value + PAGE_SIZE)
  try {
    const data = await $fetch<ProjectExpanded[]>('/api/projects', {
      query: { ids: nextIds },
    })
    items.value.push(...shuffleBatch(data))
    loadedCount.value += nextIds.length
  }
  finally {
    isLoading.value = false
  }
}

let obs: IntersectionObserver | null = null

onMounted(() => {
  if (!sentinel.value) return
  obs = new IntersectionObserver(
    ([entry]) => { if (entry?.isIntersecting) loadMore() },
    { rootMargin: '600px' },
  )
  obs.observe(sentinel.value)
})

onUnmounted(() => { obs?.disconnect() })
</script>

<template>
  <div v-if="items.length" class="projects-media">
    <LazyProjectCardImg
      v-for="(item, i) in items"
      :key="item._id"
      :input="item"
      :index="i"
    />
    <div ref="sentinel" class="load-sentinel" />
  </div>
</template>

<style scoped lang="scss">
.projects-media {
  padding-top: calc(var(--line-height-md) * 1);
}

.load-sentinel {
  height: 1px;
  width: 100%;
}
</style>
