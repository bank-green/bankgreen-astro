import Lottie from 'lottie-react'
import { useEffect, useState } from 'react'

interface WindmillAnimationProps {
  className?: string
}

export function WindmillAnimation({ className }: WindmillAnimationProps) {
  const [animationData, setAnimationData] = useState<object | null>(null)

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const response = await fetch('/anim/wind_2_without_bg.json')
        const data = await response.json()
        setAnimationData(data)
      } catch (error) {
        console.error('Failed to load windmill animation:', error)
      }
    }
    loadAnimation()
  }, [])

  if (!animationData) return null

  return <Lottie animationData={animationData} loop autoplay className={className} />
}
