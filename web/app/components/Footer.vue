<script setup lang="ts">
import type { SETTINGS_QUERY_RESULT } from '~/utils/sanity-api/sanity.types'

const { settings } = defineProps<{ settings: SETTINGS_QUERY_RESULT }>()

const { scrollDirection, scrollEnd } = useScroll()
</script>

<template>
  <footer
    id="footer-site"
    :class="[
      scrollDirection && `is-${scrollDirection}`,
      { 'is-bottom': scrollEnd },
    ]"
  >
    footer
  </footer>
</template>

<style lang="scss" scoped>
footer {
  padding: 0.313rem 0.563rem;
  padding: 0.313rem var(--spacing-sm);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 51;
  // transition: transform 0.3s ease-in-out;
  // &.is-down {
  //   transform: translateY(100%);
  // }
  // &.is-bottom {
  //   transform: translateY(0);
  // }

  .site-logo {
    height: 2.1rem;
    transform: translateY(4px);
  }
  @media (max-width: 800px) {
    position: static;
    transform: none !important;
    .site-logo {
      img {
        width: 100%;
        height: auto;
        max-height: 2.1rem;
      }
    }
  }
}
</style>
