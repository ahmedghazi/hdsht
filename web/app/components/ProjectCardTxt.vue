<script lang="ts" setup>
import type { ProjectExpanded } from '~/utils/sanity-api/sanity-expanded.types'
import Client from './Client.vue'

const { input } = defineProps<{ input: ProjectExpanded }>()
const { _localizeField } = useSanityLocale()
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
            <div class="inner">
              <div class="bubble bubble--lg">
                <div>
                  <span class="ellipsis">
                    {{ _localizeField(input.title) }}
                  </span>
                </div>
              </div>
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
.grid > * {
  // min-width: 0; /* ← chaque cell de grille */
}

.card {
  --background: #fff;
  --color: #000;

  &--rip {
    --background: var(--color-grey) !important;
    --color: var(--color-white-40) !important;
    opacity: 0.4;
    pointer-events: none;
  }

  .flex {
    align-items: flex-start;
    width: 100%;
    min-width: 0; // la ligne peut rétrécir
    & > div {
      // flex: 0 1 auto; // prend l’espace dispo entre gauche et year
      // min-width: 0; // autorise le shrink
    }
  }

  &__title {
    flex: 1 1 auto; // prend l’espace dispo entre gauche et year
    min-width: 0; // autorise le shrink

    .inner {
      min-width: 0;
    }

    .bubble {
      display: inline-flex; // ← se met à la largeur du contenu
      max-width: 100%; // ← mais ne dépasse jamais la place dispo
      min-width: 0; // ← autorise le shrink
    }

    .bubble > div {
      min-width: 0;
    }
  }

  &__year {
    flex-shrink: 0; // colonne année rigide
  }
}
</style>
