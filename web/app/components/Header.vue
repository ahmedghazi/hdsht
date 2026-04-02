<script setup lang="ts">
import type { SETTINGS_QUERY_RESULT } from '~/utils/sanity-api/sanity.types'
import Nav from './Nav.vue'

const { settings } = defineProps<{ settings: SETTINGS_QUERY_RESULT }>()

const { scrollDirection, scrollEnd } = useScroll()
</script>

<template>
  <header
    id="header-site"
    :class="[
      scrollDirection && `is-${scrollDirection}`,
      { 'is-bottom': scrollEnd },
    ]"
  >
    <div class="flex justify-between">
      <div class="site-name">
        <NuxtLink to="/" :title="settings?.siteName || 'HDSHT'">
          <HdShtLogo />
        </NuxtLink>
      </div>
      <Nav :navPrimary="settings?.navPrimary || []" :settings="settings" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  padding: var(--spacing-md);
  padding-bottom: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 51;
  // transition: transform 0.3s ease-in-out;
  // transform: translateY(0%);
  // &.is-down {
  //   transform: translateY(calc(var(--header-h) * -1));
  // }
  // &.is-bottom {
  //   transform: translateY(0%);
  // }

  .site-name {
    z-index: 10;
    position: relative;
    a:hover {
      text-decoration: none;
    }
  }
}
</style>
