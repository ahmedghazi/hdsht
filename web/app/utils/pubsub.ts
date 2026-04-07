type Handler = (e: { type: string }, ...params: unknown[]) => void

const listeners: Record<string, Handler[]> = {}

export const on = (event: string, handler: Handler) => {
  ;(listeners[event] ??= []).push(handler)
  return () => off(event, handler)
}

export const off = (event: string, handler: Handler) => {
  listeners[event] = listeners[event]?.filter((h) => h !== handler) ?? []
}

export const emit = (event: string, ...params: unknown[]) => {
  listeners[event]?.forEach((h) => h({ type: event }, ...params))
}
