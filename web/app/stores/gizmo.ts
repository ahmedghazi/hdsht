// import { defineStore } from 'pinia'
// import { ref } from 'vue'

// export const useGizmoStore = defineStore('gizmo', () => {
//   const muted = ref(true)
//   const cursorPosition = ref({ x: 0, y: 0 })
//   const cursorVariant = ref('default')

//   // Appelé uniquement dans onMounted, donc safe SSR
//   function initCursorTracking() {
//     window.addEventListener('mousemove', (e) => {
//       cursorPosition.value = { x: e.clientX, y: e.clientY }
//     })
//   }

//   return { muted, cursorPosition, cursorVariant, initCursorTracking }
// })
