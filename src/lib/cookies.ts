/**
 * Client-side cookie utilities
 */

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null

  const cookies = document.cookie.split(';')
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=')
    if (cookieName === name) {
      return cookieValue
    }
  }
  return null
}

export function setCookie(name: string, value: string, days: number = 365): void {
  if (typeof document === 'undefined') return

  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `expires=${date.toUTCString()}`

  // biome-ignore lint/suspicious/noDocumentCookie: GDPR consent requires client-side cookie management
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax;Secure`
}
