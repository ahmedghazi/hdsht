<script lang="ts" setup>
import type { RANDOM_PROJECTS_QUERY_RESULT } from '~/utils/sanity-api/sanity.types'
import Client from './Client.vue'

type ProjectCardInput = RANDOM_PROJECTS_QUERY_RESULT[number]

const {
  input,
  index = 0,
  stagger = 0.01,
} = defineProps<{
  input: ProjectCardInput
  index?: number
  stagger?: number
}>()
const items = ref<HTMLElement | null>(null)
const { animeClass } = useDominoAnime(items, index, stagger)
</script>

<template>
  <article
    ref="items"
    :class="{
      card: true,
      'card--project-teaser': true,
    }"
  >
    <NuxtLink :to="_linkResolver(input as any)">
      <div class="header">
        <div class="header--item">
          <div class="bubble" :class="animeClass">
            <div>ID</div>
          </div>
          <div class="bubble bubble-dot bubble-dot--lg" :class="animeClass">
            <div>{{ input?.ID }}</div>
          </div>
        </div>
        <div class="header--item">
          <div class="bubble" :class="animeClass">
            <div>{{ $localizeText('client') }}</div>
          </div>
          <div :class="animeClass">
            <Client v-if="input?.client" :input="input.client" />
          </div>
        </div>

        <div class="header--item">
          <div class="bubble" :class="animeClass">
            <div>{{ $localizeText('project') }}</div>
          </div>
          <div
            class="bubble bubble--lg"
            :class="animeClass"
            :style="{
              '--background': input.client?.backgroundColor?.hex,
              '--color': input.client?.foregroundColor?.hex,
            }"
          >
            <h1>{{ $localizeField(input?.title) }}</h1>
          </div>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

<style scoped lang="scss">
.card.card--project-teaser {
  // --background: inherit;
  // --color: inherit;
  .header--item {
    display: flex;
    align-items: flex-start;
  }
}
</style>
