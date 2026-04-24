<script lang="ts" setup>
import type { Accordion } from '~/utils/sanity-api/sanity.types'

defineProps<{ input: Accordion }>()
</script>

<template>
  <div class="accordion">
    <div v-for="(item, i) in input.items" :key="item._key">
      <UiAccordionItem :input="item" :is-active="i === 0" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
