<script lang="ts" setup>
import type { ProjectExpandedFull } from "~/utils/sanity-api/sanity-extend.types";

const { input } = defineProps<{ input: ProjectExpandedFull }>();
//here collect the first image from the project
const firstImage = computed(() => {
  return input.images?.[0]?.image;
});
</script>

<template>
  <article class="card card--project card--project__img">
    <NuxtLink :to="_linkResolver(input as any)">
      <div class="project-img">
        <img
          v-if="firstImage"
          class="visual"
          :src="
            firstImage
              ? urlFor(firstImage as any)
                  .width(500)
                  .url()
              : ''
          "
          alt="Cover image" />
      </div>
    </NuxtLink>
  </article>
</template>

<style scoped lang="scss">
.card {
  &:hover {
    .header {
      opacity: 1;
    }
  }
}
@media (min-width: 575px) {
}

@media (min-width: 800px) {
}
</style>
