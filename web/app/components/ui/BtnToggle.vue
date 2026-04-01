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
    <div v-if="active">
      <UiIcon value="x" />
    </div>
    <div v-else>
      <div class="flex gap-02!">
        <UiIcon value="dots" />
      </div>
    </div>
  </button>
</template>

<style scoped lang="scss">
button:not(.pill--icon--active) {
  svg:nth-child(1) {
    opacity: 0.3;
  }
  svg:nth-child(2) {
    opacity: 0.6;
  }
}
</style>
