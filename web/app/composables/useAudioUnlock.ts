export function useAudioUnlock() {
  const audioUnlocked = useState<boolean>('audio.unlocked', () => false)
  const unlock = () => { audioUnlocked.value = true }
  return { audioUnlocked, unlock }
}
