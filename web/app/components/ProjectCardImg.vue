<script lang="ts" setup>
import type { ProjectExpanded } from '~/utils/sanity-api/sanity-expanded.types'

const { input } = defineProps<{ input: ProjectExpanded }>()
const hover = ref<boolean>(false)
</script>

<template>
  <div
    :class="{
      card: true,
      'card--project-img': true,
      'card--rip': input.rip,
      'is-active': hover,
    }"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <NuxtLink :to="_linkResolver(input as any)">
      <div class="header">
        <div class="bubble bubble-dot">
          <div>{{ input?.ID }}</div>
        </div>
        <Client
          v-if="input.client"
          :input="input.client"
          :disc-only="true"
          :size="'xl'"
        />
      </div>
      <figure v-for="(media, i) in input.media" :key="i">
        <template v-if="media._type === 'image'">
          <img
            :src="$urlFor(media).height(90).url()"
            :alt="$localizeField(media.caption)"
          />
        </template>
      </figure>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .disc {
    height: 9rem;
    width: 9rem;
  }
}
img {
  height: var(--line-height-2xl);
  width: auto;
}
.card {
  a {
    display: flex;
    align-items: flex-end;
  }
  .project-imgs {
    display: flex;
  }
}
@media (min-width: 575px) {
}

@media (min-width: 800px) {
}
</style>
