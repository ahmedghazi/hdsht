<script setup lang="ts">
import type { RANDOM_PROJECTS_QUERY_RESULT } from '~/utils/sanity-api/sanity.types'
import { RANDOM_PROJECTS_QUERY } from '~/utils/sanity-api/queries'

const { slug } = defineProps<{ slug: string | string[] }>()

const { data: totalCount } = await useSanityData<number>(
  `count(*[_type == "project" && slug.current != $slug])`,
  { slug },
)
const total = totalCount.value ?? 0
const offset = Math.floor(Math.random() * Math.max(0, total - 5))
const { data: projects } = await useSanityData<RANDOM_PROJECTS_QUERY_RESULT>(
  RANDOM_PROJECTS_QUERY,
  { slug, offset, limit: offset + 5 },
)

const containerRef = ref<HTMLElement | null>(null)
const { animeClass } = useDominoAnime(containerRef, 0)
</script>

<template>
  <section v-if="projects?.length" class="related">
    <div ref="containerRef">
      <div class="bubble" :class="animeClass">
        <div>
          <h2>NEXT</h2>
        </div>
      </div>
    </div>
    <div>
      <template v-for="(item, i) in projects" :key="i">
        <ProjectCard v-if="item" :input="item" :index="i + 1" />
      </template>
    </div>
  </section>
</template>
