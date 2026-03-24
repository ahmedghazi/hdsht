<script lang="ts" setup>
import type { Client } from '~/utils/sanity-api/sanity.types'

const { input } = defineProps<{ input: Client }>()
</script>

<template>
  <div class="client">
    <div class="client__disc"></div>
    <div class="client__name">
      <div class="bubble bubble--lg">
        {{ input.name }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.client {
  // --background: #fff;
  // --color: #000;
  display: flex;
  // align-items: center;
  &__disc {
    width: var(--line-height-lg);
    height: var(--line-height-lg);
    // background: radial-gradient(
    //   circle at center,
    //   var(--color),
    //   var(--background)
    // );
    background: transparent
      radial-gradient(
        closest-side at 50% 50%,
        var(--color) 0%,
        var(--background) 100%
      )
      0% 0% no-repeat padding-box;

    border-radius: var(--line-height-lg);
  }

  &__name {
    color: var(--color);
  }
}
</style>
