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
      <svg
        id="system_icon_x"
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="30"
        viewBox="0 0 15 30"
      >
        <rect
          id="Rectangle_4200"
          data-name="Rectangle 4200"
          width="15"
          height="30"
          fill="none"
          opacity="0"
        />
        <rect
          id="Rectangle_4202"
          data-name="Rectangle 4202"
          width="1.25"
          height="16"
          transform="translate(12.715 9) rotate(45)"
          fill="#fefefe"
        />
        <rect
          id="Rectangle_4201"
          data-name="Rectangle 4201"
          width="1.25"
          height="16"
          transform="translate(1.401 9.884) rotate(-45)"
          fill="#fefefe"
        />
      </svg>
    </div>
    <div v-else>
      <svg
        id="system_icon_dot"
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="30"
        viewBox="0 0 5 30"
      >
        <rect
          id="Rectangle_4191"
          data-name="Rectangle 4191"
          width="5"
          height="30"
          fill="none"
          opacity="0"
        />
        <circle
          id="Ellipse_460"
          data-name="Ellipse 460"
          cx="1.35"
          cy="1.35"
          r="1.35"
          transform="translate(1.15 17)"
          fill="#fefefe"
        />
      </svg>
      <svg
        id="system_icon_dot"
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="30"
        viewBox="0 0 5 30"
      >
        <rect
          id="Rectangle_4191"
          data-name="Rectangle 4191"
          width="5"
          height="30"
          fill="none"
          opacity="0"
        />
        <circle
          id="Ellipse_460"
          data-name="Ellipse 460"
          cx="1.35"
          cy="1.35"
          r="1.35"
          transform="translate(1.15 17)"
          fill="#fefefe"
        />
      </svg>
      <svg
        id="system_icon_dot"
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="30"
        viewBox="0 0 5 30"
      >
        <rect
          id="Rectangle_4191"
          data-name="Rectangle 4191"
          width="5"
          height="30"
          fill="none"
          opacity="0"
        />
        <circle
          id="Ellipse_460"
          data-name="Ellipse 460"
          cx="1.35"
          cy="1.35"
          r="1.35"
          transform="translate(1.15 17)"
          fill="#fefefe"
        />
      </svg>
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
