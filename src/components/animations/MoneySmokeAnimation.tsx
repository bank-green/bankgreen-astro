import Lottie from 'lottie-react'
import { useEffect, useState } from 'react'

interface MoneySmokeAnimationProps {
  className?: string
}

export function MoneySmokeAnimation({ className }: MoneySmokeAnimationProps) {
  const [animationData, setAnimationData] = useState<object | null>(null)

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const response = await fetch('/anim/money_smoke.json')
        const data = await response.json()
        setAnimationData(data)
      } catch (error) {
        console.error('Failed to load money smoke animation:', error)
      }
    }
    loadAnimation()
  }, [])

  if (!animationData) {
    return (
      <img
        src="/img/illustrations/paperwinds.svg"
        alt="Landscape"
        className={className}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    )
  }

  return <Lottie animationData={animationData} loop autoplay className={className} />
}
