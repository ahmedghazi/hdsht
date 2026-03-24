<script setup lang="ts">
import { PortableText, type PortableTextComponents } from "@portabletext/vue";
import { portableTextComponents } from "~/utils/sanity-api/portableTextComponents";
import type { TextUI } from "~/utils/sanity-api/sanity.types";

defineProps<{ input: TextUI }>();
</script>

<template>
  <section class="module module--textUI">
    <div class="inner">
      <ClientOnly>
        <div
          v-if="input.text && input.text.en"
          :class="`text md:${input.look}`">
          <PortableText
            :value="input.text.en"
            :components="portableTextComponents" />
        </div>
      </ClientOnly>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.inner {
}
@media (min-width: 800px) {
  .text {
    &.md\:text-lg {
      transform: translateX(-0.2rem);
    }
  }
}
@media (max-width: 800px) {
  .module {
  }
}
</style>
