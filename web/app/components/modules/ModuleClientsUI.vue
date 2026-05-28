<script setup lang="ts">
import type { ClientsUI } from '~/utils/sanity-api/sanity.types'
import Marquee from '@selemondev/vue3-marquee'
import '@selemondev/vue3-marquee/dist/index.css'

const props = defineProps<{ input: ClientsUI }>()

const ready = ref(false)
const preloadRef = ref<HTMLDivElement>()

onMounted(async () => {
  await nextTick()
  const imgs = Array.from(preloadRef.value?.querySelectorAll('img') ?? [])
  await Promise.all(
    imgs.map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            img.addEventListener('load', () => resolve(), { once: true })
            img.addEventListener('error', () => resolve(), { once: true })
          }),
    ),
  )
  ready.value = true
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
        <div>{{ $localizeField(input.title) }}</div>
      </h2>
      <div class="list">
        <!-- preload images so marquee calculates widths correctly -->
        <div
          ref="preloadRef"
          aria-hidden="true"
          style="position: absolute; visibility: hidden; pointer-events: none"
        >
          <img
            v-for="item in props.input.items"
            :key="item._key"
            :src="$urlFor(item.asset).height(30).format('webp').url()"
          />
        </div>
        <Marquee v-if="ready" :duration="30" :pause-on-hover="true">
          <!-- <ul class="flex- gap-sm"> -->
          <div
            v-for="(item, i) in input.items"
            :key="item"
            class="client--item"
            :style="{
              '--ar': `${item.asset?.metadata?.dimensions?.width / item.asset?.metadata?.dimensions?.height}`,
            }"
          >
            <img
              :src="$urlFor(item.asset).height(100).format('webp').url()"
              alt=""
              srcset=""
              :style="{
                aspectRatio: `${item.asset?.metadata?.dimensions?.width || 20} / ${item.asset?.metadata?.dimensions?.height || 20}`,
              }"
            />
          </div>
          <!-- </ul> -->
        </Marquee>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.module {
  .client--item {
    flex-shrink: 0;
    margin: 0.6rem var(--spacing-sm);
    height: 100%;
    width: 100%;
    --size: 3.7rem;
    --width: calc(var(--ar) * var(--size));
    height: var(--size);
    width: var(--width, auto);
    img {
      width: 100%;
    }
  }
  span {
  }
  img {
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
