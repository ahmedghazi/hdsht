<script setup lang="ts">
defineProps<{ label: string; options: string[]; modelValue: string }>()
defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <select
    class="select-ui"
    :value="modelValue"
    @change="
      $emit('update:modelValue', ($event.target as HTMLSelectElement).value)
    "
  >
    <option value="">{{ $localizeText(label) }}</option>
    <option v-for="opt in options" :key="opt" :value="opt">
      {{ $localizeText(opt) }}
    </option>
  </select>
</template>
