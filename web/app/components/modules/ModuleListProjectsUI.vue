<script setup lang="ts">
import type { ListProjectsUI } from '~/utils/sanity-api/sanity.types'
import type { ProjectExpanded } from '~/utils/sanity-api/sanity-expanded.types'

type ListProjectsUIExpanded = Omit<ListProjectsUI, 'items'> & {
  items?: ProjectExpanded[] | null
}

const { input } = defineProps<{ input: ListProjectsUIExpanded }>()

// État local pour les projets filtrés reçus du composant ProjectFilters
const filteredItems = ref<ProjectExpanded[]>([])

// Callback pour recevoir les projets filtrés
function onFilteredItemsUpdate(items: ProjectExpanded[]) {
  filteredItems.value = items
}
</script>

<template>
  <section
    id="projects"
    ref="moduleRef"
    :class="['module', 'module--list-projects-ui', 'col-span-2']"
  >
    <ProjectsFilters
      :projects="input.items || null"
      @update:filtered-items="onFilteredItemsUpdate"
    />

    <template v-if="input.layout === 'txt' && filteredItems.length">
      <ListProjectsTxt :input="filteredItems" />
    </template>
    <template v-if="input.layout === 'img' && filteredItems.length">
      <ListProjectsImg :input="filteredItems" />
    </template>

    <div v-else-if="!filteredItems.length" class="no-results">
      No projects match current filters
    </div>
  </section>
</template>

<style lang="scss" scoped>
.module {
  scroll-margin-top: calc(var(--header-h) + 1rem);
}

.no-results {
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--color-grey);
  font-size: var(--font-size-lg);
}
</style>
