<script setup lang="ts">
defineProps<{ label: string }>()
defineEmits<{ remove: [] }>()
</script>

<template>
  <div class="pill pill--icon" @click="$emit('remove')">
    <div>
      <span>{{ label }}</span>
      <UiIcon value="dot" />
      <!-- <span class="pill__remove">
      </span> -->
    </div>
  </div>
</template>
