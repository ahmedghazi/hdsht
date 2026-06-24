<script setup lang="ts">
import type { SETTINGS_QUERY_RESULT } from '~/utils/sanity-api/sanity.types'

const { settings } = defineProps<{ settings: SETTINGS_QUERY_RESULT }>()
const logos = settings?.logos
const navSecondary = settings?.navSecondary
// const { scrollDirection, scrollEnd } = useScroll()
//    v-if="scrollDirection || scrollEnd"
</script>

<template>
  <footer
    id="footer-site"
    :class="[
      // scrollDirection && `is-${scrollDirection}`,
      // { 'is-bottom': scrollEnd },
    ]"
  >
    <ul class="flex items-center flex-wrap gap-md">
      <template v-if="logos">
        <li v-for="(logo, index) in logos" :key="index" class="logo">
          <img
            :src="$urlFor(logo).url()"
            alt=""
            height="79"
            :width="
              (logo?.asset?.metadata?.dimensions?.width ?? 0) /
                (logo?.asset?.metadata?.dimensions?.aspectRatio ?? 1) || 'auto'
            "
          />
        </li>
      </template>
      <li class="flex-2">
        <NavLegals :nav-secondary="navSecondary" />
      </li>
    </ul>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  padding: var(--spacing-md);
  position: relative;
  z-index: 0;
  li {
    flex-shrink: 0;
    &.flex-2 {
      display: flex;
      justify-content: flex-end;
    }
    img {
      height: 7.9rem;
      height: var(--line-height-lg);
      // height: 10rem;
      width: auto;
    }
  }

  @media (max-width: 1080px) {
    padding: var(--spacing-sm);
  }
}
</style>
