import Lottie from 'lottie-react'
import { useEffect, useState } from 'react'

interface ATMAnimationProps {
  className?: string
}

export function ATMAnimation({ className }: ATMAnimationProps) {
  const [animationData, setAnimationData] = useState<object | null>(null)

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const response = await fetch('/anim/atm_without_bg.json')
        const data = await response.json()
        setAnimationData(data)
      } catch (error) {
        console.error('Failed to load ATM animation:', error)
      }
    }
    loadAnimation()
  }, [])

  if (!animationData) {
    return (
      <img
        src="/img/illustrations/atm.svg"
        alt="ATM"
        className={className}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    )
  }

  return <Lottie animationData={animationData} loop autoplay className={className} />
}
