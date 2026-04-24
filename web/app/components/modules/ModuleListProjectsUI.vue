<script setup lang="ts">
import type { ListProjectsUI } from '~/utils/sanity-api/sanity.types'
import type { ProjectExpanded } from '~/utils/sanity-api/sanity-expanded.types'
import type { Filters } from '~/utils/sanity-api/sanity-extend.types'

type ListProjectsUIExpanded = Omit<ListProjectsUI, 'items'> & {
  items?: ProjectExpanded[] | null
}

const { input } = defineProps<{ input: ListProjectsUIExpanded }>()

// État local pour les projets filtrés reçus du composant ProjectFilters
const filteredItems = ref<ProjectExpanded[]>([])
const activeFilters = ref<Filters[]>([])

// Callback pour recevoir les projets filtrés
function onFilteredItemsUpdate(items: ProjectExpanded[]) {
  filteredItems.value = items
}
function onActiveFilters(filters: Filters[]) {
  console.log('activeFilters', filters)
  activeFilters.value = filters
}
</script>

<template>
  <section
    id="projects"
    ref="moduleRef"
    :class="['module', 'module--list-projects-ui', 'md:col-span-2']"
  >
    <!-- <pre>{{ filteredItems }}</pre> -->
    <ProjectsFilters
      :projects="input.items || null"
      @update:filtered-items="onFilteredItemsUpdate"
      @active-filters="onActiveFilters"
    />

    <!-- <div v-if="activeFilters" class="project-filters__active">
      <ProjectsFiltersActivePill
        v-for="service in activeFilters.services"
        :key="service"
        :label="service"
        @remove="clearFilter('services', service)"
      />
      <ProjectsFiltersActivePill
        v-for="client in activeFilters.clients"
        :key="client"
        :label="client"
        @remove="clearFilter('clients', client)"
      />
      <ProjectsFiltersActivePill
        v-for="year in activeFilters.years"
        :key="year"
        :label="year"
        @remove="clearFilter('years', year)"
      />
      <ProjectsFiltersActivePill
        v-for="id in activeFilters.ids"
        :key="id"
        :label="id"
        @remove="clearFilter('ids', id)"
      />
      <ProjectsFiltersActivePill
        v-if="activeFilters.search"
        :label="activeFilters.search"
        @remove="clearFilter('search')"
      />
    </div> -->

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

.project-filters__active {
  position: sticky;
  top: calc(var(--header-h) + var(--line-height-md));
  z-index: 10;
}

.no-results {
  padding: var(--spacing-md) 0;
  color: var(--color-grey);
  font-size: var(--font-size-lg);
}
</style>
