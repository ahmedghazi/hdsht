<template>
  <canvas ref="canvasRef" />
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)

// ─── Shaders ─────────────────────────────────────────────────────────────────

const VERT = /* glsl */ `
  attribute vec2 a_position;
  varying vec2 vUv;
  void main() {
    vUv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

// Ping-pong smoke simulation (ported from G0 ShaderMaterial)
const FRAG_SIM = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform vec2  res;
  uniform sampler2D bufferTexture;
  uniform vec3  smokeSource; // xy = mouse [0..1], z = intensity
  uniform float fadeOut;

  void main() {
    vec2 pixel = gl_FragCoord.xy / res;
    vec4 tempP = texture2D(bufferTexture, pixel);

    // Slight zoom-toward-center each frame → trailing fade
    pixel -= vec2(0.5);
    pixel /= vec2(1.0 + 0.004 * (1.0 - tempP.r));
    pixel += vec2(0.5);

    gl_FragColor = texture2D(bufferTexture, pixel);

    // Inject smoke at cursor
    float dist = distance(
      vec2(smokeSource.x * res.x, (1.0 - smokeSource.y) * res.y),
      gl_FragCoord.xy
    );
    gl_FragColor.a   = 1.0;
    gl_FragColor.rgb += max(35.0 - dist, 0.0) * smokeSource.z;

    // Diffuse neighbours
    float xp = 1.0 / res.x;
    float yp = 1.0 / res.y;
    vec4 r = texture2D(bufferTexture, vec2(pixel.x + xp, pixel.y));
    vec4 l = texture2D(bufferTexture, vec2(pixel.x - xp, pixel.y));
    vec4 u = texture2D(bufferTexture, vec2(pixel.x, pixel.y + yp));
    vec4 d = texture2D(bufferTexture, vec2(pixel.x, pixel.y - yp));

    float factor = 14.0 * 0.016 * (l.r + r.r + d.r + u.r - 4.0 * gl_FragColor.r);
    float minimum = fadeOut;
    if (factor >= -minimum && factor < 0.0) factor = -minimum;
    gl_FragColor.rgb += factor;
  }
`

// Colorize the smoke grayscale buffer with sine-mapped colours (ported from Z0)
const FRAG_COLOR = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D tex;
  uniform float time;

  void main() {
    vec4 img = texture2D(tex, vUv);
    gl_FragColor = vec4(
      sin(img.r * 10.0 + time * 0.1)       * 0.5 + 0.5,
      sin(img.g * 10.0 + time * 0.1 + 2.5) * 0.5 + 0.5,
      sin(img.b * 10.0 + time * 0.1 + 5.0) * 0.5 + 0.5,
      img.r * 0.6
    );
  }
`

// ─── WebGL helpers ────────────────────────────────────────────────────────────

function createShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!
  gl.shaderSource(s, src)
  gl.compileShader(s)
  return s
}

function createProgram(gl: WebGLRenderingContext, vert: string, frag: string) {
  const prog = gl.createProgram()!
  gl.attachShader(prog, createShader(gl, gl.VERTEX_SHADER, vert))
  gl.attachShader(prog, createShader(gl, gl.FRAGMENT_SHADER, frag))
  gl.linkProgram(prog)
  return prog
}

function createFBO(gl: WebGLRenderingContext, w: number, h: number) {
  const tex = gl.createTexture()!
  gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

  const fbo = gl.createFramebuffer()!
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0)
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)

  return { tex, fbo }
}

// ─── Component setup ──────────────────────────────────────────────────────────

let rafId = 0
let gl: WebGLRenderingContext | null = null

function cleanup() {
  cancelAnimationFrame(rafId)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('touchmove', onTouchMove)
}

const mouse = { x: 0.5, y: 0.5, vx: 0, vy: 0, px: 0.5, py: 0.5 }
let active = false
let inactiveTimer: ReturnType<typeof setTimeout> | null = null

function resetInactiveTimer() {
  active = true
  if (inactiveTimer) clearTimeout(inactiveTimer)
  inactiveTimer = setTimeout(() => { active = false }, 8000)
}

function onMouseMove(e: MouseEvent) {
  mouse.x = e.clientX / window.innerWidth
  mouse.y = e.clientY / window.innerHeight
  resetInactiveTimer()
}

function onTouchMove(e: TouchEvent) {
  const t = e.touches[0]
  mouse.x = t.clientX / window.innerWidth
  mouse.y = t.clientY / window.innerHeight
  resetInactiveTimer()
}

onMounted(() => {
  const canvas = canvasRef.value!
  gl = canvas.getContext('webgl', { alpha: true, antialias: false, preserveDrawingBuffer: false })!

  const progSim   = createProgram(gl, VERT, FRAG_SIM)
  const progColor = createProgram(gl, VERT, FRAG_COLOR)

  // Full-screen quad
  const quad = gl.createBuffer()!
  gl.bindBuffer(gl.ARRAY_BUFFER, quad)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)

  function bindQuad(prog: WebGLProgram) {
    gl!.bindBuffer(gl!.ARRAY_BUFFER, quad)
    const loc = gl!.getAttribLocation(prog, 'a_position')
    gl!.enableVertexAttribArray(loc)
    gl!.vertexAttribPointer(loc, 2, gl!.FLOAT, false, 0, 0)
  }

  let w = 0, h = 0
  let fboA = createFBO(gl, 1, 1)
  let fboB = createFBO(gl, 1, 1)

  function resize() {
    w = window.innerWidth
    h = window.innerHeight
    canvas.width  = w
    canvas.height = h

    // Recreate FBOs at new size
    gl!.deleteTexture(fboA.tex); gl!.deleteFramebuffer(fboA.fbo)
    gl!.deleteTexture(fboB.tex); gl!.deleteFramebuffer(fboB.fbo)
    fboA = createFBO(gl!, w, h)
    fboB = createFBO(gl!, w, h)
  }

  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('touchmove', onTouchMove, { passive: true })

  let frame = 0

  function render() {
    rafId = requestAnimationFrame(render)
    if (!active) return

    frame++

    // Smooth mouse velocity
    mouse.vx = (mouse.x - mouse.px + mouse.vx) * 0.5
    mouse.vy = (mouse.y - mouse.py + mouse.vy) * 0.5
    const intensity = Math.abs(mouse.vx + mouse.vy) * 5
    mouse.px = mouse.x
    mouse.py = mouse.y

    // ── Simulation pass → fboB ─────────────────────────────────────────
    gl!.bindFramebuffer(gl!.FRAMEBUFFER, fboB.fbo)
    gl!.viewport(0, 0, w, h)
    gl!.useProgram(progSim)
    bindQuad(progSim)

    gl!.activeTexture(gl!.TEXTURE0)
    gl!.bindTexture(gl!.TEXTURE_2D, fboA.tex)
    gl!.uniform1i(gl!.getUniformLocation(progSim, 'bufferTexture'), 0)
    gl!.uniform2f(gl!.getUniformLocation(progSim, 'res'), w, h)
    gl!.uniform3f(gl!.getUniformLocation(progSim, 'smokeSource'), mouse.x, mouse.y, intensity)
    gl!.uniform1f(gl!.getUniformLocation(progSim, 'fadeOut'), 0.005)

    gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)

    // Swap ping-pong
    const tmp = fboA; fboA = fboB; fboB = tmp

    // ── Colorize pass → screen ─────────────────────────────────────────
    gl!.bindFramebuffer(gl!.FRAMEBUFFER, null)
    gl!.viewport(0, 0, w, h)
    gl!.clearColor(0, 0, 0, 0)
    gl!.clear(gl!.COLOR_BUFFER_BIT)

    gl!.useProgram(progColor)
    bindQuad(progColor)

    gl!.activeTexture(gl!.TEXTURE0)
    gl!.bindTexture(gl!.TEXTURE_2D, fboA.tex)
    gl!.uniform1i(gl!.getUniformLocation(progColor, 'tex'), 0)
    gl!.uniform1f(gl!.getUniformLocation(progColor, 'time'), frame)

    gl!.enable(gl!.BLEND)
    gl!.blendFunc(gl!.SRC_ALPHA, gl!.ONE_MINUS_SRC_ALPHA)
    gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)
    gl!.disable(gl!.BLEND)
  }

  render()
})

onBeforeUnmount(() => {
  cleanup()
  if (inactiveTimer) clearTimeout(inactiveTimer)
  window.removeEventListener('resize', () => {})
})
</script>

<style scoped>
canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;
}
</style>
