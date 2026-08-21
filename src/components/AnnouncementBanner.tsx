import { Anchor, CloseButton } from '@mantine/core'
import cx from 'clsx'
import { useEffect, useState } from 'react'

const WATCHTOWER_URL = 'https://watchtower.bank.green'
const WATCHTOWER_BANNER_ENABLED = true
const WATCHTOWER_BANNER_START_AT = Date.parse('2026-08-22T00:00:00Z')

interface Props {
  isHeaderCollapsed: boolean
}

export function AnnouncementBanner({ isHeaderCollapsed }: Props) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!WATCHTOWER_BANNER_ENABLED) return

    if (import.meta.env.DEV) {
      const animationFrameId = window.requestAnimationFrame(() => setIsVisible(true))
      return () => window.cancelAnimationFrame(animationFrameId)
    }

    const timeUntilStart = WATCHTOWER_BANNER_START_AT - Date.now()
    if (timeUntilStart <= 0) {
      setIsVisible(true)
      return
    }

    const timeoutId = window.setTimeout(() => setIsVisible(true), timeUntilStart)
    return () => window.clearTimeout(timeoutId)
  }, [])

  return (
    <aside
      aria-hidden={!isVisible || isHeaderCollapsed}
      aria-live="polite"
      className={cx(
        'fixed top-13 right-0 left-0 z-99 mx-auto grid w-full max-w-6xl grid-cols-[2.75rem_minmax(0,1fr)_2.75rem] items-center rounded-b-xl bg-sushi-500 pt-3 pb-1 text-center font-medium text-sm text-white transition-[translate,box-shadow] duration-200 ease-out motion-reduce:transition-none sm:text-base',
        isHeaderCollapsed
          ? '-translate-y-[calc(100%+3.25rem)] pointer-events-none shadow-none'
          : isVisible
            ? 'translate-y-0 shadow-xl/20'
            : '-translate-y-full pointer-events-none shadow-none'
      )}
    >
      <p className="col-start-2 m-0 text-center">
        Check out{' '}
        <Anchor
          href={WATCHTOWER_URL}
          target="_blank"
          rel="noopener"
          className="font-semibold text-white underline decoration-white underline-offset-2 visited:text-white hover:text-white focus:text-white active:text-white"
          tabIndex={isVisible && !isHeaderCollapsed ? undefined : -1}
        >
          Watchtower
        </Anchor>
        , Bank.Green&rsquo;s policy collection and analysis tool
      </p>
      <CloseButton
        aria-label="Dismiss Watchtower announcement"
        className="col-start-3 justify-self-center text-white hover:bg-white/15"
        onClick={() => setIsVisible(false)}
        tabIndex={isVisible && !isHeaderCollapsed ? undefined : -1}
      />
    </aside>
  )
}
