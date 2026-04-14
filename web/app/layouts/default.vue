<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import type { SETTINGS_QUERY_RESULT } from '~/utils/sanity-api/sanity.types'
import { SETTINGS_QUERY } from '~/utils/sanity-api/queries'
import PhiberMouse from '~/components/PhiberMouse.vue'
import Canvasfavicon from '~/components/ui/Canvasfavicon.vue'

const { data } = await useSanityData<SETTINGS_QUERY_RESULT>(SETTINGS_QUERY)

onMounted(() => {
  _format()
  window.addEventListener('resize', _format)
})

onUnmounted(() => {
  window.removeEventListener('resize', _format)
})

function _format() {
  const vh: number = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)

  const vw: number = window.innerWidth * 0.01
  document.documentElement.style.setProperty('--vw', `${vw}px`)

  const header = document.querySelector('header#header-site')
  let headerBounding = { height: 50 }
  if (header) {
    headerBounding = header.getBoundingClientRect()
    document.documentElement.style.setProperty(
      '--header-h',
      headerBounding.height + 'px',
    )
  }

  const footer = document.querySelector('footer#footer-site')
  let footerBounding = { height: 50 }
  if (footer) {
    footerBounding = footer.getBoundingClientRect()

    document.documentElement.style.setProperty(
      '--footer-h',
      footerBounding.height + 'px',
    )
  }
}
</script>

<template>
  <div id="page">
    <Header :settings="data" />
    <main><slot /></main>
    <Footer :settings="data" />
    <PhiberMouse />
    <Canvasfavicon :letter="'H'" :background="'#ef73ed'" :foreground="'#000'" />
  </div>
</template>
