// Nuxt auto-importe les composables — pas besoin d'importer manuellement
// useState de Nuxt est SSR-safe et partagé entre composants comme un mini-store

export const useGizmoState = () => {
  const muted = useState('gizmo-muted', () => true)
  const cursorPosition = useState('gizmo-cursor', () => ({ x: 0, y: 0 }))
  const cursorVariant = useState('gizmo-variant', () => 'default')

  return { muted, cursorPosition, cursorVariant }
}
