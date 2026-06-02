<script setup lang="ts">
import type { ProjectExpanded } from '~/utils/sanity-api/sanity-expanded.types'

const props = defineProps<{ input: ProjectExpanded[] }>()

// const shuffled = computed(() => {
//   const arr = [...(props.input || [])]
//   for (let i = arr.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1))
//     const tmp = arr[i]!
//     arr[i] = arr[j]!
//     arr[j] = tmp
//   }
//   return arr
// })
</script>

<template>
  <div v-if="input" class="projects-media">
    <LazyProjectCardImg
      v-for="(item, i) in input"
      :key="item._id"
      :input="item"
      :index="i"
    />
  </div>
</template>

<style scoped lang="scss">
.projects-media {
  padding-top: calc(var(--line-height-md) * 1);
  // display: flex;
  // flex-wrap: wrap;
  // align-items: flex-end;
}
</style>
