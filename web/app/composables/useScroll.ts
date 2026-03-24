export function useScroll(): {
  scrollY: Ref<number>;
  scrollX: Ref<number>;
  scrollDirection: Ref<string>;
  scrollEnd: Ref<boolean>;
} {
  const scrollY = ref(0);
  const scrollX = ref(0);
  const scrollDirection = ref("");
  const scrollEnd = ref(false);

  const onScroll = () => {
    const prevY = scrollY.value;
    scrollY.value = window.scrollY;
    scrollX.value = window.scrollX;
    scrollDirection.value = window.scrollY > prevY ? "down" : "up";
    scrollEnd.value =
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 1;
  };

  onMounted(() => window.addEventListener("scroll", onScroll));
  onUnmounted(() => window.removeEventListener("scroll", onScroll));

  return {
    scrollY,
    scrollX,
    scrollDirection,
    scrollEnd,
  };
}
