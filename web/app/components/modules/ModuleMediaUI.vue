<script setup lang="ts">
import type { MediaUI } from '~/utils/sanity-api/sanity.types'

defineProps<{ input: MediaUI }>()
</script>

<template>
  <div>
    <h2>ModuleMediaUI</h2>
    <pre>{{ input }}</pre>
  </div>
</template>
