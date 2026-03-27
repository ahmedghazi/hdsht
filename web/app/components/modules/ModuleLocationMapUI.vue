<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import { portableTextComponents } from '~/utils/sanity-api/portableTextComponents'
import type { LocationMapUI } from '~/utils/sanity-api/sanity.types'

defineProps<{ input: LocationMapUI }>()
</script>

<template>
  <section class="module module--location-map-ui">
    <div class="inner">
      <div class="md:grid md:grid-cols-2 gap-md">
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
        <div class="content">
          <h2 v-if="input.title">{{ input.title.en }}</h2>
          <a
            v-if="input.cta && input.cta.link"
            :href="input.cta.link"
            class="cta-link"
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
  h2 {
    margin-bottom: 1rem;
  }
  .map-container {
    img {
      width: 100%;
      height: auto;
      border-radius: 0.5rem;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .cta-link {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    background-color: var(--color-primary);
    color: white;
    text-decoration: none;
    border-radius: 0.25rem;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: var(--color-primary-dark);
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
