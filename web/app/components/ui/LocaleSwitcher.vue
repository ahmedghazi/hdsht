<script setup lang="ts">
const { locale, setLocale, locales } = useI18n()
const { isMobile } = useIsMobile()
</script>

<template>
  <!-- <ul class="locale-switcher flex"> -->
  <li class="locale-switcher-item" v-for="lang in locales" :key="lang">
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
  <!-- </ul> -->
</template>

<style lang="scss" scoped->
li {
  margin: 0;
  text-transform: capitalize;
}
@media (max-width: 1080px) {
  li {
    .pill--stretch {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
