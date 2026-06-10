<script setup lang="ts">
import type { SETTINGS_QUERY_RESULT } from '~/utils/sanity-api/sanity.types'
import PillEye from './PillEye.vue'
defineProps<{
  navSecondary?: NonNullable<SETTINGS_QUERY_RESULT>['navSecondary']
}>()
</script>

<template>
  <nav class="nav-secondary">
    <ul>
      <li v-for="item in navSecondary" :key="item._key">
        <NuxtLink
          v-if="item.link"
          class="pill pill--stretch bubble-"
          :to="
            item._type === 'linkInternal'
              ? _linkResolver(item.link as any)
              : item.link
          "
        >
          <span>
            {{
              item._type === 'linkInternal' && item.label
                ? $localizeField(item.label)
                : (item as { label?: string }).label
            }}
          </span></NuxtLink
        >
      </li>
    </ul>
    <!-- <div class="pills">
      <PillEye />
      <PillEye />
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
              ? $localizeField(item.label)
              : (item as { label?: string }).label
          }}</NuxtLink
        >
      </li>
    </ul> -->
  </nav>
</template>

<style lang="scss">
nav.nav-secondary {
  min-width: calc(50dvw - var(--spacing-lg) + calc(var(--spacing-sm)));
  position: relative;
  z-index: 1;
  // max-width: 50%;
  // .pills {
  //   position: absolute;
  //   left: 0;
  //   top: 0;
  //   transform: translateY(-50%);
  //   // z-index: 3;
  //   z-index: 1;
  //   display: flex;
  //   // .pill--icon {
  //   //   background-color: var(--color-white);
  //   //   border-radius: 100%;
  //   //   padding: 0;
  //   //   color: var(--color-black);
  //   //   width: var(--pill-lh);
  //   //   height: var(--pill-lh);
  //   //   svg {
  //   //     transform: translateX(calc(var(--pill-lh) / 2));
  //   //   }
  //   // }
  // }
  ul {
    display: flex;
    justify-content: flex-end;
    li {
      flex: 1;
    }
    // li:first-child .pill {
    //   border-radius: 1rem 1rem 1rem 6rem;
    // }
    // li:last-child .pill {
    //   border-radius: 1rem 6rem 1rem 1rem;
    // }
  }
  @media (max-width: 800px) {
    width: 100%;
    ul {
      // flex-direction: column;

      // li:first-child .pill {
      //   border-radius: 1rem 6rem 1rem 6rem;
      // }
      // li:last-child .pill {
      //   border-radius: 6rem 1rem 6rem 1rem;
      // }
    }
  }
}
</style>
