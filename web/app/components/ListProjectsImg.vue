<script setup lang="ts">
import type { ProjectExpanded } from '~/utils/sanity-api/sanity-expanded.types'

defineProps<{ input: ProjectExpanded[] }>()
</script>

<template>
  <div class="projects-index">
    <ProjectCardImg v-for="(item, i) in input || []" :key="i" :input="item" />
  </div>
</template>

<style scoped lang="scss">
.projects-index {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
}
</style>
