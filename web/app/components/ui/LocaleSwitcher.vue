<script setup lang="ts">
const { locale, setLocale } = useI18n()
</script>

<template>
  <ul class="locale-switcher flex">
    <li v-for="lang in ['en', 'zh']" :key="lang">
      <button
        :class="{ active: locale === lang, pill: true }"
        @click="setLocale(lang as 'en' | 'zh')"
      >
        <span>{{ lang }}</span>
      </button>
    </li>
  </ul>
</template>
