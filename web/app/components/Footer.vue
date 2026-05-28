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
      <NavLegals :nav-secondary="navSecondary" />
    </ul>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  padding: var(--spacing-md);
  li {
    flex-shrink: 0;
    img {
      height: 7.9rem;
      // height: 10rem;
      width: auto;
    }
  }

  @media (max-width: 800px) {
    padding: var(--spacing-sm);
  }
}
</style>
