<script setup lang="ts">
defineEmits<{ 'toggle-filter': []; 'toggle-sort': [] }>()
</script>

<template>
  <div class="project-filters__controls">
    <button class="pill" @click="$emit('toggle-filter')">
      <span>{{ $localizeText('Filter') }}</span>
    </button>
    <button class="pill" @click="$emit('toggle-sort')">
      <span>{{ $localizeText('Sort') }}</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.project-filters__controls {
  display: flex;
}
</style>
