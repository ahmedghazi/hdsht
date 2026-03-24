<script setup lang="ts">
import ModuleListProjectsUI from "./modules/ModuleListProjectsUI.vue";
import ModuleTextUI from "./modules/ModuleTextUI.vue";
import ModuleImagesUI from "./modules/ModuleImagesUI.vue";
import ModuleClientsUI from "./modules/ModuleClientsUI.vue";
import type {
  ClientsUI,
  ImagesUI,
  ListProjectsUI,
  TextUI,
} from "~/utils/sanity-api/sanity.types";
// import { modules } from '~/utils/sanity-api/fragments'

defineProps({
  input: Array<
    TextUI | ListProjectsUI | ImagesUI | ClientsUI
    // | SanityKeyed<ImagesUI>
    // | SanityKeyed<ClientsUI>
  >,
});
</script>

<template>
  <div class="module" v-for="item in input" :key="Math.random()">
    <ModuleListProjectsUI v-if="item._type == 'listProjectsUI'" :input="item" />
    <ModuleTextUI v-if="item._type == 'textUI'" :input="item" />
    <ModuleImagesUI v-if="item._type == 'imagesUI'" :input="item" />
    <ModuleClientsUI v-if="item._type == 'clientsUI'" :input="item" />
  </div>
  <!-- <pre>{{ input }}</pre> -->
</template>

<style lang="scss" scoped>
.module {
  margin-bottom: var(--spacing-lg);

  &:last-child {
    margin-bottom: 0;
  }
  @media (min-width: 800px) {
    margin-bottom: var(--spacing-xl);
  }
}
</style>
