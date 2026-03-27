<script setup lang="ts">
import type { GranularStripeUI } from '~/utils/sanity-api/sanity.types'

defineProps<{ input: GranularStripeUI }>()
</script>

<template>
  <section
    :class="[
      'module',
      'module--granular-stripe-ui',
      `col-span-${input.colSize || 1}`,
    ]"
  >
    <div class="inner">
      <div class="image-container">
        <img
          v-if="input.image && input.image.asset"
          class="stripe-image"
          :src="
            $urlFor(input.image as any)
              .width(600)
              .url()
          "
          :alt="input.title?.en || 'Stripe image'"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.module {
  .image-container {
    img {
      width: 100%;
      height: auto;
      border-radius: 0.5rem;
    }
  }
}
@media (max-width: 800px) {
  .module {
  }
}
</style>
