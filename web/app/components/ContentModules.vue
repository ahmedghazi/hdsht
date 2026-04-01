<script setup lang="ts">
import ModuleListProjectsUI from './modules/ModuleListProjectsUI.vue'
import ModuleTextUI from './modules/ModuleTextUI.vue'
import ModuleImagesUI from './modules/ModuleImagesUI.vue'
import ModuleClientsUI from './modules/ModuleClientsUI.vue'
import ModuleLocationMapUI from './modules/ModuleLocationMapUI.vue'
import ModuleContactsUI from './modules/ModuleContactsUI.vue'
import ModuleGranularStripeUI from './modules/ModuleGranularStripeUI.vue'
import ModuleServicesUI from './modules/ModuleServicesUI.vue'
import type {
  ClientsUI,
  ImagesUI,
  ListProjectsUI,
  TextUI,
  LocationMapUI,
  ContactsUI,
  GranularStripeUI,
  ServicesUI,
  MediaUI,
} from '~/utils/sanity-api/sanity.types'
import ModuleMediaUI from './modules/ModuleMediaUI.vue'

defineProps({
  input: Array<
    | TextUI
    | ListProjectsUI
    | ImagesUI
    | ClientsUI
    | LocationMapUI
    | ContactsUI
    | GranularStripeUI
    | ServicesUI
    | MediaUI
  >,
})
</script>

<template>
  <div class="content-modules">
    <div class="grid md:grid-cols-2 gap-md">
      <template v-for="item in input" :key="item._key">
        <ModuleListProjectsUI
          v-if="item._type == 'listProjectsUI'"
          :input="item"
        />
        <ModuleTextUI v-if="item._type == 'textUI'" :input="item" />
        <ModuleImagesUI v-if="item._type == 'imagesUI'" :input="item" />
        <ModuleClientsUI v-if="item._type == 'clientsUI'" :input="item" />
        <ModuleLocationMapUI
          v-if="item._type == 'locationMapUI'"
          :input="item"
        />
        <ModuleContactsUI v-if="item._type == 'contactsUI'" :input="item" />
        <ModuleGranularStripeUI
          v-if="item._type == 'granularStripeUI'"
          :input="item"
        />
        <ModuleServicesUI v-if="item._type == 'servicesUI'" :input="item" />
        <ModuleMediaUI v-if="item._type == 'mediaUI'" :input="item" />
      </template>
    </div>
  </div>

  <!-- <pre>{{ input }}</pre> -->
</template>

<style lang="scss" scoped>
.module {
  // margin-bottom: var(--spacing-md);

  &:last-child {
    margin-bottom: 0;
  }
  @media (min-width: 800px) {
    // margin-bottom: var(--spacing-xl);
  }
}
</style>
