<script setup lang="ts">
defineProps<{ label: string }>()
defineEmits<{ remove: [] }>()
</script>

<template>
  <div class="pill pill--icon" @click="$emit('remove')">
    <div>
      <span>{{ label }}</span>
      <span class="pill__remove">
        <UiIcon value="x" />
      </span>
    </div>
  </div>
</template>
