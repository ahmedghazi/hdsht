<script setup lang="ts">
import type { PROJECT_QUERY_RESULT } from '~/utils/sanity-api/sanity.types'
import { RANDOM_PROJECTS_QUERY } from '~/utils/sanity-api/queries'

const { slug } = defineProps<{ slug: string | string[] }>()

const { data: totalCount } = await useSanityData<number>(
  `count(*[_type == "project" && slug.current != $slug])`,
  { slug },
)
const total = totalCount.value ?? 0
const offset = Math.floor(Math.random() * Math.max(0, total - 5))
const { data: projects } = await useSanityData<
  PROJECT_QUERY_RESULT['relatedProjects']
>(RANDOM_PROJECTS_QUERY, { slug, offset, limit: offset + 5 })

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
      <div v-for="(item, i) in projects" :key="i" class="mb-md">
        <ProjectCard v-if="item" :input="item" :index="i + 1" />
      </div>
    </div>
  </section>
</template>
