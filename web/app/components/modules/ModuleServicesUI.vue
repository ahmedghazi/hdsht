<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import { portableTextComponents } from '~/utils/sanity-api/portableTextComponents'
import type { ServicesUI } from '~/utils/sanity-api/sanity.types'
import { useSanityLocale } from '~/composables/useSanityLocale'

const { _localizeField } = useSanityLocale()

defineProps<{ input: ServicesUI }>()
</script>

<template>
  <section
    :class="['module', 'module--services-ui', `col-span-${input.colSize || 2}`]"
  >
    <div class="inner">
      <h2 v-if="input.title" class="bubble">
        <span>{{ _localizeField(input.title) }}</span>
      </h2>
      <div v-if="input.text && input.text.en" class="text">
        <PortableText
          :value="_localizeField(input.text)"
          :components="portableTextComponents"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.module {
  h2 {
    margin-bottom: 1rem;
  }
  .services-text {
    line-height: 1.6;
  }
}
@media (max-width: 800px) {
  .module {
    h2 {
      margin-bottom: 0.75rem;
    }
  }
}
</style>
