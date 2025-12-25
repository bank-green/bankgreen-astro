import Lottie from 'lottie-react'
import { useEffect, useState } from 'react'

interface FishesAnimationProps {
  className?: string
}

export function FishesAnimation({ className }: FishesAnimationProps) {
  const [animationData, setAnimationData] = useState<object | null>(null)

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const response = await fetch('/anim/fishes.json')
        const data = await response.json()
        setAnimationData(data)
      } catch (error) {
        console.error('Failed to load fishes animation:', error)
      }
    }
    loadAnimation()
  }, [])

  if (!animationData) {
    return (
      <img
        src="/img/illustrations/underwater.svg"
        alt="Fishes"
        className={className}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    )
  }

  return <Lottie animationData={animationData} loop autoplay className={className} />
}
