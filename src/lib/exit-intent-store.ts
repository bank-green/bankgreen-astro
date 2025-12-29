/**
 * Exit Intent State Management
 * Uses nanostores for shared state between islands
 * Follows the same pattern as gdpr-store.ts
 */

import { atom } from 'nanostores'

export const EXIT_INTENT_COOKIE = 'bg.seenExitIntent' as const

export const showDialogStore = atom<boolean>(false)
export const hasSeenDialogStore = atom<boolean>(false)

/**
 * Initialize stores from cookie values (call this on mount)
 */
export function initExitIntentStore(hasSeenDialog: boolean): void {
  hasSeenDialogStore.set(hasSeenDialog)
  showDialogStore.set(false)
}

/**
 * Client-side cookie utility
 * Same implementation as GDPR store for consistency
 */
export function setCookie(name: string, value: string, days: number = 365): void {
  if (typeof document === 'undefined') return

  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `expires=${date.toUTCString()}`

  // biome-ignore lint/suspicious/noDocumentCookie: Exit intent tracking requires client-side cookie management
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax;Secure`
}

/**
 * Mark dialog as seen - sets cookie and updates stores
 */
export function markDialogSeen(): void {
  setCookie(EXIT_INTENT_COOKIE, 'true')
  showDialogStore.set(false)
  hasSeenDialogStore.set(true)
}

let timeoutId: NodeJS.Timeout | null = null

/**
 * Trigger dialog with 3-second delay
 * Prevents multiple simultaneous timeouts
 */
function triggerDialogWithDelay(): void {
  if (timeoutId) {
    return // Prevent multiple timeouts
  }

  timeoutId = setTimeout(() => {
    showDialogStore.set(true)
    hasSeenDialogStore.set(true) // Mark as seen but don't close it yet
    timeoutId = null
  }, 3000)
}

/**
 * Clear the exit intent timeout
 * Should be called on component unmount
 */
export function clearExitIntentTimeout(): void {
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
}

/**
 * Handle exit intent events
 * Two trigger conditions:
 * 1. Mouse moves to top 10px (user heading to close/tab bar)
 * 2. Mouse leaves viewport entirely
 */
export function handleExitIntent(event: MouseEvent): void {
  if (hasSeenDialogStore.get()) return
  if (showDialogStore.get()) return

  // Trigger 1: Moving toward top (close/tab intent)
  if (event.type === 'mousemove' && event.clientY <= 10) {
    triggerDialogWithDelay()
  }

  // Trigger 2: Leaving viewport
  if (event.type === 'mouseout' && !event.relatedTarget) {
    triggerDialogWithDelay()
  }
}
