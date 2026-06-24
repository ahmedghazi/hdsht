<script setup lang="ts">
type IconValue = 'x' | 'dots' | 'dot' | 'arrowS' | 'arrowN'

defineProps<{
  value: IconValue
}>()
</script>

<template>
  <!-- X -->
  <svg
    v-if="value === 'x'"
    id="system_icon_x"
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="30"
    viewBox="0 0 15 30"
  >
    <rect width="15" height="30" fill="none" opacity="0" />
    <rect
      width="1.25"
      height="16"
      transform="translate(12.715 9) rotate(45)"
      fill="currentColor"
    />
    <rect
      width="1.25"
      height="16"
      transform="translate(1.401 9.884) rotate(-45)"
      fill="currentColor"
    />
  </svg>

  <!-- Dot -->
  <svg
    v-else-if="value === 'dot'"
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="10"
    viewBox="0 0 10 10"
  >
    <circle cx="5" cy="5" r="5" fill="currentColor" />
  </svg>

  <!-- Dots -->
  <span v-else-if="value === 'dots'" class="flex gap-02!">
    <svg
      v-for="i in 3"
      :key="i"
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="30"
      viewBox="0 0 5 30"
    >
      <circle
        cx="1.35"
        cy="1.35"
        r="1.35"
        transform="translate(1.15 17)"
        fill="currentColor"
      >
        <animate
          attributeName="opacity"
          values="0.25;1;0.25"
          dur="0.8s"
          repeatCount="indefinite"
          :begin="`${(i - 1) * 0.15}s`"
        />
      </circle>
    </svg>
  </span>
  <!-- <span v-else-if="value === 'dots'" class="flex gap-02!">
    <svg
      v-for="i in 3"
      :key="i"
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="30"
      viewBox="0 0 5 30"
      :opacity="1 / 4 + i * (1 / 4)"
    >
      {{ i }}
      <circle
        cx="1.35"
        cy="1.35"
        r="1.35"
        transform="translate(1.15 17)"
        fill="currentColor"
      />
    </svg>
  </span> -->

  <!-- Arrow North (up) — no rotation -->

  <svg
    v-else-if="value === 'arrowN'"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 15 30"
    style="enable-background: new 0 0 15 30"
    xml:space="preserve"
  >
    <g transform="translate(8 8.002) rotate(180)">
      <path
        fill="currentColor"
        d="M1.1-11v5.6l2.4-2.4l0.9,0.9L0.5-3l-3.9-3.9l0.9-0.9l2.4,2.4V-11H1.1z"
      />
    </g>
  </svg>

  <!-- Arrow Soutb (down) -->

  <svg
    v-else-if="value === 'arrowS'"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 15 30"
    style="enable-background: new 0 0 15 30"
    xml:space="preserve"
  >
    <g transform="translate(8 8.002) rotate(180)">
      <path
        fill="currentColor"
        d="M-0.1-3v-5.6l-2.4,2.4l-0.9-0.9L0.5-11l3.9,3.9L3.5-6.2L1.1-8.6V-3H-0.1z"
      />
    </g>
  </svg>
</template>
