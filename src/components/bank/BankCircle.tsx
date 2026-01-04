import { Box, MantineProvider } from '@mantine/core'
import Lottie from 'lottie-react'
import { useEffect, useId, useState } from 'react'
import { theme } from '@/styles/theme'

type Rating = 'great' | 'good' | 'ok' | 'bad' | 'worst' | 'unknown'

interface BankCircleProps {
  rating: Rating
}

const getRotationForRating = (rating: Rating): number => {
  switch (rating) {
    case 'great':
      return 90
    case 'good':
      return 75
    case 'ok':
      return 0
    case 'bad':
      return -45
    case 'worst':
      return -90
    case 'unknown':
      return 0
    default:
      return 0
  }
}

const getEmojiForRating = (rating: Rating): string => {
  switch (rating) {
    case 'great':
      return 'Heart_Eyes'
    case 'good':
      return 'Happy'
    case 'ok':
      return 'Meh'
    case 'bad':
      return 'Sad_Tear'
    case 'worst':
      return 'Cussing'
    case 'unknown':
      return 'Meh'
    default:
      return 'Meh'
  }
}

export function BankCircle({ rating }: BankCircleProps) {
  const [rotation, setRotation] = useState(-120)
  const [animationData, setAnimationData] = useState<object | null>(null)
  const gradientId = useId()

  // Load Lottie animation JSON based on rating
  useEffect(() => {
    const emojiName = getEmojiForRating(rating)
    const loadAnimation = async () => {
      try {
        const response = await fetch(`/anim/emoji/${emojiName}_Flat.json`)
        const data = await response.json()
        setAnimationData(data)
      } catch (error) {
        console.error('Failed to load Lottie animation:', error)
      }
    }
    loadAnimation()
  }, [rating])

  // Trigger rotation animation on mount
  useEffect(() => {
    const finalRotation = getRotationForRating(rating)
    setRotation(finalRotation)
  }, [rating])

  return (
    <MantineProvider theme={theme}>
      <Box className="flex w-full">
        <Box className="relative aspect-square flex-1 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
          {/* SVG Layer 1: Outer gradient ring */}
          <svg
            className="absolute top-[10%] left-[10%] h-[60.54%] w-[80%]"
            viewBox="0 0 101 77"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M50.5 12.1424C71.6015 12.1424 88.7075 29.2485 88.7075 50.35C88.7075 57.5328 86.7311 64.2361 83.2957 69.9655L93.4094 76.0297C97.9126 68.5194 100.5 59.7278 100.5 50.35C100.5 22.7357 78.1142 0.349976 50.5 0.349976C22.8858 0.349976 0.499999 22.7357 0.499999 50.35C0.499999 59.7278 3.08738 68.5194 7.59058 76.0297L17.7043 69.9655C14.2689 64.2361 12.2924 57.5328 12.2924 50.35C12.2924 29.2485 29.3985 12.1424 50.5 12.1424Z"
              fill={`url(#${gradientId})`}
            />
            <defs>
              <linearGradient
                id={gradientId}
                x1="9.10269"
                y1="68.1435"
                x2="91.2208"
                y2="69.9302"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.0" stopColor="#F96363" />
                <stop offset="0.2" stopColor="#FFB067" />
                <stop offset="0.4" stopColor="#E8C753" />
                <stop offset="0.6" stopColor="#AEDA66" />
                <stop offset="0.8" stopColor="#64E287" />
                <stop offset="1.0" stopColor="#29DEBD" />
              </linearGradient>
            </defs>
          </svg>

          {/* SVG Layer 2: Dotted white arc */}
          <svg
            className="absolute top-[14%] left-[14%] h-[55.2%] w-[72.8%]"
            viewBox="0 0 91 69"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              opacity="0.5"
              d="M83.3523 67.9976C87.3216 61.3777 89.6035 53.6303 89.6035 45.35C89.6035 20.9921 69.8576 1.2462 45.4998 1.2462C21.1419 1.2462 1.396 20.9921 1.396 45.35C1.396 53.6303 3.67792 61.3777 7.64722 67.9976"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="0.4 3"
            />
          </svg>

          {/* SVG Layer 3: Faded background arc */}
          <svg
            className="absolute top-[20%] left-[20%] h-[45.408%] w-[60%] opacity-25"
            viewBox="0 0 101 77"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M50.5 12.1424C71.6015 12.1424 88.7075 29.2485 88.7075 50.35C88.7075 57.5328 86.7311 64.2361 83.2957 69.9655L93.4094 76.0297C97.9126 68.5194 100.5 59.7278 100.5 50.35C100.5 22.7357 78.1142 0.349976 50.5 0.349976C22.8858 0.349976 0.499999 22.7357 0.499999 50.35C0.499999 59.7278 3.08738 68.5194 7.59058 76.0297L17.7043 69.9655C14.2689 64.2361 12.2924 57.5328 12.2924 50.35C12.2924 29.2485 29.3985 12.1424 50.5 12.1424Z"
              fill={`url(#${gradientId})`}
            />
          </svg>

          {/* SVG Layer 4: Center circle */}
          <svg
            className="absolute top-[40%] left-[40%] h-[20%] w-[20%]"
            viewBox="0 0 53 53"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M0.999996 26.75C0.999996 40.8333 12.4167 52.25 26.5 52.25C40.5833 52.25 52 40.8333 52 26.75C52 12.6667 40.5833 1.25 26.5 1.25C12.4167 1.25 0.999996 12.6667 0.999996 26.75Z"
              stroke="#87B448"
              strokeWidth="1.5"
            />
          </svg>

          {/* SVG Layer 5: Rotating needle */}
          <svg
            className="absolute top-[20.2%] left-[46%] h-[36%] w-[8.4%] transition-transform delay-300 duration-1500"
            style={{
              transformOrigin: '50% 83%',
              transform: `rotate(${rotation}deg)`,
            }}
            viewBox="0 0 21 79"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              className="fill-primary-dark"
              d="M13.6271 3.42899C13.5065 2.05146 12.353 0.994614 10.9702 0.994614V0.994614C9.60004 0.994615 8.45279 2.03274 8.3163 3.39605L1.75908 68.8903C1.23773 74.0976 5.32678 78.6165 10.5601 78.6165V78.6165C15.7497 78.6165 19.8243 74.1694 19.3714 68.9995L13.6271 3.42899Z"
              fill="currentColor"
            />
            <circle cx="10.4996" cy="67.6369" r="3.4" fill="white" />
          </svg>

          {/* Lottie Emoji */}
          <Box
            className="absolute inset-x-0 bottom-[7%] mx-auto text-center"
            role="img"
            aria-label={`Rating: ${rating}`}
          >
            {animationData && (
              <Lottie
                animationData={animationData}
                loop
                autoplay
                className="mx-auto h-16 w-16 md:h-24 md:w-24"
              />
            )}
          </Box>
        </Box>
      </Box>
    </MantineProvider>
  )
}
