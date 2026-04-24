<script lang="ts" setup>
import type { AccordionItem } from '~/utils/sanity-api/sanity.types'
import { PortableText } from '@portabletext/vue'
import { portableTextComponents } from '~/utils/sanity-api/portableTextComponents'
import { gsap } from 'gsap'

const props = defineProps<{ input: AccordionItem; isActive?: boolean }>()
const active = ref<boolean>(false)
const detailRef = ref<HTMLElement>()

onMounted(() => {
  console.log('active', active.value)
  active.value = props.isActive
})
// use gsap to transition the detail height from 0 to detail intrinsic height. Classic accordion animation
watch(active, (isActive) => {
  if (detailRef.value) {
    if (isActive) {
      // Get the intrinsic height
      gsap.set(detailRef.value, { height: 'auto' })
      const height = detailRef.value.offsetHeight
      gsap.set(detailRef.value, { height: 0 })

      // Animate to intrinsic height
      gsap.to(detailRef.value, {
        height,
        duration: 0.3,
        ease: 'power2.inOut',
        onComplete: () => {
          if (detailRef.value) {
            gsap.set(detailRef.value, { height: 'auto' })
          }
        },
      })
    } else {
      // Animate to 0 height
      gsap.to(detailRef.value, {
        height: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      })
    }
  }
})
</script>

<template>
  <div :class="{ accordion__item: true, 'accordion__item--active': active }">
    <div v-if="active">active</div>
    <div
      class="summary"
      :style="{
        '--background': input.backgroundColor?.hex,
        '--color': input.foregroundColor?.hex,
      }"
      @click="active = !active"
    >
      <div class="icon">
        <div>{{ input.icon }}</div>
      </div>
      <h3>
        <div>{{ $localizeField(input.title) }}</div>
      </h3>
    </div>
    <div ref="detailRef" class="detail">
      <div class="text md:text-lg">
        <PortableText
          v-if="input.text"
          :value="$localizeField(input.text) || []"
          :components="portableTextComponents"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.accordion__item {
  &--active {
    .summary h3 {
      background-color: var(--background);
    }
  }
}
.summary {
  cursor: pointer;

  display: flex;
  border-bottom: var(--border);
  border-color: var(--background);
  .icon,
  h3 {
    --bubble-lh: var(--line-height-md);
    --bubble-padding-ratio: 0.25;
    --bubble-offset-ratio: 0.09;
    background-color: var(--background);
    color: var(--color);
    line-height: var(--bubble-lh);
    padding-inline: calc(var(--bubble-lh) * var(--bubble-padding-ratio));
    border-radius: var(--border-radius);
    &.icon {
      --bubble-lh: calc(var(--line-height-md) * 0.9);
    }
    div {
      transform: translateY(
        calc(var(--bubble-lh) * var(--bubble-offset-ratio))
      );
    }
  }
  .icon {
    width: var(--line-height-md);
    text-align: center;
  }
  h3 {
    transition: background-color 0.3s ease;
    background: color-mix(
      in srgb,
      var(--background) 50%,
      var(--color-black) 50%
    );
    &:hover {
      background-color: var(--background);
    }
  }
}
.detail {
  overflow: hidden;
  height: 0;
  .text {
    padding: var(--spacing-xs) 0 var(--spacing-md);
  }
}
</style>
