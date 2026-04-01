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
    statusMessage: 'Sorry, the requested page does not exist.',
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

const clientColors = computed(() => ({
  foreGround: data.value?.client?.foregroundColor?.hex || '#000000',
  backGround: data.value?.client?.backgroundColor?.hex || '#ffffff',
}))
</script>

<template>
  <div class="content content--page-project">
    <section class="header">
      <div class="header--item">
        <div class="bubble">
          <div>ID</div>
        </div>
        <div class="bubble bubble-dot bubble-dot--lg">
          <div>{{ data?.ID }}</div>
        </div>
      </div>
      <div class="header--item">
        <div class="bubble">
          <div>{{ $localizeText('client') }}</div>
        </div>
        <Client v-if="data?.client" :input="data.client" />
      </div>

      <div class="header--item">
        <div class="bubble">
          <div>{{ $localizeText('project') }}</div>
        </div>
        <div
          class="bubble bubble--lg"
          :style="{
            '--color': clientColors.foreGround,
            '--background': clientColors.backGround,
          }"
        >
          <h1>{{ $localizeField(data?.title) }}</h1>
        </div>
      </div>
      <div class="metadata" v-if="active">
        <div class="header--item">
          <div class="bubble">
            <div>{{ $localizeText('year') }}</div>
          </div>
          <div class="bubble bubble--lg">
            <h1>{{ data?.year }}</h1>
          </div>
        </div>
        <div v-for="(item, i) in data?.locations" :key="i" class="header--item">
          <div class="bubble">
            <div>{{ $localizeText('location') }}</div>
          </div>
          <div class="bubble bubble--lg">
            <h1>{{ item?.name }}</h1>
          </div>
        </div>
        <div
          v-for="item in data?.contributions"
          :key="item._key"
          class="header--item"
        >
          <div v-if="item.service && item.service.title" class="bubble">
            <div>{{ $localizeField(item.service?.title) }}</div>
          </div>
          <ul>
            <li v-for="(contributor, j) in item.contributors" :key="j">
              <div class="bubble bubble--lg">
                <div>{{ contributor.first_name }} {{ contributor.name }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <BtnToggle @change="active = !active" />
    </section>
    <section class="media">
      <div class="grid md:grid-cols-6 gap-md">
        <div
          v-for="(item, i) in data?.media"
          :key="i"
          :class="item.colSize ? `col-span-1 md:col-span-${item.colSize}` : ''"
        >
          <template v-if="item._type === 'sanity.imageAsset'">
            <CardImg
              v-if="item.asset"
              :asset="item.asset"
              :caption="
                item.caption ? $localePath(item.caption) : item.originalFilename
              "
              :index="i + 1"
            />
          </template>
          <template v-if="item._type === 'video'">
            <CardVid
              v-if="item.video?.asset?.playbackId"
              :asset-id="item.video?.asset?.playbackId"
              :caption="item.caption ? $localePath(item.caption) : ''"
              :index="i + 1"
            />
          </template>
        </div>
      </div>
    </section>
    <pre>{{ data?.media }}</pre>
  </div>
</template>

<style scoped lang="scss">
.content {
  .header {
    margin-bottom: var(--spacing-md);
  }
  .header--item {
    display: flex;
    align-items: flex-start;
  }
  .metadata .bubble--lg {
    --color: var(--color-black);
    --background: var(--color-white);
  }
}
@media (max-width: 800px) {
}
</style>
