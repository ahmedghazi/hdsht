<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import { portableTextComponents } from '~/utils/sanity-api/portableTextComponents'
import type { ContactsUI } from '~/utils/sanity-api/sanity.types'
const { _localizeField } = useSanityLocale()

defineProps<{ input: ContactsUI }>()
</script>

<template>
  <section
    :class="['module', 'module--contacts-ui', `col-span-${input.colSize || 1}`]"
  >
    <div class="inner">
      <div class="header">
        <h2 v-if="input.title" class="bubble">
          <div>{{ _localizeField(input.title) }}</div>
        </h2>
      </div>
      <div v-if="input.text && input.text.en" class="text">
        <PortableText
          :value="_localizeField(input.text)"
          :components="portableTextComponents"
        />
      </div>
      <div
        v-if="input.items && input.items.length"
        class="contact-links grid grid-cols-2"
      >
        <a
          v-for="item in input.items"
          :key="item._key"
          :href="item.link"
          :class="['pill', 'pill--stretch', `col-span-${item.colSize || 1}`]"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>{{ item.label }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.module {
}
.header {
  margin-bottom: var(--spacing-xs);
}
.text {
  margin-bottom: var(--spacing-md);
}
@media (max-width: 800px) {
  .module {
    .contact-links {
    }
  }
}
</style>
