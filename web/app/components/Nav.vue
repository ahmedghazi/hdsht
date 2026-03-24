<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { SETTINGS_QUERY_RESULT } from '~/utils/sanity-api/sanity.types'
import { useSanityLocale } from '~/composables/useSanityLocale'
import LocaleSwitcher from './ui/LocaleSwitcher.vue'

const isMobile = ref<boolean>(false)
const isOpen = ref<boolean>(false)

defineProps<{
  navPrimary?: NonNullable<SETTINGS_QUERY_RESULT>['navPrimary']
}>()

const { _localizeField } = useSanityLocale()

onMounted(() => {
  if (window.innerWidth < 800) {
    isMobile.value = true
  }
})
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
  <nav @click="toggle(!isOpen)">
    <button class="toggle sm-only">{{ isOpen ? 'Close' : 'Menu' }}</button>
    <div class="menus-container" :class="{ 'is-open': isOpen === true }">
      <div class="inner flex">
        <ul v-if="navPrimary" class="nav-primary flex">
          <li v-for="li in navPrimary" :key="li._key" class="nav-item">
            <NuxtLink
              v-if="li._type === 'linkInternal' && li.link"
              :to="_linkResolver(li.link as any)"
              class="pill"
            >
              <span v-if="li.label">{{ _localizeField(li.label) }}</span>
            </NuxtLink>
          </li>
        </ul>
        <LocaleSwitcher />
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.menus-container .inner.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

a[aria-current='page'] {
  color: var(--color-secondary);
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
    padding-top: var(--spacing-xl);
    flex-direction: column;
    pointer-events: none;
    display: none;
    background: #fff;
    font-size: var(--text-lg);

    line-height: 1.1;
    &.is-open {
      pointer-events: all;
      display: block;
    }
    .inner.flex {
      flex-direction: column;
      align-items: start;
    }
    ul {
      flex-direction: column;
      letter-spacing: -0.05em;
      li:not(:last-child):after {
        content: '';
      }
      &.nav-socials li a {
        padding-left: 61px;
        padding-left: 0px;
        display: inline-block;
      }
    }
  }
}
</style>
