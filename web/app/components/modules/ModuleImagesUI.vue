<script setup lang="ts">
import type { ImagesUI } from '~/utils/sanity-api/sanity.types'

defineProps<{ input: ImagesUI }>()

onMounted(() => {
  console.log('ModuleListArticlesUI mounted')
})
</script>

<template>
  <section
    :class="[
      'module',
      'module--images-ui',
      `md:col-span-${input.colSize || 1}`,
    ]"
  >
    <!-- <pre>{{ input.items }}</pre> -->
    <div :class="`grid md:grid-cols-${input.gridSize} gap-sm`">
      <figure
        v-for="item in input.items"
        :key="item._key"
        :class="item.colSize ? `col-span-1 md:col-span-${item.colSize}` : ''"
      >
        <img
          v-if="item && item.asset"
          class="visual"
          :src="
            $urlFor(item as any)
              .width(2000)
              .url()
          "
          :alt="''"
        />
      </figure>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.module {
}
@media (max-width: 1080px) {
  .module {
    padding-top: 0;
  }
}
</style>
