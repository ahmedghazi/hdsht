<script setup lang="ts">
import { ref } from 'vue'
import type { SETTINGS_QUERY_RESULT } from '~/utils/sanity-api/sanity.types'
import { useSanityLocale } from '~/composables/useSanityLocale'
import LocaleSwitcher from './ui/LocaleSwitcher.vue'

// const isMobile = ref<boolean>(false)
const isOpen = ref<boolean>(false)

defineProps<{
  navPrimary?: NonNullable<SETTINGS_QUERY_RESULT>['navPrimary']
  navSecondary?: NonNullable<SETTINGS_QUERY_RESULT>['navSecondary']
}>()

const { _localizeField } = useSanityLocale()
const { isMobile } = useIsMobile()
// onMounted(() => {
//   if (window.innerWidth < 800) {
//     isMobile.value = true
//   }
// })
const toggle = (val: boolean) => {
  isOpen.value = val
}

const route = useRoute()

watch(
  route,
  () => {
    toggle(false)
  },
  { deep: true, immediate: true },
)
</script>

<template>
  <div @click="toggle(!isOpen)">
    <button class="toggle sm-only pill--icon">
      <UiIcon :value="isOpen ? 'x' : 'dots'" />
    </button>
    <div class="menus-container" :class="{ 'is-open': isOpen === true }">
      <div class="inner flex">
        <nav v-if="navPrimary" class="nav-primary">
          <ul class="flex">
            <li
              v-for="li in navPrimary"
              :key="li._key"
              :class="[
                'nav-item',
                `nav-item--${li._type === 'linkInternal' && $localizeField(li.label)}`,
              ]"
            >
              <NuxtLink
                v-if="li._type === 'linkInternal' && li.link"
                :to="_linkResolver(li.link as any)"
                :class="['pill', { 'pill--stretch': isMobile }]"
              >
                <span v-if="li.label">{{ $localizeField(li.label) }}</span>
              </NuxtLink>
            </li>
          </ul>
        </nav>
        <LocaleSwitcher />
        <NavLegals
          v-if="navSecondary && isMobile"
          :nav-secondary="navSecondary"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menus-container .inner.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 800px) {
  button {
    z-index: 10;
    position: relative;
    text-decoration: none;
  }
  .menus-container {
    position: fixed;
    z-index: 9;
    inset: 0;
    height: 100dvh;
    padding: var(--spacing-sm);
    padding-top: calc(var(--header-h) + var(--spacing-md));
    flex-direction: column;
    pointer-events: none;
    display: none;
    font-size: var(--text-lg);
    background-color: var(--color-bg);

    line-height: 1.1;
    &.is-open {
      pointer-events: all;
      display: block;
    }
    .inner.flex {
      flex-direction: column;
      align-items: start;
    }
    nav {
      width: 100%;
      &.nav-secondary {
        margin-top: 2.9rem;
      }
    }

    ul {
      // flex-direction: column;
      width: 100%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      .nav-item--Information {
        grid-column: 1 / -1;
      }
    }
  }
}
</style>
