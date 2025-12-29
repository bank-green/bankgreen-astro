/**
 * Cookie consent utilities for use in analytics and tracking
 * Use these functions to check if tracking is allowed before sending events
 */

import { GDPR_COOKIES } from './gdpr-store'

/**
 * Check if user has allowed cookies (server-side or client-side)
 * Use this before sending analytics events or loading tracking scripts
 */
export function hasAllowedCookies(): boolean {
  if (typeof document === 'undefined') {
    return false // Server-side: default to false
  }

  const cookies = document.cookie.split(';')
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=')
    if (name === GDPR_COOKIES.ALLOW_COOKIES) {
      return value === 'true'
    }
  }

  return false
}

/**
 * Wait for user consent before executing a callback
 * Useful for lazy-loading analytics scripts
 *
 * @example
 * waitForConsent(() => {
 *   // Load GTM or other analytics
 *   window.dataLayer = window.dataLayer || [];
 *   gtag('config', 'GA_MEASUREMENT_ID');
 * });
 */
export function waitForConsent(callback: () => void, checkInterval: number = 500): void {
  if (hasAllowedCookies()) {
    callback()
    return
  }

  const interval = setInterval(() => {
    if (hasAllowedCookies()) {
      clearInterval(interval)
      callback()
    }
  }, checkInterval)

  // Stop checking after 30 seconds
  setTimeout(() => clearInterval(interval), 30000)
}
