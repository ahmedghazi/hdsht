export function getSanityImageDimensionsFromRef(ref?: string) {
  if (!ref) return null
  const match = ref.match(/-(\d+)x(\d+)-/)
  if (!match) return null
  const w = Number(match[1])
  const h = Number(match[2])
  return { width: w, height: h, aspectRatio: w / h }
}
