<script setup lang="ts">
const emit = defineEmits<{
  change: [value: boolean]
}>()

const active = ref(false)

function toggle() {
  active.value = !active.value
  emit('change', active.value)
}
</script>

<template>
  <button
    :class="{ 'pill--icon': true, 'pill--icon--active': active }"
    @click="toggle"
  >
    <UiIcon :value="active ? 'x' : 'dots'" />
  </button>
</template>

<style scoped lang="scss">
button.pill--icon:not(.pill--icon--active) {
  span svg {
    opacity: 0;
  }
  span svg:nth-child(1) {
    opacity: 0.3;
  }
  span svg:nth-child(2) {
    opacity: 0.6;
  }
}
</style>
