/**
 * GDPR Cookie Consent State Management
 * Uses nanostores for shared state between islands
 */

import { atom } from 'nanostores'

export const GDPR_COOKIES = {
  SHOW_BANNER: 'bg.showbanner',
  ALLOW_COOKIES: 'bg.allowcookies',
} as const

/**
 * Type for Google Tag Manager gtag function
 */
interface GtagWindow extends Window {
  gtag?: (command: string, action: string, params: Record<string, string>) => void
}

/**
 * Store for banner visibility
 */
export const showBannerStore = atom<boolean>(true)

/**
 * Store for cookie consent status
 */
export const cookieConsentStore = atom<boolean>(false)

/**
 * Initialize stores from cookie values (call this on mount)
 */
export function initGdprStores(showBanner: boolean, allowCookies: boolean): void {
  showBannerStore.set(showBanner)
  cookieConsentStore.set(allowCookies)
}

/**
 * Client-side cookie utilities
 */
export function setCookie(name: string, value: string, days: number = 365): void {
  if (typeof document === 'undefined') return

  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `expires=${date.toUTCString()}`

  // biome-ignore lint/suspicious/noDocumentCookie: GDPR consent requires client-side cookie management
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax;Secure`
}

/**
 * Accept cookies - sets consent and hides banner
 */
export function acceptCookies(): void {
  setCookie(GDPR_COOKIES.SHOW_BANNER, 'false')
  setCookie(GDPR_COOKIES.ALLOW_COOKIES, 'true')

  showBannerStore.set(false)
  cookieConsentStore.set(true)

  // Enable GTM or analytics here if needed
  if (typeof window !== 'undefined' && (window as GtagWindow).gtag) {
    ;(window as GtagWindow).gtag?.('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
    })
  }
}

/**
 * Decline cookies - hides banner but doesn't allow tracking
 */
export function declineCookies(): void {
  setCookie(GDPR_COOKIES.SHOW_BANNER, 'false')
  setCookie(GDPR_COOKIES.ALLOW_COOKIES, 'false')

  showBannerStore.set(false)
  cookieConsentStore.set(false)
}

/**
 * Check if cookies are allowed (for use in tracking code)
 */
export function areCookiesAllowed(): boolean {
  return cookieConsentStore.get()
}
