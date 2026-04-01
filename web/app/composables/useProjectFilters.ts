import type { ProjectExpanded } from '~/utils/sanity-api/sanity-expanded.types'

export interface ProjectFilters {
  client: string
  year: string
  service: string
  id: string
  search: string
}

export interface FilterOptions {
  clients: string[]
  years: string[]
  services: string[]
  ids: string[]
}

export function useProjectFilters(projects: MaybeRef<ProjectExpanded[] | null>) {
  // État des filtres actifs
  const activeFilters = ref<ProjectFilters>({
    client: '',
    year: '',
    service: '',
    id: '',
    search: ''
  })

  // Options de filtres disponibles
  const filterOptions = computed<FilterOptions>(() => {
    if (!unref(projects)) return { clients: [], years: [], services: [], ids: [] }
    
    const projectList = unref(projects)
    
    const clients = [
      ...new Set(projectList.map((item) => item.client?.name).filter(Boolean)),
    ].sort()
    
    const years = [
      ...new Set(projectList.map((item) => item.year).filter(Boolean)),
    ].sort((a, b) => (b || '').localeCompare(a || ''))
    
    const services = [
      ...new Set(
        projectList
          .flatMap((item) => item.contributions?.map((service) => service.title))
          .filter(Boolean)
          .flatMap((title) => (title ? Object.values(title) : [])),
      ),
    ].sort()
    
    const ids = [
      ...new Set(projectList.map((item) => item.ID).filter(Boolean)),
    ].sort()
    
    return { clients, years, services, ids }
  })

  // Projets filtrés
  const filteredProjects = computed(() => {
    const projectList = unref(projects)
    if (!projectList) return []
    
    return projectList.filter((item) => {
      const matchesClient =
        !activeFilters.value.client ||
        item.client?.name === activeFilters.value.client
      const matchesYear =
        !activeFilters.value.year || item.year === activeFilters.value.year
      const matchesService =
        !activeFilters.value.service ||
        item.contributions?.some(
          (service) =>
            service.title && Object.values(service.title).includes(activeFilters.value.service),
        )
      const matchesId =
        !activeFilters.value.id || item.ID === activeFilters.value.id
      const matchesSearch =
        !activeFilters.value.search ||
        item.ID?.toLowerCase().includes(
          activeFilters.value.search.toLowerCase(),
        ) ||
        item.client?.name
          ?.toLowerCase()
          .includes(activeFilters.value.search.toLowerCase()) ||
        Object.values(item.title || {}).some((title) =>
          title?.toLowerCase().includes(activeFilters.value.search.toLowerCase()),
        )
      
      return (
        matchesClient &&
        matchesYear &&
        matchesService &&
        matchesId &&
        matchesSearch
      )
    })
  })

  // Actions
  function updateFilter<K extends keyof ProjectFilters>(
    key: K,
    value: ProjectFilters[K]
  ) {
    activeFilters.value[key] = value
  }

  function clearFilters() {
    activeFilters.value = {
      client: '',
      year: '',
      service: '',
      id: '',
      search: ''
    }
  }

  function hasActiveFilters() {
    return Object.values(activeFilters.value).some(value => value !== '')
  }

  return {
    // État
    activeFilters: readonly(activeFilters),
    filterOptions,
    filteredProjects,
    
    // Actions
    updateFilter,
    clearFilters,
    hasActiveFilters
  }
}
