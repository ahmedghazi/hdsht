import gsap from 'gsap'

const CARD_STAGGER = 0.08
const ITEM_STAGGER = 0.02
const DURATION = 0.05
const ANIME_CLASS = 'domino-anime'

const animate = (el: HTMLElement, delay = 0, stagger = ITEM_STAGGER) => {
  gsap.from(el.querySelectorAll(`.${ANIME_CLASS}`), {
    // opacity: 0,
    autoAlpha: 0,
    duration: DURATION,
    stagger,
    delay,
    ease: 'expo.out',
    // ease: 'none', // linéaire — apparition franche, pas de fondu doux
  })
}

export function useDominoAnime(
  containerRef: Ref<HTMLElement | null>,
  index: number | Ref<number> = 0,
  stagger: number = ITEM_STAGGER,
) {
  onMounted(() => {
    if (!containerRef.value) return
    const i = typeof index === 'number' ? index : index.value
    animate(containerRef.value, i * CARD_STAGGER, stagger)
  })

  const trigger = (el: Ref<HTMLElement | null> | HTMLElement | null) => {
    const target = el && 'value' in el ? el.value : el
    if (!target) return
    animate(target)
  }

  return { animeClass: ANIME_CLASS, trigger }
}
