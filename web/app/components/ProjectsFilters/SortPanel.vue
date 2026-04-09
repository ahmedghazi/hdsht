<script setup lang="ts">
const { currentSort, sortOptions } = defineProps<{
  currentSort: { key: string; order: 'asc' | 'desc' | 'random' }
  sortOptions: { key: string; label: string }[]
}>()

defineEmits<{ 'toggle-sort': [key: string] }>()
</script>

<template>
  <div class="project-filters__panel">
    <div class="project-filters__sort-buttons">
      <div
        v-for="option in sortOptions"
        :key="option.key"
        class="pill pill--icon"
        @click="$emit('toggle-sort', option.key)"
      >
        <div>
          <span>{{ option.label }}</span>
          <span
            v-if="currentSort.key === option.key"
            class="sort-arrow"
            :class="{
              asc: currentSort.order === 'asc',
              desc: currentSort.order === 'desc',
              random: currentSort.order === 'random',
            }"
          >
            <UiIcon
              :value="
                currentSort.order === 'asc'
                  ? 'arrowN'
                  : currentSort.order === 'desc'
                    ? 'arrowS'
                    : Math.random() > 0.5
                      ? 'arrowN'
                      : 'arrowS'
              "
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.project-filters__sort-buttons {
  display: flex;
  flex-wrap: wrap;
}

.sort-arrow {
}
</style>
