<script setup lang="ts">
import type { PROJECT_QUERY_RESULT, Seo } from '~/utils/sanity-api/sanity.types'
import { PROJECT_QUERY } from '~/utils/sanity-api/queries'
import website from '~/config/website'
import CardImg from '~/components/CardImg.vue'
import BtnToggle from '~/components/ui/BtnToggle.vue'

const active = ref<boolean>(false)

const route = useRoute()
const { data } = await useSanityData<PROJECT_QUERY_RESULT>(PROJECT_QUERY, {
  slug: route.params.slug,
})

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage:
      'Sorry, the requested page does not exist: ' + route.params.slug,
  })
}

const seo = computed(() => data.value?.seo || ({} as Seo))
const pageTitle = computed(
  () => seo.value?.metaTitle || data.value?.title?.en || website.title,
)

useSeoMeta({
  title: computed(() => `${website.title} — ${pageTitle.value}`),
  ogTitle: computed(() => pageTitle.value),
  ogDescription: computed(() => seo.value?.metaDescription || ''),
  description: computed(() => seo.value?.metaDescription || ''),
  ogImage: computed(
    () => (seo.value?.metaImage?.asset as { url?: string })?.url || '',
  ),
})

const pageContentRef = ref<HTMLElement | null>(null)
const metadataRef = ref<HTMLElement | null>(null)
const { animeClass, trigger } = useDominoAnime(pageContentRef, 0)

watch(active, (val) => {
  if (val) nextTick(() => trigger(metadataRef, 0))
  else {
    nextTick(() => trigger(metadataRef, 1))
    window.scrollTo(0, 0)
  }
})

const clientColors = computed(() => ({
  foreGround: data.value?.client?.foregroundColor?.hex || '#000000',
  backGround: data.value?.client?.backgroundColor?.hex || '#ffffff',
}))

const _mediaCaption = () => {
  const year = Number(data.value?.year)
  const shortYear = year ? year % 100 : ''
  const ID = data.value?.ID || '000'
  const shortID = ID?.substring(0, 3)
  return shortID + shortYear
}
</script>

<template>
  <div class="content content--page-project">
    <div ref="pageContentRef">
      <section class="header mb-md">
        <div class="header--item" :class="{ 'is-active': active }">
          <div class="bubble key" :class="animeClass">
            <div>ID</div>
          </div>
          <div class="bubble bubble-dot bubble-dot--lg" :class="animeClass">
            <div>{{ data?.ID }}</div>
          </div>
        </div>
        <div class="header--item">
          <div class="bubble key" :class="animeClass">
            <div>{{ $localizeText('client') }}</div>
          </div>
          <div :class="animeClass">
            <Client v-if="data?.client" :input="data.client" />
          </div>
        </div>

        <div class="header--item">
          <div class="bubble key" :class="animeClass">
            <div>{{ $localizeText('project') }}</div>
          </div>
          <div
            class="bubble bubble--lg"
            :class="animeClass"
            :style="{
              '--color': clientColors.foreGround,
              '--background': clientColors.backGround,
            }"
          >
            <h1>{{ $localizeField(data?.title) }}</h1>
          </div>
        </div>
        <div
          v-if="data?.description"
          class="header--item header--item__description"
        >
          <div class="bubble key" :class="animeClass">
            <div>{{ $localizeText('description') }}</div>
          </div>
          <div
            class="bubble bubble--lg"
            :class="animeClass"
            :style="{
              '--color': clientColors.foreGround,
              '--background': clientColors.backGround,
            }"
          >
            <div>
              <span v-if="!active" class="ellipsis">{{
                $localizeField(data?.description)
              }}</span>
              <span v-else>
                {{ $localizeField(data?.description) }}
              </span>
            </div>
          </div>
        </div>
        <div v-if="active" ref="metadataRef" class="metadata">
          <div class="header--item">
            <div class="bubble key" :class="animeClass">
              <div>{{ $localizeText('year') }}</div>
            </div>
            <div class="bubble bubble--lg" :class="animeClass">
              <div>{{ data?.year }}</div>
            </div>
          </div>
          <div
            v-for="(item, i) in data?.locations"
            :key="i"
            class="header--item"
          >
            <div class="bubble key" :class="animeClass">
              <div>{{ $localizeText('location') }}</div>
            </div>
            <div class="bubble bubble--lg" :class="animeClass">
              <div>{{ item?.name }}</div>
            </div>
          </div>
          <div
            v-for="item in data?.contributions"
            :key="item._key"
            class="header--item"
          >
            <div
              v-if="item.service && item.service.title"
              class="bubble key"
              :class="animeClass"
            >
              <div>{{ $localizeField(item.service?.title) }}</div>
            </div>
            <ul>
              <li v-for="(contributor, j) in item.contributors" :key="j">
                <div class="bubble bubble--lg" :class="animeClass">
                  <div>{{ contributor.first_name }} {{ contributor.name }}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <BtnToggle @change="active = !active" />
      </section>
      <section class="media mb-md">
        <div class="grid grid-cols-1 md:grid-cols-6 gap-x-md">
          <div
            v-for="(item, i) in data?.media"
            :key="i"
            :class="{
              [`col-span-1 md:col-span-${item.colSize || 6}`]: item.colSize,
              [animeClass]: true,
            }"
          >
            <template v-if="item._type === 'sanity.imageAsset'">
              <CardImg
                v-if="item.asset"
                :asset="item.asset as any"
                :caption="
                  _mediaCaption()
                  // item.caption
                  //   ? $localePath(item.caption)
                  //   : item.originalFilename
                "
                :index="i + 1"
              />
            </template>
            <template v-if="item._type === 'video'">
              <CardVid
                v-if="item.video?.asset?.playbackId"
                :asset-id="item.video?.asset?.playbackId"
                :caption="_mediaCaption()"
                :index="i + 1"
              />
            </template>
          </div>
        </div>
      </section>
    </div>
    <ProjectRelated v-if="route.params.slug" :slug="route.params.slug" />
  </div>
</template>

<style scoped- lang="scss">
.content {
  // .header,
  // .media {
  //   margin-bottom: var(--spacing-md);
  // }
  .header--item {
    display: flex;
    align-items: flex-start;
    &.is-active {
      .description {
      }
    }
    .key {
      position: sticky;
      top: var(--header-h);
    }
    &__description .bubble--lg {
      // background-color: orange;
    }
  }
  .metadata .bubble--lg {
    --color: var(--color-black);
    --background: var(--color-white);
  }
}
@media (max-width: 1080px) {
  .header--item {
    .ellipsis {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &__description {
      min-width: 0;
      .bubble--lg {
        min-width: 0;
        flex: 1;
      }
      .bubble__content {
        min-width: 0;
      }
    }
    li {
      font-size: 0;
      line-height: 0;
      .bubble {
        display: table-caption;
      }
    }
  }
}
</style>
