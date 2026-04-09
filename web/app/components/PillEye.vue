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
  const angleDeg = getAngle(clientX, clientY, anchorX, anchorY)
  // const width = pillRef.value.getBoundingClientRect().width / 2
  // const height = pillRef.value.getBoundingClientRect().height / 2

  // const centerX = pillRef.value.getBoundingClientRect().x + width
  // const centerY = pillRef.value.getBoundingClientRect().y + height

  // const diffX = clientX - centerX
  // const diffY = clientY - centerY

  // const radians = Math.atan2(diffX, diffY)
  // const degree = radians * (180 / Math.PI) * -1 - 180
  angle.value = angleDeg
}

function getAngle(cx, cy, ex, ey) {
  const dy = ey - cy
  const dx = ex - cx
  const rad = Math.atan2(dy, dx)
  const deg = (rad * 180) / Math.PI
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
    transform: translateX(calc(var(--pill-lh) / 2));
  }
}
</style>
