<script setup lang="ts">
import type { ProjectExpanded } from '~/utils/sanity-api/sanity-expanded.types'

defineProps<{ input: ProjectExpanded[] }>()

const moduleRef = ref<HTMLElement | null>(null)
const media = ref<ProjectExpanded | null>(null)
onMounted(() => {
  _format()
  window.addEventListener('resize', _format)

  const unsub = on('PROJECT-MEDIA', (e, payload) => {
    console.log('on PROJECT-MEDIA', e, payload)
    media.value = payload
  })
  onUnmounted(() => {
    unsub()
  })
})

onMounted(() => {
  // const unsub = on('PROJECT-HOVER', (e, payload) => {
  //   elseHovered.value = payload === input._id
  // })
  // onUnmounted(() => {
  //   unsub()
  // })
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
    <div v-if="media" class="project-thumbnail">
      <figure v-if="media.imageCover" class="image-cover">
        <img
          v-if="media.imageCover?.asset"
          :src="
            $urlFor(media.imageCover?.asset as any)
              .width(2000)
              .url()
          "
          :alt="`${$localizeField(media.title) || ''}`"
        />
      </figure>
      <figure v-if="!media.imageCover && media.videoCover" class="video-cover">
        <UiMuxVideo
          v-if="media.videoCover.video?.asset?.playbackId"
          :asset-id="media.videoCover.video?.asset?.playbackId || ''"
          :autoplay="true"
          :loop="true"
          :aspect-ratio="media.videoCover.video?.asset?.data?.aspect_ratio"
        />
      </figure>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list-projects-txt {
  --opacity: 0;
  opacity: var(--opacity);
  &:has(.is-active) {
    a:not(:has(.is-active)) {
      opacity: 0.4;
    }
  }
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

  .image-cover,
  .video-cover {
    position: fixed;
    inset: 0;
    z-index: -1;
    // opacity: 0;
    pointer-events: none;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  @media (max-width: 1080px) {
    .header__ID,
    .header__project {
      width: auto;
    }
  }
}
</style>
