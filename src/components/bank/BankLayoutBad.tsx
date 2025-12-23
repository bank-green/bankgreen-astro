import { Anchor, Box, Button, Group, Stack, Text, Title } from '@mantine/core'
import Lottie from 'lottie-react'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { Swoosh } from '../Swoosh'

interface BankLayoutBadProps {
  section1: ReactNode
  section2: ReactNode
  section3?: ReactNode
}

export function BankLayoutBad({ section1, section2, section3 }: BankLayoutBadProps) {
  const [piggyAnimation, setPiggyAnimation] = useState<object | null>(null)
  const [fishesAnimation, setFishesAnimation] = useState<object | null>(null)

  // Load piggybank Lottie animation
  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const response = await fetch('/anim/piggy.json')
        const data = await response.json()
        setPiggyAnimation(data)
      } catch (error) {
        console.error('Failed to load piggybank animation:', error)
      }
    }
    loadAnimation()
  }, [])

  // Load fishes Lottie animation
  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const response = await fetch('/anim/fishes.json')
        const data = await response.json()
        setFishesAnimation(data)
      } catch (error) {
        console.error('Failed to load fishes animation:', error)
      }
    }
    loadAnimation()
  }, [])

  return (
    <Box className="page">
      {/* SECTION ONE */}
      <Box
        id="section-one"
        className="bg-linear-to-b from-sushi-50 to-sushi-100 pt-28"
        data-breakout
      >
        <Stack className="contain">
          {section1}
          <Group className="mt-8 justify-center">
            <Button
              component="a"
              href="/sustainable-eco-banks"
              className="button-green w-auto"
              size="lg"
            >
              Move Your Money
            </Button>
          </Group>
        </Stack>
        <Swoosh />
      </Box>

      {/* SECTION TWO */}
      <Box id="section-two" className="overflow-hidden bg-gray-50 py-8">
        <Stack className="contain gap-0">
          <Group className="flex-col-reverse items-center justify-center gap-8 md:flex-row md:gap-24">
            {/* Piggybank Lottie animation */}
            <Box className="w-full max-w-sm md:w-1/2">
              {piggyAnimation && (
                <Lottie animationData={piggyAnimation} loop autoplay className="w-full" />
              )}
            </Box>
            <Stack className="gap-4 md:w-1/2">{section2}</Stack>
          </Group>
          <Group className="flex-col items-center gap-4 md:flex-row md:justify-center md:gap-8">
            <Button
              component="a"
              href="/sustainable-eco-banks"
              className="button-green w-auto"
              size="lg"
            >
              Move Your Money
            </Button>
            <Box className="md:hidden">
              <a href="#section-three">
                <svg
                  className="w-10 animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Arrow pointing down</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </a>
            </Box>
          </Group>
        </Stack>
      </Box>

      {/* SECTION THREE */}
      {section3 && (
        <Box id="section-three" className="bg-ocean-100" data-breakout>
          <Swoosh direction="down" />
          <Stack className="contain items-center gap-4 pt-32">
            <img
              className="mb-4 inline-block"
              src="/img/illustrations/fishes.svg"
              alt="Fish illustration"
            />
            <Box className="max-w-2xl">{section3}</Box>
          </Stack>
        </Box>
      )}

      {/* CALL TO ACTION */}
      <Box id="call-to-action" className="bg-ocean-100 text-gray-800" data-breakout>
        <Stack className="contain items-center gap-8 py-16">
          <Title order={2} className="text-center">
            Take Action Today
          </Title>
          <Text className="max-w-3xl text-center text-lg md:text-xl">
            Every person who moves their money to a sustainable bank sends a powerful message. Join
            thousands of others in choosing to support a green future.
          </Text>
          <Button component="a" href="/sustainable-eco-banks" size="xl" className="button-green">
            Find a Sustainable Bank
          </Button>
        </Stack>
      </Box>

      {/* FOOTER IMAGE - Fishes Lottie animation */}
      <Box data-breakout className="pointer-events-none flex items-end justify-end bg-ocean-100">
        <Stack className="w-full justify-end">
          {fishesAnimation && (
            <Lottie
              animationData={fishesAnimation}
              loop
              autoplay
              className="flex flex-col justify-end"
            />
          )}
        </Stack>
      </Box>

      {/* FOOTER */}
      <Box className="bg-sky-800" data-breakout>
        <Group className="contain w-full flex-wrap items-center py-4 text-gray-100 md:flex-nowrap md:py-8">
          <Stack className="w-full items-center p-6 md:p-8">
            <Title order={2} className="mb-4 w-full text-center text-gray-100">
              How do we derive our results?
            </Title>
            <Anchor href="/methodology" className="button-green inline-block w-max">
              Find out more
            </Anchor>
          </Stack>
        </Group>
      </Box>
    </Box>
  )
}
