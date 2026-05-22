<script lang="ts" setup>
const props = defineProps<{
  wrapper: HTMLElement | null
  hover: boolean
}>()

const x = ref(0)
const y = ref(0)

function onMouseMove(e: MouseEvent) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  x.value = e.clientX
  y.value = e.clientY
}

watch(
  () => props.wrapper,
  (el, _, onCleanup) => {
    if (!el) return
    el.addEventListener('mousemove', onMouseMove)
    onCleanup(() => el.removeEventListener('mousemove', onMouseMove))
  },
  { immediate: true },
)
</script>

<template>
  <div
    class="thumbnail"
    :class="{ 'thumbnail--visible': hover }"
    :style="{
      transform: hover ? `translate(${x}px, ${y}px)` : 'none',
    }"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
.thumbnail {
  position: fixed;
  opacity: 0;
  left: 0;
  top: 0;
  pointer-events: none;
  will-change: transform;
  max-width: 400px;
  z-index: 10;

  &--visible {
    opacity: 1;
  }
}
</style>
