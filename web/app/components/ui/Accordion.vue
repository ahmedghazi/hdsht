<script lang="ts" setup>
import type { Accordion } from '~/utils/sanity-api/sanity.types'

defineProps<{ input: Accordion }>()
</script>

<template>
  <div class="accordion">
    <div v-for="item in input.items" :key="item._key">
      <UiAccordionItem :input="item" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
