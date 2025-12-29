import { useEffect, useRef, useState } from 'react'

interface UseStableHeadroomOptions {
  fixedAt?: number
  bottomThreshold?: number
}

export function useStableHeadroom({
  fixedAt = 0,
  bottomThreshold = 100,
}: UseStableHeadroomOptions = {}) {
  const [pinned, setPinned] = useState(true)
  const lastScrollY = useRef(0)
  const scrollingDown = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Check if near bottom of page
      const distanceFromBottom = documentHeight - (currentScrollY + windowHeight)
      const isNearBottom = distanceFromBottom <= bottomThreshold

      // Determine scroll direction
      const isScrollingDown = currentScrollY > lastScrollY.current
      scrollingDown.current = isScrollingDown

      // Prevent state changes when near bottom
      if (isNearBottom) {
        lastScrollY.current = currentScrollY
        return
      }

      // Standard headroom logic
      if (currentScrollY <= fixedAt) {
        setPinned(true)
      } else if (isScrollingDown) {
        setPinned(false)
      } else {
        setPinned(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [fixedAt, bottomThreshold])

  return pinned
}
