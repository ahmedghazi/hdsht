<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Composable Nuxt SSR-safe — remplace le store Pinia
const { muted, cursorPosition, cursorVariant } = useGizmoState()

const ARC_TUBE = 0.25 // épaisseur des arcs (rayon du tube du tore)

const hovered = ref(false)
const canvasRef = ref<HTMLCanvasElement | null>(null)

// Types Three.js uniquement pour TypeScript, pas d'import runtime
type ThreeScene = import('three').Scene
type ThreeCamera = import('three').PerspectiveCamera
type ThreeMesh = import('three').Mesh
type ThreeGroup = import('three').Group
type ThreeRenderer = import('three').WebGLRenderer

let renderer: ThreeRenderer | undefined
let scene: ThreeScene | undefined
let camera: ThreeCamera | undefined
let arcGreen: ThreeMesh | undefined
let cursorGroup: ThreeGroup | undefined
let animFrameId: number
let canvasCenterX = 0
let canvasCenterY = 0

const scrollY = ref(0)
const bodyHeight = ref(1)
const isMobile = ref(false)
const touchPos = ref({ x: 0, y: 0 })

// ─── Lerp helper ──────────────────────────────────────────────────────────
function lerp(current: number, target: number, alpha: number) {
  return current + (target - current) * alpha
}

// ─── Init Three.js — dynamic import, client only ──────────────────────────
async function initThree() {
  const canvas = canvasRef.value
  if (!canvas) return
  console.log(canvas)

  const W = canvas.clientWidth
  const H = canvas.clientHeight

  // Tous les imports Three.js ici — jamais exécutés côté serveur
  const THREE = await import('three')

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(W, H, false)
  renderer.setClearColor(0x000000, 0)

  // Scene & caméra
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, W / H, 0.1, 1000)
  camera.position.set(0, 0, 4)

  scene.add(new THREE.AmbientLight(0xffffff, 6))
  console.log(scene)
  // ── Factory mesh torus ─────────────────────────────────────────────────
  function makeTorus(
    arc: number,
    color: string,
    rotation: [number, number, number],
    scale: number,
  ) {
    const mesh = new THREE.Mesh(
      new THREE.TorusGeometry(20, ARC_TUBE, 12, 120, arc),
      new THREE.MeshStandardMaterial({ color: new THREE.Color(color) }),
    )
    mesh.rotation.set(...rotation)
    mesh.scale.setScalar(scale)
    return mesh
  }

  // Arc blanc — anneau complet, statique
  const arcWhite = makeTorus(Math.PI * 2, '#ffffff', [0, 0, 0], 0.13)

  // Arc vert — piloté par le scroll
  arcGreen = makeTorus(Math.PI, 'rgb(0,255,0)', [0, Math.PI, -Math.PI / 2], 0.1)

  // Groupe curseur — arcs magenta + bleu
  cursorGroup = new THREE.Group()
  cursorGroup.add(
    makeTorus(Math.PI, 'rgb(255,0,255)', [0, -Math.PI / 2, -Math.PI / 2], 0.1),
    makeTorus(Math.PI, 'rgb(0,0,255)', [Math.PI / 2, 0, 0], 0.1),
  )

  scene.add(arcWhite, arcGreen, cursorGroup)

  animate()
}

// ─── Boucle d'animation ───────────────────────────────────────────────────
function animate() {
  animFrameId = requestAnimationFrame(animate)
  if (!arcGreen || !cursorGroup) return

  const pos = isMobile.value ? touchPos.value : cursorPosition.value

  arcGreen.rotation.z = lerp(
    arcGreen.rotation.z,
    -Math.PI / 2 - (Math.PI * (scrollY.value / bodyHeight.value)) / 1.5,
    0.8,
  )

  arcGreen.rotation.y = lerp(
    arcGreen.rotation.y,
    Math.PI +
      ((pos.x - canvasCenterX) / (window.innerWidth / 2)) * (Math.PI / 4),
    0.08,
  )

  arcGreen.rotation.x = lerp(
    arcGreen.rotation.x,
    ((pos.y - canvasCenterY) / (window.innerHeight / 2)) * (Math.PI / 4),
    0.8,
  )

  cursorGroup.rotation.y = lerp(
    cursorGroup.rotation.y,
    ((pos.x - canvasCenterX) / (window.innerWidth / 2)) * (Math.PI / 2) * 0.75,
    0.8,
  )

  cursorGroup.rotation.x = lerp(
    cursorGroup.rotation.x,
    ((pos.y - canvasCenterY) / (window.innerHeight / 2)) * (Math.PI / 2) * 0.75,
    0.8,
  )

  if (renderer && scene && camera) renderer.render(scene, camera)
}

// ─── Event handlers ───────────────────────────────────────────────────────
function onScroll() {
  scrollY.value = window.scrollY
}

function onTouch(e: TouchEvent) {
  touchPos.value = { x: e.touches[0].clientX, y: e.touches[0].clientY }
}

function onMouseMove(e: MouseEvent) {
  cursorPosition.value = { x: e.clientX, y: e.clientY }
}

function updateCanvasCenter() {
  const rect = canvasRef.value?.getBoundingClientRect()
  if (!rect) return
  canvasCenterX = rect.left + rect.width / 2
  canvasCenterY = rect.top + rect.height / 2
}

function onResize() {
  const canvas = canvasRef.value
  if (!renderer || !camera || !canvas) return
  const W = canvas.clientWidth
  const H = canvas.clientHeight
  camera.aspect = W / H
  camera.updateProjectionMatrix()
  renderer.setSize(W, H, false)
  updateCanvasCenter()
}

// ─── Cycle de vie — onMounted garantit le client uniquement ───────────────
onMounted(async () => {
  isMobile.value =
    !!navigator.userAgent.match(/(iPad|iPhone|iPod|android|webOS)/) ||
    window.innerWidth < 768

  bodyHeight.value = document.body.scrollHeight
  scrollY.value = window.scrollY

  await initThree()
  updateCanvasCenter()

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
  window.addEventListener('mousemove', onMouseMove, { passive: true })

  if (isMobile.value) {
    window.addEventListener('touchstart', onTouch, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
  }
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animFrameId)
  renderer?.dispose()
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('mousemove', onMouseMove)
  if (isMobile.value) {
    window.removeEventListener('touchstart', onTouch)
    window.removeEventListener('touchmove', onTouch)
  }
})

// ─── Interactions UI ──────────────────────────────────────────────────────
function onMouseOver() {
  hovered.value = true
  cursorVariant.value = 'hoveronlink'
}

function onMouseLeave() {
  hovered.value = false
  cursorVariant.value = 'default'
}

function onClick() {
  muted.value = !muted.value
}
</script>

<template>
  <div
    class="gizmo-canvas"
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave"
    @click="onClick"
  >
    <canvas ref="canvasRef" class="gizmo-three-canvas" />
  </div>
</template>

<style scoped>
.gizmo-canvas {
  /* position: fixed; */
  /* top: 50%; */
  /* right: 0; */
  /* transform: translateY(-50%); */
  width: 25.5rem;
  height: 25.5rem;
  z-index: 98;
  cursor: none;
  position: relative;
}

.gizmo-three-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.gizmo-icon {
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3rem;
  max-height: 1rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row-reverse;
}

.gizmo-bars {
  display: flex;
  justify-content: space-between;
  width: 1rem;
  height: 1rem;
}

.gizmo-message {
  position: absolute;
  right: 0;
  background-color: rgba(0, 0, 0, 0.21);
  backdrop-filter: blur(10px);
  border-radius: 3rem;
  max-height: 1rem;
  padding: 1rem;
  color: #fff;
  transition: all 1s ease;
}

.gizmo-message p {
  white-space: nowrap;
  margin: 0;
  width: 0;
  overflow: hidden;
}

.gizmo-message.open {
  width: fit-content;
  padding-right: 10rem;
}

.gizmo-message.open p {
  display: block;
  width: fit-content;
}

.gizmo-icon span {
  width: 3px;
  height: 100%;
  background-color: #fff;
  border-radius: 3px;
  animation: bounce 2.2s ease infinite alternate;
}

.gizmo-icon span:nth-of-type(2) {
  animation-delay: -2.2s;
}
.gizmo-icon span:nth-of-type(3) {
  animation-delay: -3.7s;
}

@keyframes bounce {
  10% {
    transform: scaleY(0.3);
  }
  30% {
    transform: scaleY(1);
  }
  60% {
    transform: scaleY(0.5);
  }
  80% {
    transform: scaleY(0.75);
  }
  100% {
    transform: scaleY(0.6);
  }
}
</style>
