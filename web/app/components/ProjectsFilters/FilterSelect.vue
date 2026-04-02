<script setup lang="ts">
defineProps<{ label: string; options: string[]; modelValue: string }>()
defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <div class="select-ui">
    <select
      class="select-ui-inner max-w-[9em] truncate"
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
  </div>
</template>
