import gsap from 'gsap'

const CARD_STAGGER = 0.1
const ITEM_STAGGER = 0.03
const DURATION = 0.01
const ANIME_CLASS = 'domino-anime'

const animate = (el: HTMLElement, delay = 0) => {
  gsap.from(el.querySelectorAll(`.${ANIME_CLASS}`), {
    autoAlpha: 0,
    // clipPath: 'inset(0 100% 0 0)',
    duration: DURATION,
    stagger: ITEM_STAGGER,
    delay,
    // ease: 'power3.out',
    ease: 'expo.out',
  })
}

export function useDominoAnime(
  containerRef: Ref<HTMLElement | null>,
  index: number | Ref<number> = 0,
) {
  onMounted(() => {
    if (!containerRef.value) return
    const i = typeof index === 'number' ? index : index.value
    animate(containerRef.value, i * CARD_STAGGER)
  })

  const trigger = (el: Ref<HTMLElement | null> | HTMLElement | null) => {
    const target = el && 'value' in el ? el.value : el
    if (!target) return
    animate(target)
  }

  return { animeClass: ANIME_CLASS, trigger }
}
