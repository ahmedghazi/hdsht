<script setup lang="ts">
const angle = ref<number>(0)
const pillRef = ref<HTMLElement>()

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
  })
})

function onMouseMove(e: MouseEvent) {
  const { clientX, clientY } = e
  if (!pillRef.value) return

  const rect = pillRef.value.getBoundingClientRect()
  const anchorX = rect.left + rect.width / 2
  const anchorY = rect.top + rect.height / 2
  const angleDeg = getAngle(anchorX, anchorY, clientX, clientY)

  angle.value = angleDeg
}

function getAngle(cx: number, cy: number, ex: number, ey: number) {
  const dy = ey - cy
  const dx = ex - cx
  const rad = Math.atan2(dy, dx)
  const deg = (rad * 180) / Math.PI + 180
  return deg
}
</script>

<template>
  <div
    ref="pillRef"
    class="pill--icon"
    :style="{ transform: `rotate(${angle}deg)` }"
  >
    <div><UiIcon value="dot" /></div>
  </div>
</template>

<style scoped lang="scss">
.pill--icon {
  background-color: var(--color-white);
  border-radius: 100%;
  padding: 0;
  color: var(--color-black);
  width: var(--pill-lh);
  height: var(--pill-lh);
  svg {
    transform: scale(0.65) translateX(calc(var(--pill-lh) / 2));
  }
}
</style>
