<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import { portableTextComponents } from '~/utils/sanity-api/portableTextComponents'
import type { TextUI } from '~/utils/sanity-api/sanity.types'

defineProps<{ input: TextUI }>()
</script>

<template>
  <section
    :class="[
      'module',
      'module-text-ui',
      `module-text-ui--${input.look}`,
      `md:col-span-${input.colSize || 2}`,
    ]"
  >
    <div class="inner">
      <ClientOnly>
        <div
          v-if="input.text && input.text.en"
          :class="`text md:${input.look}`"
        >
          <PortableText
            :value="input.text.en"
            :components="portableTextComponents"
          />
        </div>
      </ClientOnly>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.module-text-ui--lg {
  .inner {
    padding: 0 var(--spacing-md);
  }
}
@media (min-width: 1080px) {
  .text {
  }
}
@media (max-width: 1080px) {
  .module {
  }
}
</style>
