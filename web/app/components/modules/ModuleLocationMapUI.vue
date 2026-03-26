<script setup lang="ts">
import type { LocationMapUI } from '~/utils/sanity-api/sanity.types'
import Time from '../ui/Time.vue'

defineProps<{ input: LocationMapUI }>()
</script>

<template>
  <section
    :class="[
      'module',
      'module--location-map-ui',
      `col-span-${input.colSize || 1}`,
    ]"
  >
    <div class="inner">
      <div class="header">
        <h2 v-if="input.title" class="bubble">
          <span>{{ input.title.en }}</span>
        </h2>
        <Time />
      </div>
      <div class="map-container">
        <img
          v-if="input.map && input.map.asset"
          class="map-image"
          :src="
            $urlFor(input.map as any)
              .width(800)
              .url()
          "
          :alt="input.title?.en || 'Location map'"
        />
      </div>
      <div class="footer">
        <a
          v-if="input.cta && input.cta.link"
          :href="input.cta.link"
          class="pill pill--stretch"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>{{ input.cta.label || 'Get Directions' }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.module {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--spacing-xs);
  }

  .map-container {
    margin-bottom: var(--spacing-md);
    img {
      width: 100%;
      height: auto;
    }
  }
}
@media (max-width: 800px) {
  .module {
  }
}
</style>
