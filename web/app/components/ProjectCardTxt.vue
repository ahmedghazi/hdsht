<script lang="ts" setup>
import type { ProjectExpanded } from '~/utils/sanity-api/sanity-expanded.types'
import Client from './Client.vue'

const {
  input,
  index = 0,
  stagger = 0.01,
} = defineProps<{
  input: ProjectExpanded
  index?: number
  stagger?: number
}>()
const items = ref<HTMLElement | null>(null)
const { animeClass } = useDominoAnime(items, index, stagger)
const hover = ref<boolean>(false)
const elseHovered = ref<boolean>(false)
onMounted(() => {
  const unsub = on('PROJECT-HOVER', (e, payload) => {
    elseHovered.value = payload === input._id
  })
  onUnmounted(() => {
    unsub()
  })
})

watch(
  () => hover.value,
  (val) => {
    console.log('hover', val)
    if (val) {
      emit('PROJECT-HOVER', input._id)
    } else {
      emit('PROJECT-HOVER', null)
    }
  },
  {
    immediate: true, // exécute aussi au montage avec la valeur initiale
  },
)
</script>

<template>
  <NuxtLink :to="_linkResolver(input as any)">
    <article
      ref="items"
      :class="{
        card: true,
        'card--project-txt': true,
        'card--rip': input.rip,
        'is-else-hovered': elseHovered,
      }"
      :style="{
        '--background': input.client?.backgroundColor?.hex,
        '--color': input.client?.foregroundColor?.hex,
      }"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
    >
      <div class="grid md:grid-cols-2">
        <div class="flex">
          <div class="card__index dots">
            <div class="bubble bubble-dot bubble-dot--lg" :class="animeClass">
              <div v-if="input.ID">{{ input.ID }}</div>
              <div v-else>00000</div>
            </div>
          </div>
          <div :class="animeClass">
            <Client v-if="input.client" :input="input.client" />
          </div>
        </div>
        <div class="flex">
          <h2 class="card__title">
            <div class="inner">
              <div class="bubble bubble--lg" :class="animeClass">
                <div>
                  <span class="ellipsis">
                    {{ $localizeField(input.title) }}
                  </span>
                </div>
              </div>
            </div>
          </h2>

          <div class="card__year">
            <div class="bubble bubble--lg" :class="animeClass">
              <div>{{ input.year }}</div>
            </div>
          </div>
        </div>
      </div>
      <figure v-if="hover" class="image-cover">
        <img
          v-if="input.imageCover?.asset"
          :src="
            $urlFor(input.imageCover?.asset as any)
              .width(2000)
              .url()
          "
          :alt="`${$localizeField(input.title) || ''}`"
        />
      </figure>
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

  &__index {
    width: 7em;
    .bubble {
      width: 100%;
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
  .image-cover {
    position: fixed;
    bottom: 0;
    right: var(--spacing-md);
    z-index: 251;
    img {
      height: 8rem;
      width: auto;
    }
  }
}
</style>
