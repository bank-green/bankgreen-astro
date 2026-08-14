import { getCookie, setCookie } from '@lib/cookies'
import { atom } from 'nanostores'

export const SEEN_COOKIE = 'bg.seenSwitchSurvey'

export const SUBMITTED_COOKIE = 'bg.submittedSwitchSurvey'

export const RETURNING_COOKIE = 'bg.switchSurveyReturning'

export const BANK_PAGE_COUNT_KEY = 'bg.bankPageCount'

export const showSurveyStore = atom<boolean>(false)

export const hasSurveyShownStore = atom<boolean>(false)

export const isReturningVisitorStore = atom<boolean>(false)

export function initSurveyStore(): void {
  const { seen, switched, returning } = checkSurveyCookies()
  const hasSeen = seen || switched
  hasSurveyShownStore.set(hasSeen)
  isReturningVisitorStore.set(returning)
  showSurveyStore.set(false)

  if (hasSeen) return

  if (window.location.pathname.startsWith('/banks/')) {
    const count = parseInt(sessionStorage.getItem(BANK_PAGE_COUNT_KEY) || '0', 10) + 1
    sessionStorage.setItem(BANK_PAGE_COUNT_KEY, String(count))
    if (count >= 2) {
      triggerSurvey()
    }
  }
}

function triggerSurvey(): void {
  if (hasSurveyShownStore.get()) return
  hasSurveyShownStore.set(true)
  showSurveyStore.set(true)
}

export function markSurveySeen(): void {
  setCookie(SEEN_COOKIE, 'true', 30)
  showSurveyStore.set(false)
  hasSurveyShownStore.set(true)
}

export function markSwitchedSubmitted(): void {
  setCookie(SUBMITTED_COOKIE, 'true', 365)
  hasSurveyShownStore.set(true)
}

export function markPlanningSubmitted(): void {
  setCookie(SEEN_COOKIE, 'true', 30)
  setCookie(RETURNING_COOKIE, 'true')
  hasSurveyShownStore.set(true)
}

export interface SurveyCookieState {
  seen: boolean

  switched: boolean

  returning: boolean
}

export function checkSurveyCookies(): SurveyCookieState {
  return {
    seen: getCookie(SEEN_COOKIE) === 'true',
    switched: getCookie(SUBMITTED_COOKIE) === 'true',
    returning: getCookie(RETURNING_COOKIE) === 'true',
  }
}

const SCROLL_TRIGGER_RATIO = 0.5

let dwellTimer: ReturnType<typeof setTimeout> | null = null
let scrollHandler: (() => void) | null = null
let scrollFrame: number | null = null

export function startSurveyTriggers(): void {
  if (hasSurveyShownStore.get()) return

  dwellTimer = setTimeout(triggerSurvey, 60_000)

  if (window.innerHeight >= document.documentElement.scrollHeight * SCROLL_TRIGGER_RATIO) return

  scrollHandler = () => {
    if (scrollFrame !== null) return
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = null
      const scrolled = window.scrollY + window.innerHeight
      const total = document.documentElement.scrollHeight
      if (total > 0 && scrolled / total >= SCROLL_TRIGGER_RATIO) {
        triggerSurvey()
        stopSurveyTriggers()
      }
    })
  }
  window.addEventListener('scroll', scrollHandler, { passive: true })

  scrollHandler()
}

export function stopSurveyTriggers(): void {
  if (dwellTimer) {
    clearTimeout(dwellTimer)
    dwellTimer = null
  }
  if (scrollFrame !== null) {
    cancelAnimationFrame(scrollFrame)
    scrollFrame = null
  }
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
    scrollHandler = null
  }
}
