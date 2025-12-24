import Lottie from 'lottie-react'
import { useEffect, useState } from 'react'

interface PiggyAnimationProps {
  className?: string
}

export function PiggyAnimation({ className }: PiggyAnimationProps) {
  const [animationData, setAnimationData] = useState<object | null>(null)

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const response = await fetch('/anim/piggy.json')
        const data = await response.json()
        setAnimationData(data)
      } catch (error) {
        console.error('Failed to load piggy animation:', error)
      }
    }
    loadAnimation()
  }, [])

  if (!animationData) return null

  return <Lottie animationData={animationData} loop autoplay className={className} />
}
