<script setup lang="ts">
import type { LocationMapUI } from '~/utils/sanity-api/sanity.types'
import Time from '../ui/Time.vue'

defineProps<{ input: LocationMapUI }>()
</script>

<template>
  <section class="module module--location-map-ui">
    <div class="inner">
      <div class="header">
        <h2 v-if="input.title" class="bubble">
          <div>{{ $localizeField(input.title) }}</div>
        </h2>
        <Time location="Berlin" />
      </div>
      <div class="">
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
          <div class="marker"></div>
        </div>
        <div class="footer">
          <a
            v-if="input.cta && input.cta.link"
            :href="input.cta.link"
            class="pill pill--stretch"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ input.cta.label || 'Get Directions' }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.module {
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--spacing-xs);
  }
  .map-container {
    margin-bottom: var(--spacing-md);
    position: relative;
    img {
      width: 100%;
      height: auto;
      border-radius: 0.5rem;
    }
    .marker {
      position: absolute;
      top: 17%;
      left: 51%;
      width: 1rem;
      height: 1rem;
      background-color: var(--color-white);
      mix-blend-mode: difference;
      border-radius: 50%;
    }
  }
}
@media (max-width: 800px) {
  .module {
  }
}
</style>
