<script setup lang="ts">
interface FilterOptions {
  clients: string[]
  years: string[]
  services: string[]
  ids: string[]
}

const props = defineProps<{
  filterOptions: FilterOptions
  activeClients: string
  activeYears: string
  activeServices: string
  activeIds: string
}>()

const emit = defineEmits<{
  'update-filter': [key: 'clients' | 'years' | 'services' | 'ids', value: string]
}>()
</script>

<template>
  <div class="project-filters__panel">
    <div class="project-filters__dropdowns">
      <ProjectsFiltersFilterSelect
        label="Clients"
        :model-value="activeClients"
        :options="filterOptions.clients"
        @update:model-value="emit('update-filter', 'clients', $event)"
      />
      <ProjectsFiltersFilterSelect
        label="Years"
        :model-value="activeYears"
        :options="filterOptions.years"
        @update:model-value="emit('update-filter', 'years', $event)"
      />
      <ProjectsFiltersFilterSelect
        label="Services"
        :model-value="activeServices"
        :options="filterOptions.services"
        @update:model-value="emit('update-filter', 'services', $event)"
      />
      <ProjectsFiltersFilterSelect
        label="IDs"
        :model-value="activeIds"
        :options="filterOptions.ids"
        @update:model-value="emit('update-filter', 'ids', $event)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.project-filters__dropdowns {
  display: flex;
  flex-wrap: wrap;
}
</style>
