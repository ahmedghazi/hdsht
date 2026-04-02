<script setup lang="ts">
import type { SETTINGS_QUERY_RESULT } from '~/utils/sanity-api/sanity.types'
import { useSanityLocale } from '~/composables/useSanityLocale'

const { settings } = defineProps<{ settings: SETTINGS_QUERY_RESULT }>()
const logos = settings?.logos
const navSecondary = settings?.navSecondary
const { scrollDirection, scrollEnd } = useScroll()

const { _localizeField } = useSanityLocale()
</script>

<template>
  <footer
    v-if="scrollDirection || scrollEnd"
    id="footer-site"
    :class="[
      scrollDirection && `is-${scrollDirection}`,
      { 'is-bottom': scrollEnd },
    ]"
  >
    <ul class="flex flex-wrap gap-md">
      <template v-if="logos">
        <li class="logo" v-for="(logo, index) in logos" :key="index">
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
      <nav v-if="navSecondary" class="nav-secondary">
        <div class="pills">
          <div class="pill--icon">
            <div><UiIcon value="dot" /></div>
          </div>
          <div class="pill--icon">
            <div><UiIcon value="dot" /></div>
          </div>
        </div>
        <ul>
          <li v-for="item in navSecondary" :key="item._key">
            <NuxtLink
              v-if="item.link"
              class="pill pill--stretch"
              :to="
                item._type === 'linkInternal'
                  ? _linkResolver(item.link as any)
                  : item.link
              "
              >{{
                item._type === 'linkInternal' && item.label
                  ? _localizeField(item.label)
                  : (item as { label?: string }).label
              }}</NuxtLink
            >
          </li>
        </ul>
      </nav>
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
      height: 10rem;
      width: auto;
    }
  }
  nav.nav-secondary {
    min-width: 50%;
    position: relative;
    .pills {
      position: absolute;
      left: 0;
      top: 0;
      transform: translateY(-50%);
      z-index: 3;
      display: flex;
      .pill--icon {
        background-color: var(--color-white);
        border-radius: 100%;
        padding: 0;
        color: var(--color-black);
        width: var(--pill-lh);
        height: var(--pill-lh);
        svg {
          transform: translateX(calc(var(--pill-lh) / 2));
          // height: var(--line-height-md);
          // width: calc(var(--pill-lh) / 11);
          // position: absolute;
          // left: 50%;
        }
      }
    }
    ul {
      display: flex;

      li {
        flex: 1;
      }
      li:first-child .pill {
        border-radius: 1rem 1rem 1rem 6rem;
      }
      li:last-child .pill {
        border-radius: 1rem 6rem 1rem 1rem;
      }
    }
  }

  @media (max-width: 800px) {
  }
}
</style>
