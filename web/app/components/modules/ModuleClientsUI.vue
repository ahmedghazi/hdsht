<script setup lang="ts">
import { PortableText } from "@portabletext/vue";
import type { ClientsUI } from "~/utils/sanity-api/sanity.types";

defineProps<{ input: ClientsUI }>();

onMounted(() => {
  console.log("ModuleListArticlesUI mounted");
  // console.log()
});
</script>

<template>
  <section class="module module--clients-ui">
    <div class="inner">
      <div class="md:grid md:grid-cols-2 gap-md">
        <div></div>
        <div class="list">
          <h2>{{ input.title }}</h2>
          <ul class="text-lg">
            <li v-for="item in input.items" :key="item" class="client--item">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.module {
  h2 {
    margin-bottom: 1rem;
  }
  .text-lg {
    transform: translateX(-0.2rem);
  }
  .client--item {
    line-height: 1.1;
  }
}
@media (max-width: 800px) {
  .module {
  }
}
</style>
