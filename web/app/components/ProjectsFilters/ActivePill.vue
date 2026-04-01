<script setup lang="ts">
defineProps<{ label: string }>()
defineEmits<{ remove: [] }>()
</script>

<template>
  <div class="pill pill--icon" @click="$emit('remove')">
    <div>
      <span>{{ label }}</span>
      <span class="pill__remove">
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
      </span>
    </div>
  </div>
</template>
