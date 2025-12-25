import { Box } from '@mantine/core'
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

  if (!animationData) {
    return (
      <Box className="aspect-490/1150">
        <img
          src="/img/illustrations/piggybank.svg"
          alt="Piggy bank"
          className={className}
          style={{ width: '100%', height: '50%', objectFit: 'contain' }}
        />
        <img
          src="/img/illustrations/oilrig.svg"
          alt="Oil rig"
          className={className}
          style={{ width: '100%', height: '50%', objectFit: 'contain' }}
        />
      </Box>
    )
  }

  return <Lottie animationData={animationData} loop autoplay className={className} />
}
