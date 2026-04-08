<script setup lang="ts">
const { locale, setLocale, locales } = useI18n()
const { isMobile } = useIsMobile()
</script>

<template>
  <ul class="locale-switcher flex">
    <li v-for="lang in locales" :key="lang">
      <button
        :class="{
          'is-active': locale === lang.code,
          pill: true,
          'pill--stretch': isMobile,
        }"
        @click="setLocale(lang.code as 'en' | 'zh')"
      >
        <span>{{ lang.title }}</span>
      </button>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.locale-switcher {
  li {
    margin: 0;
    text-transform: capitalize;
  }
  @media (max-width: 800px) {
    li {
      .pill--stretch {
        width: 100%;
      }
    }
  }
}
</style>
