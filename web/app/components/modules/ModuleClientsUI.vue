<script setup lang="ts">
import type { ClientsUI } from '~/utils/sanity-api/sanity.types'
import { useSanityLocale } from '~/composables/useSanityLocale'
import Marquee from '@selemondev/vue3-marquee'
import '@selemondev/vue3-marquee/dist/index.css'

const { _localizeField } = useSanityLocale()
defineProps<{ input: ClientsUI }>()

onMounted(() => {
  console.log('ModuleListArticlesUI mounted')
  // console.log()
})
</script>

<template>
  <section
    :class="[
      'module',
      'module--clients-ui',
      `md:col-span-${input.colSize || 1}`,
    ]"
  >
    <div class="inner">
      <h2 class="bubble">
        <div>{{ _localizeField(input.title) }}</div>
      </h2>
      <div class="list">
        <Marquee :duration="3">
          <ul class="flex gap-sm">
            <li v-for="item in input.items" :key="item" class="client--item">
              <img
                :src="item.asset?.url || ''"
                alt=""
                srcset=""
                :height="item.asset?.metadata?.dimensions?.height || 20"
                :width="item.asset?.metadata?.dimensions?.width || 'auto'"
              />
            </li>
            <!-- <li v-for="item in input.items" :key="item" class="client--item">
              <img
                :src="item.asset?.url || ''"
                alt=""
                srcset=""
                :height="item.asset?.metadata?.dimensions?.height || 20"
                :width="item.asset?.metadata?.dimensions?.width || 'auto'"
              />
            </li>
            <li v-for="item in input.items" :key="item" class="client--item">
              <img
                :src="item.asset?.url || ''"
                alt=""
                srcset=""
                :height="item.asset?.metadata?.dimensions?.height || 20"
                :width="item.asset?.metadata?.dimensions?.width || 'auto'"
              />
            </li> -->
          </ul>
        </Marquee>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.module {
  h2 {
  }
  .list {
    background-color: var(--color-white);
  }
  .client--item {
    flex-shrink: 0;
    padding: 0.6rem var(--text-lg);
  }
  img {
    height: 1.7rem;
    width: auto;
  }
}
@media (max-width: 800px) {
  .module {
    .list {
      max-width: calc(100dvw - var(--spacing-md));
    }
    .client--item {
      padding: 0.6rem var(--text-md);
    }
  }
}
</style>
