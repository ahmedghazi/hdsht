<script setup lang="ts">
const { currentSort, sortOptions } = defineProps<{
  currentSort: { key: string; order: 'asc' | 'desc' }
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
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 8 8.002"
              width="8"
              height="8"
            >
              <g
                id="system_icon_arrow"
                transform="translate(8 8.002) rotate(180)"
              >
                <rect
                  id="Rectangle_4239"
                  data-name="Rectangle 4239"
                  width="8"
                  height="8"
                  transform="translate(8) rotate(90)"
                  fill="none"
                />
                <path
                  id="Union_2"
                  data-name="Union 2"
                  d="M20152.266,14213.979v-5.588l-2.383,2.386-.881-.885,3.891-3.891,3.891,3.891-.887.88-2.383-2.378v5.585Z"
                  transform="translate(-20148.891 -14205.977)"
                  fill="#fefefe"
                />
              </g>
            </svg>
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
  &.asc {
    transform: scaleY(-1);
  }

  &.desc {
    transform: scaleY(1);
  }
}
</style>
