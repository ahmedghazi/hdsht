<script lang="ts" setup>
import type { Client } from '~/utils/sanity-api/sanity.types'

const {
  input,
  discOnly = false,
  size = 'md',
  hover = false,
} = defineProps<{
  input: Client
  discOnly?: boolean
  size?: 'md' | 'lg' | 'xl'
  hover?: boolean
}>()
</script>

<template>
  <div
    :class="['client', `client--${size}`]"
    :style="{
      '--background': hover ? 'var(--color-gray)' : input?.backgroundColor?.hex,
      '--color': hover ? 'var(--color-white)' : input?.foregroundColor?.hex,
    }"
  >
    <div v-if="input.backgroundColor" class="client__disc"></div>
    <div v-if="!discOnly" class="client__name">
      <div class="bubble bubble--lg">
        <div>
          <span class="ellipsis">{{ input.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.client {
  display: flex;
  align-items: center;
  min-width: 0; // ← peut rétrécir dans sa cell
  &--xl {
    .client__disc {
      width: var(--line-height-2xl);
      height: var(--line-height-2xl);
      border-radius: var(--line-height-2xl);
    }
  }
  &__disc {
    width: var(--line-height-lg);
    height: var(--line-height-lg);
    aspect-ratio: 1;
    background: transparent
      radial-gradient(
        closest-side at 50% 50%,
        var(--color) 0%,
        var(--background) 100%
      )
      0% 0% no-repeat padding-box;

    border-radius: var(--line-height-lg);
  }

  &__name {
    color: var(--color);
    flex: 1 1 auto; // ← prend l’espace restant à droite du disque
    min-width: 0; // ← crucial pour l’ellipsis

    .bubble {
      // display: inline-flex; // ← bulle à la largeur du texte
      max-width: 100%; // ← mais ne dépasse pas la place dispo
      min-width: 0;
    }

    .bubble > div {
      min-width: 0;
    }
  }
  @media (max-width: 800px) {
    align-items: flex-start;
    &__disc,
    &__name {
      vertical-align: top;
    }
    &__disc {
      display: inline-block;
    }
    .bubble {
      display: table-caption;
    }
    .ellipsis {
      all: unset;
    }
  }
}
</style>
