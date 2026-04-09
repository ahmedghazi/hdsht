<script setup lang="ts">
import type { ProjectExpanded } from '~/utils/sanity-api/sanity-expanded.types'
import ProjectsFiltersControls from './Controls.vue'
import ProjectsFiltersFilterPanel from './FilterPanel.vue'
import ProjectsFiltersSortPanel from './SortPanel.vue'
import ProjectsFiltersActivePill from './ActivePill.vue'

const props = defineProps<{ projects: ProjectExpanded[] | null }>()
const emit = defineEmits(['update:filtered-items', 'active-filters'])

const showFilterPanel = ref(false)
const showSortPanel = ref(false)

const currentSort = ref<{ key: string; order: 'asc' | 'desc' | 'random' }>({
  key: 'ID',
  order: 'random',
})

const filterOptions = computed(() => {
  if (!props.projects) return { clients: [], years: [], services: [], ids: [] }

  const clients = [
    ...new Set(props.projects.map((item) => item.client?.name).filter(Boolean)),
  ].sort()

  const years = [
    ...new Set(props.projects.map((item) => item.year).filter(Boolean)),
  ].sort((a, b) => (b || '').localeCompare(a || ''))

  const services = [
    ...new Set(
      props.projects
        .flatMap((item) =>
          item.contributions?.map(
            (contribution) => contribution.service?.title?.en,
          ),
        )
        .filter(Boolean),
    ),
  ].sort()

  const ids = [
    ...new Set(props.projects.map((item) => item.ID).filter(Boolean)),
  ].sort()

  return { clients, years, services, ids }
})

const activeFilters = reactive({
  clients: [] as string[],
  years: [] as string[],
  services: [] as string[],
  ids: [] as string[],
  search: '',
})

function updateFilter(
  key: 'clients' | 'years' | 'services' | 'ids',
  value: string,
) {
  activeFilters[key] = value ? [value] : []
  emit('active-filters', activeFilters)
}

function clearFilter(filterType: string, value?: string) {
  if (filterType === 'search') {
    activeFilters.search = ''
  } else if (value) {
    const key = filterType as 'clients' | 'years' | 'services' | 'ids'
    activeFilters[key] = activeFilters[key].filter((item) => item !== value)
  } else if (filterType === 'all') {
    activeFilters.clients = []
    activeFilters.years = []
    activeFilters.services = []
    activeFilters.ids = []
    activeFilters.search = ''
  }
}

const hasActiveFilters = computed(() => {
  return (
    activeFilters.clients.length > 0 ||
    activeFilters.years.length > 0 ||
    activeFilters.services.length > 0 ||
    activeFilters.ids.length > 0 ||
    activeFilters.search !== ''
  )
})

const filteredProjects = computed(() => {
  if (!props.projects) return []

  const filtered = props.projects.filter((item) => {
    const matchesClient =
      activeFilters.clients.length === 0 ||
      (item.client?.name && activeFilters.clients.includes(item.client.name))
    const matchesYear =
      activeFilters.years.length === 0 ||
      (item.year && activeFilters.years.includes(item.year))
    const matchesService =
      activeFilters.services.length === 0 ||
      item.contributions?.some(
        (contribution) =>
          contribution.service?.title?.en &&
          activeFilters.services.includes(contribution.service.title.en),
      )
    const matchesId =
      activeFilters.ids.length === 0 ||
      (item.ID && activeFilters.ids.includes(item.ID))
    const matchesSearch =
      !activeFilters.search ||
      item.ID?.toLowerCase().includes(activeFilters.search.toLowerCase()) ||
      item.client?.name
        ?.toLowerCase()
        .includes(activeFilters.search.toLowerCase()) ||
      Object.values(item.title || {}).some((title) =>
        title?.toLowerCase().includes(activeFilters.search.toLowerCase()),
      )

    return (
      matchesClient &&
      matchesYear &&
      matchesService &&
      matchesId &&
      matchesSearch
    )
  })

  return filtered.sort((a, b) => {
    let aValue: unknown = a[currentSort.value.key as keyof ProjectExpanded]
    let bValue: unknown = b[currentSort.value.key as keyof ProjectExpanded]

    if (typeof aValue === 'object' && aValue && 'name' in aValue) {
      aValue = (aValue as { name?: string }).name || ''
    }
    if (typeof bValue === 'object' && bValue && 'name' in bValue) {
      bValue = (bValue as { name?: string }).name || ''
    }

    if (typeof aValue === 'object' && aValue && 'en' in aValue) {
      const localizedA = aValue as { en?: string; zh?: string }
      aValue = localizedA.en || localizedA.zh || ''
    }
    if (typeof bValue === 'object' && bValue && 'en' in bValue) {
      const localizedB = bValue as { en?: string; zh?: string }
      bValue = localizedB.en || localizedB.zh || ''
    }

    if (currentSort.value.key === 'ID') {
      if (currentSort.value.order === 'random') {
        // True random sort - different order each page load
        return Math.random() - 0.5
      }

      const aId = String(aValue || '')
      const bId = String(bValue || '')
      if (/^\d+$/.test(aId) && /^\d+$/.test(bId)) {
        const aNum = parseInt(aId, 10)
        const bNum = parseInt(bId, 10)
        return currentSort.value.order === 'asc' ? aNum - bNum : bNum - aNum
      }
      return currentSort.value.order === 'asc'
        ? aId.localeCompare(bId)
        : bId.localeCompare(aId)
    }

    if (currentSort.value.order === 'random') {
      // True random sort for non-ID keys
      return Math.random() - 0.5
    }

    return currentSort.value.order === 'asc'
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue))
  })
})

watch(filteredProjects, (newItems) => emit('update:filtered-items', newItems), {
  immediate: true,
})

function toggleFilterPanel() {
  showFilterPanel.value = !showFilterPanel.value
  if (showFilterPanel.value) showSortPanel.value = false
}

function toggleSortPanel() {
  showSortPanel.value = !showSortPanel.value
  if (showSortPanel.value) showFilterPanel.value = false
}

function closeAllPanels() {
  showSortPanel.value = false
  showFilterPanel.value = false
}

function toggleSort(key: string) {
  if (currentSort.value.key === key) {
    if (currentSort.value.order === 'asc') {
      currentSort.value.order = 'desc'
    } else if (currentSort.value.order === 'desc') {
      currentSort.value.order = 'random'
    } else {
      currentSort.value.order = 'asc'
    }
  } else {
    currentSort.value.key = key
    currentSort.value.order = 'asc'
  }
}

const sortOptions = [
  { key: 'ID', label: 'ID' },
  { key: 'client', label: 'Client' },
  { key: 'title', label: 'Project' },
  { key: 'year', label: 'Year' },
]
</script>

<template>
  <div class="project-filters">
    <ProjectsFiltersControls
      @toggle-filter="toggleFilterPanel"
      @toggle-sort="toggleSortPanel"
    />

    <ProjectsFiltersFilterPanel
      v-if="showFilterPanel"
      :filter-options="filterOptions"
      :active-clients="activeFilters.clients[0] || ''"
      :active-years="activeFilters.years[0] || ''"
      :active-services="activeFilters.services[0] || ''"
      :active-ids="activeFilters.ids[0] || ''"
      @update-filter="updateFilter"
    />

    <ProjectsFiltersSortPanel
      v-if="showSortPanel"
      :current-sort="currentSort"
      :sort-options="sortOptions"
      @toggle-sort="toggleSort"
    />

    <div v-if="hasActiveFilters" class="project-filters__active">
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
    </div>

    <button
      v-if="showFilterPanel || showSortPanel"
      @click="closeAllPanels"
      class="pill pill--icon"
    >
      <UiIcon value="x" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.project-filters {
  &__active {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
