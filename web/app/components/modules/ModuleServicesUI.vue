<script setup lang="ts">
import type { ServicesUI } from '~/utils/sanity-api/sanity.types'
import Accordion from '../ui/Accordion.vue'
import Gizmo from '@/components/Gizmo.vue'
import { onMounted } from 'vue'
// import { useGizmoStore } from '@/stores/gizmo'

defineProps<{ input: ServicesUI }>()

// const store = useGizmoStore()

// onMounted = client uniquement dans Nuxt
onMounted(() => {
  // store.initCursorTracking()
})
</script>

<template>
  <section
    :class="[
      'module',
      'module--services-ui',
      `md:col-span-${input.colSize || 2}`,
    ]"
  >
    <div class="inner">
      <div class="header">
        <h2 v-if="input.title" class="bubble">
          <div>{{ $localizeField(input.title) }}</div>
        </h2>
      </div>
      <div class="grid md:grid-cols-2 gap-md">
        <div class="animation">
          <Gizmo />
        </div>

        <Accordion v-if="input.accordion" :input="input.accordion" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.module {
  .header {
    margin-bottom: var(--spacing-xs);
  }
  .animation {
    display: grid;
    justify-content: center;
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
