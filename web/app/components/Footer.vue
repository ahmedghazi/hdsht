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
  padding: var(--spacing-md);

  // position: fixed;
  // bottom: 0;
  // left: 0;
  // width: 100%;
  // z-index: 51;
  // transition: transform 0.3s ease-in-out;
  // &.is-down {
  //   transform: translateY(100%);
  // }
  // &.is-bottom {
  //   transform: translateY(0);
  // }

  @media (max-width: 800px) {
  }
}
</style>
