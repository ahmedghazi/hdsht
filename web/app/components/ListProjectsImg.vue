<script setup lang="ts">
import type { ProjectExpanded } from '~/utils/sanity-api/sanity-expanded.types'

defineProps<{ input: ProjectExpanded[] }>()
</script>

<template>
  <div class="projects-media">
    <ProjectCardImg
      v-for="(item, i) in input || []"
      :key="i"
      :input="item"
      :index="i"
    />
    <ProjectCardImg
      v-for="(item, i) in input || []"
      :key="i"
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
