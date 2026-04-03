<script setup lang="ts">
defineProps<{ label: string }>()
defineEmits<{ remove: [] }>()
</script>

<template>
  <button class="pill pill--icon" @click="$emit('remove')">
    <div>
      <span>{{ label }}</span>
      <UiIcon value="dot" />
    </div>
  </button>
</template>
