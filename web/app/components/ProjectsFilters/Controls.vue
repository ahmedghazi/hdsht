<script setup lang="ts">
const emit = defineEmits<{ 'toggle-filter': []; 'toggle-sort': [] }>()
const target = ref<string>('')
const _update = (val: string) => {
  target.value = val
  // $emit('toggle-filter')
}
watch(target, () => {
  if (!target.value) return
  if (target.value === 'toggle-filter') {
    emit('toggle-filter')
  } else if (target.value === 'toggle-sort') {
    emit('toggle-sort')
  }
})
</script>

<template>
  <div class="project-filters__controls">
    <button
      class="pill"
      :class="{ 'is-active': target === 'toggle-filter' }"
      @click="_update('toggle-filter')"
    >
      <span>{{ $localizeText('filter') }}</span>
    </button>
    <button
      class="pill"
      :class="{ 'is-active': target === 'toggle-sort' }"
      @click="_update('toggle-sort')"
    >
      <span>{{ $localizeText('sort') }}</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.project-filters__controls {
  display: flex;
}
</style>
