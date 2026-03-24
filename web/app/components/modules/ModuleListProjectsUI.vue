<script setup lang="ts">
import type { ListProjectsUI } from '~/utils/sanity-api/sanity.types'

// import ProjectCardImg from "../ProjectCardImg.vue";
// import ProjectCardTxt from "../ProjectCardTxt.vue";

const moduleRef = ref<HTMLElement | null>(null)

defineProps<{ input: ListProjectsUI }>()
onMounted(() => {
  _format()
  window.addEventListener('resize', _format)
})

onUnmounted(() => {
  window.removeEventListener('resize', _format)
})

const _format = () => {
  // TODO: implement
  const cardIndex = document.querySelector('.card__index')
  if (cardIndex) {
    const cardIndexBounding = cardIndex.getBoundingClientRect()

    if (moduleRef.value) {
      moduleRef.value.style.setProperty(
        '--cardIndex-w',
        cardIndexBounding.width + 'px',
      )
    }
  }
  const cardTitle = document.querySelector('.card__title')
  if (cardTitle) {
    const cardTitleBounding = cardTitle.getBoundingClientRect()

    if (moduleRef.value) {
      moduleRef.value.style.setProperty(
        '--cardTitle-w',
        cardTitleBounding.width + 'px',
      )
    }
  }

  if (moduleRef.value) {
    moduleRef.value.style.setProperty('--opacity', '1')
  }
}
</script>

<template>
  <section
    id="projects"
    ref="moduleRef"
    class="module module--list-projects-ui"
  >
    <div class="header grid md:grid-cols-2">
      <div class="flex">
        <div class="header__ID">
          <div class="bubble">ID</div>
        </div>
        <div class="header__client">
          <div class="bubble">Client</div>
        </div>
      </div>
      <div class="flex">
        <div class="header__project">
          <div class="bubble">Project</div>
        </div>
        <div class="header__year">
          <div class="bubble">Year</div>
        </div>
      </div>
    </div>
    <div class="projects-index">
      <ProjectCardTxt
        v-for="item in input.items || []"
        :key="item._ref"
        :input="item"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.module {
  scroll-margin-top: calc(var(--header-h) + 1rem);
  --opacity: 0;
  opacity: var(--opacity);
  .header__ID {
    width: var(--cardIndex-w);
  }

  .header__project {
    width: var(--cardTitle-w);
  }
}
</style>
