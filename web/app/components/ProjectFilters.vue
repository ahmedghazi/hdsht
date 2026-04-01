<script setup lang="ts">
import type { ProjectExpanded } from '~/utils/sanity-api/sanity-expanded.types'

const props = defineProps<{ projects: ProjectExpanded[] | null }>()
const emit = defineEmits(['update:filtered-items'])

// État pour la visibilité des panneaux de filtre et de tri
const showFilterPanel = ref(false)
const showSortPanel = ref(false)

// État du tri
const currentSort = ref<{ key: string; order: 'asc' | 'desc' }>({
  key: 'ID',
  order: 'asc',
})

// Logique de filtrage
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
  // console.log(props.projects)
  // console.log(services)
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
  key: 'clients' | 'years' | 'services' | 'ids' | 'search',
  value: string | string[],
) {
  if (key === 'search') {
    activeFilters.search = value as string
  } else if (key === 'services') {
    // For services dropdown, treat as single selection for now
    activeFilters.services = value ? [value as string] : []
  } else if (Array.isArray(value)) {
    activeFilters[key] = value
  } else {
    // For other dropdowns, treat as single selection
    activeFilters[key] = value ? [value as string] : []
  }
}

function clearFilter(filterType: string, value?: string) {
  if (filterType === 'search') activeFilters.search = ''
  else if (filterType === 'clients' && value)
    activeFilters.clients = activeFilters.clients.filter(
      (item) => item !== value,
    )
  else if (filterType === 'years' && value)
    activeFilters.years = activeFilters.years.filter((item) => item !== value)
  else if (filterType === 'services' && value)
    activeFilters.services = activeFilters.services.filter(
      (item) => item !== value,
    )
  else if (filterType === 'ids' && value)
    activeFilters.ids = activeFilters.ids.filter((item) => item !== value)
  else if (filterType === 'all') clearAllFilters()
}

function clearAllFilters() {
  activeFilters.clients = []
  activeFilters.years = []
  activeFilters.services = []
  activeFilters.ids = []
  activeFilters.search = ''
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

// Projets filtrés et triés
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

  // Appliquer le tri
  return filtered.sort((a, b) => {
    let aValue: unknown = a[currentSort.value.key as keyof ProjectExpanded]
    let bValue: unknown = b[currentSort.value.key as keyof ProjectExpanded]

    // Gérer les valeurs localisées
    if (typeof aValue === 'object' && aValue && 'en' in aValue) {
      const localizedA = aValue as { en?: string; zh?: string }
      aValue = localizedA.en || localizedA.zh || ''
    }
    if (typeof bValue === 'object' && bValue && 'en' in bValue) {
      const localizedB = bValue as { en?: string; zh?: string }
      bValue = localizedB.en || localizedB.zh || ''
    }

    // Gérer spécifiquement les IDs pour tri numérique avec zéros devant
    if (currentSort.value.key === 'ID') {
      const aId = String(aValue || '')
      const bId = String(bValue || '')

      // Comparer numériquement si les deux sont des nombres avec zéros devant
      if (/^\d+$/.test(aId) && /^\d+$/.test(bId)) {
        const aNum = parseInt(aId, 10)
        const bNum = parseInt(bId, 10)
        return currentSort.value.order === 'asc' ? aNum - bNum : bNum - aNum
      }

      // Sinon, comparaison alphabétique normale
      return currentSort.value.order === 'asc'
        ? aId.localeCompare(bId)
        : bId.localeCompare(aId)
    }

    // Tri par défaut pour les autres champs
    if (currentSort.value.order === 'asc') {
      return String(aValue).localeCompare(String(bValue))
    } else {
      return String(bValue).localeCompare(String(aValue))
    }
  })
})

// Émettre les changements au parent
watch(
  filteredProjects,
  (newItems) => {
    emit('update:filtered-items', newItems)
  },
  { immediate: true },
)

function toggleFilterPanel() {
  showFilterPanel.value = !showFilterPanel.value
  if (showFilterPanel.value) {
    showSortPanel.value = false
  }
}

function toggleSortPanel() {
  showSortPanel.value = !showSortPanel.value
  if (showSortPanel.value) {
    showFilterPanel.value = false
  }
}

function toggleSort(key: string) {
  if (currentSort.value.key === key) {
    currentSort.value.order = currentSort.value.order === 'asc' ? 'desc' : 'asc'
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
    <!-- Boutons Filter et Sort -->
    <div class="project-filters__controls">
      <button class="pill" @click="toggleFilterPanel">
        <span>{{ $localizeText('Filter') }}</span>
      </button>

      <button class="pill" @click="toggleSortPanel">
        <span>{{ $localizeText('Sort') }}</span>
      </button>
    </div>

    <!-- Panneau de filtres -->
    <div v-if="showFilterPanel" class="project-filters__panel">
      <!-- <div class="project-filters__search">
        <input
          type="text"
          placeholder="Search projects..."
          class="bubble"
          :value="activeFilters.search"
          @input="
            updateFilter('search', ($event.target as HTMLInputElement).value)
          "
        />
      </div> -->

      <div class="project-filters__dropdowns">
        <select
          class="select-ui"
          :value="activeFilters.clients[0] || ''"
          @change="
            updateFilter('clients', ($event.target as HTMLSelectElement).value)
          "
        >
          <option value="">Clients</option>
          <option
            v-for="client in filterOptions.clients"
            :key="client"
            :value="client"
          >
            {{ client }}
          </option>
        </select>

        <select
          class="select-ui"
          :value="activeFilters.years[0] || ''"
          @change="
            updateFilter('years', ($event.target as HTMLSelectElement).value)
          "
        >
          <option value="">Years</option>
          <option v-for="year in filterOptions.years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>

        <select
          class="select-ui"
          :value="activeFilters.services[0] || ''"
          @change="
            updateFilter('services', ($event.target as HTMLSelectElement).value)
          "
        >
          <option value="">Services</option>
          <option
            v-for="service in filterOptions.services"
            :key="service"
            :value="service"
          >
            {{ service }}
          </option>
        </select>

        <!-- <pre>{{ filterOptions.services }}</pre> -->
        <!-- Services comme checkboxes -->
        <!-- <div class="project-filters__checkboxes">
          <div class="project-filters__checkboxes-label">Services</div>
          <div class="project-filters__checkboxes-grid">
            <label
              v-for="service in filterOptions.services"
              :key="service"
              class="pill pill--checkbox"
            >
              <input
                type="checkbox"
                :checked="activeFilters.services.includes(service || '')"
                @change="updateFilter('services', service || '')"
              />
              <span>{{ service }}</span>
            </label>
          </div>
        </div> -->

        <select
          class="select-ui"
          :value="activeFilters.ids[0] || ''"
          @change="
            updateFilter('ids', ($event.target as HTMLSelectElement).value)
          "
        >
          <option value="">IDs</option>
          <option v-for="id in filterOptions.ids" :key="id" :value="id">
            {{ id }}
          </option>
        </select>
      </div>
    </div>

    <!-- Panneau de tri -->
    <div v-if="showSortPanel" class="project-filters__panel">
      <div class="project-filters__sort-buttons">
        <div
          v-for="option in sortOptions"
          :key="option.key"
          class="pill pill--icon"
          @click="toggleSort(option.key)"
        >
          <span>{{ option.label }}</span>
          <span
            v-if="currentSort.key === option.key"
            class="sort-arrow"
            :class="{
              asc: currentSort.order === 'asc',
              desc: currentSort.order === 'desc',
            }"
          ></span>
        </div>
      </div>
    </div>

    <!-- Filtres actifs -->
    <div v-if="hasActiveFilters" class="project-filters__active">
      <!-- Services -->
      <div
        v-for="service in activeFilters.services"
        :key="service"
        class="pill pill--icon"
        @click="clearFilter('services', service)"
      >
        {{ service }}
        <span class="pill__remove">×</span>
      </div>

      <!-- Clients -->
      <div
        v-for="client in activeFilters.clients"
        :key="client"
        class="pill pill--icon"
        @click="clearFilter('clients', client)"
      >
        {{ client }}
        <span class="pill__remove">×</span>
      </div>

      <!-- Years -->
      <div
        v-for="year in activeFilters.years"
        :key="year"
        class="pill pill--icon"
        @click="clearFilter('years', year)"
      >
        {{ year }}
        <span class="pill__remove">×</span>
      </div>

      <!-- IDs -->
      <div
        v-for="id in activeFilters.ids"
        :key="id"
        class="pill pill--icon"
        @click="clearFilter('ids', id)"
      >
        {{ id }}
        <span class="pill__remove">×</span>
      </div>

      <!-- Search -->
      <div
        v-if="activeFilters.search"
        class="pill pill--icon"
        @click="clearFilter('search')"
      >
        {{ activeFilters.search }}
        <span class="pill__remove">×</span>
      </div>
    </div>

    <!-- Compteur -->
    <div v-if="hasActiveFilters" class="project-filters__count">
      Showing {{ filteredProjects.length }} of
      {{ props.projects?.length || 0 }} projects
    </div>
  </div>
</template>

<style lang="scss" scoped>
.project-filters {
  &__controls {
    display: flex;
  }

  &__panel {
  }

  &__search {
    margin-bottom: var(--spacing-md);
    display: none;
    input {
      width: 100%;
      padding: var(--spacing-sm) var(--spacing-md);
      border: none;
      background: var(--color-white);
      color: var(--color-black);
      font-size: var(--font-size-base);

      &::placeholder {
        color: var(--color-grey);
      }
    }
  }

  &__dropdowns {
    display: flex;
    flex-wrap: wrap;

    select {
    }
  }

  &__checkboxes {
    &-label {
      font-weight: 600;
      margin-bottom: var(--spacing-xs);
      color: var(--color-black);
    }

    &-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: var(--spacing-sm);
    }
  }

  &__sort-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }

  &__active {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
  }

  &__count {
    font-size: var(--font-size-sm);
    color: var(--color-grey);
    margin-top: var(--spacing-sm);
  }
}

.pill--checkbox {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  cursor: pointer;
  padding: var(--spacing-xs) var(--spacing-sm);

  input {
    margin: 0;
  }

  span {
    user-select: none;
  }

  &:hover {
    background: var(--color-grey-light);
  }
}

.sort-arrow {
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;

  &.asc {
    border-bottom: 4px solid var(--color-black);
    transform: translateY(-2px);
  }

  &.desc {
    border-top: 4px solid var(--color-black);
    transform: translateY(2px);
  }
}
</style>
