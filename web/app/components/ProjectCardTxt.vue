<script lang="ts" setup>
import type { ProjectExpanded } from '~/utils/sanity-api/sanity-expanded.types'
import Client from './Client.vue'

const { input } = defineProps<{ input: ProjectExpanded }>()
const { _localizeField } = useSanityLocale()

// const hover = ref<boolean>(false)
</script>

<template>
  <NuxtLink :to="_linkResolver(input as any)">
    <article
      :class="{
        card: true,
        'card--project-txt': true,
        'card--rip': input.rip,
        // 'mb-md': true,
      }"
      :style="{
        '--background': input.client?.backgroundColor?.hex,
        '--color': input.client?.foregroundColor?.hex,
      }"
    >
      <div class="grid md:grid-cols-2">
        <div class="flex">
          <div class="card__index dots">
            <div class="bubble bubble-dot bubble-dot--lg">
              <div v-if="input.ID">{{ input.ID }}</div>
              <div v-else>00000</div>
            </div>
          </div>
          <Client v-if="input.client" :input="input.client" />
        </div>
        <div class="flex">
          <h2 class="card__title">
            <div class="bubble bubble--lg ellipsis">
              <div>{{ _localizeField(input.title) }}</div>
            </div>
          </h2>

          <div class="card__year">
            <div class="bubble bubble--lg">
              <div>{{ input.year }}</div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </NuxtLink>
</template>

<style scoped- lang="scss">
.card {
  --background: #fff;
  --color: #000;
  &--rip {
    --background: var(--color-grey) !important;
    --color: var(--color-white-40) !important;
    // --color: #70707066 !important;
    opacity: 0.4;
    pointer-events: none;
    // background: transparent
    //   radial-gradient(closest-side at 50% 50%, var(--color), 0%, #70707066 100%)
    //   0% 0% no-repeat padding-box;
  }
  .flex {
    align-items: flex-start;
  }
  .card__title {
    flex: 2;
  }
  @media (max-width: 800px) {
  }
}
</style>
