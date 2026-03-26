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
      <div class="md:grid md:grid-cols-2 gap-md items-center">
        <div class="content">
          <h2 v-if="input.title">{{ input.title.en }}</h2>
        </div>
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
    </div>
  </section>
</template>

<style lang="scss" scoped>
.module {
  h2 {
    margin-bottom: 1rem;
  }
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
    .md\\:grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
}
</style>
