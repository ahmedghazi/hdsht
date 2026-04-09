<script setup lang="ts">
import type { ProjectExpanded } from '~/utils/sanity-api/sanity-expanded.types'

defineProps<{ input: ProjectExpanded[] }>()

const moduleRef = ref<HTMLElement | null>(null)
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
  <div ref="moduleRef" class="list-projects-txt">
    <div class="header flex md:grid! md:grid-cols-2">
      <div class="flex">
        <div class="header__ID">
          <div class="bubble">
            <div>ID</div>
          </div>
        </div>
        <div class="header__client">
          <div class="bubble">
            <div>{{ $localizeText('client') }}</div>
          </div>
        </div>
      </div>
      <div class="flex">
        <div class="header__project">
          <div class="bubble">
            <div>{{ $localizeText('project') }}</div>
          </div>
        </div>
        <div class="header__year hidden-sm">
          <div class="bubble">
            <div>{{ $localizeText('year') }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="projects-index">
      <ProjectCardTxt
        v-for="(item, i) in input || []"
        :key="i"
        :input="item"
        :index="i"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list-projects-txt {
  --opacity: 0;
  opacity: var(--opacity);

  .header {
    position: sticky;
    top: var(--header-h);
    z-index: 10;
  }
  .header__ID {
    width: var(--cardIndex-w);
  }

  .header__project {
    width: var(--cardTitle-w);
  }
  @media (max-width: 800px) {
    .header__ID,
    .header__project {
      width: auto;
    }
  }
}
</style>
