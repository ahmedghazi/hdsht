export function useIsMobile(): {
  isMobile: Ref<boolean>
} {
  const isMobile = ref<boolean>(false)

  const onResize = () => {
    isMobile.value = window.innerWidth < 800
    if (window.innerWidth < 800) {
      isMobile.value = true
    }
  }

  onMounted(() => window.addEventListener('resize', onResize))
  onUnmounted(() => window.removeEventListener('resize', onResize))
  return {
    isMobile,
  }
}
