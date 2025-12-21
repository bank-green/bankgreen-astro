import { Anchor, Box, Button, Stack } from '@mantine/core'
import type { ReactNode } from 'react'
import { Swoosh } from '../Swoosh'

interface BankLayoutBadProps {
  section1: ReactNode
  section2: ReactNode
  section3?: ReactNode
}

export function BankLayoutBad({ section1, section2, section3 }: BankLayoutBadProps) {
  return (
    <div className="page">
      {/* SECTION ONE */}
      <Box
        id="section-one"
        className="bg-linear-to-b from-sushi-50 to-sushi-100 pt-28"
        data-breakout
      >
        <div className="contain page-fade-in relative z-10 grid max-w-5xl grid-cols-2 gap-8 md:gap-10">
          {section1}
          <div className="col-span-2 flex flex-col items-center justify-between gap-12 space-y-4 md:col-span-1 md:space-y-0">
            <div className="mt-8 flex flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
              <Button
                component="a"
                href="/sustainable-eco-banks"
                className="button-green w-auto"
                size="lg"
              >
                Move Your Money
              </Button>
            </div>
            <div className="relative grow md:flex-none">
              <a href="#section-two">
                <svg
                  className="inline-block w-10 animate-bounce"
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
            </div>
          </div>
        </div>
        <Swoosh />
      </Box>

      {/* SECTION TWO */}
      <Box data-breakout className="w-full bg-gray-50">
        <Box
          id="section-two"
          className="contain flex w-full flex-col-reverse items-center justify-center space-y-12 py-8 md:flex-row md:space-x-24 md:space-y-0"
        >
          {/* Piggybank illustration - static for now */}
          <div className="w-full max-w-sm md:w-1/2">
            <img
              src="/img/illustrations/piggybank.svg"
              alt="Piggy bank illustration"
              className="w-full"
            />
          </div>
          <div className="md:w-1/2">
            {section2}
            <div className="mt-8 flex flex-col items-center gap-12 md:flex-row md:gap-0">
              <div className="flex w-auto flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
                <Button
                  component="a"
                  href="/sustainable-eco-banks"
                  className="button-green w-auto"
                  size="lg"
                >
                  Move Your Money
                </Button>
              </div>
              <div className="flex grow justify-center md:hidden">
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
              </div>
            </div>
          </div>
        </Box>
      </Box>

      {/* SECTION THREE */}
      <Box id="section-three" className="relative bg-ocean-100" data-breakout>
        <Swoosh direction="down" />
        <img
          className="relative mb-4 inline-block"
          src="/img/illustrations/fishes.svg"
          alt="Fish illustration"
        />
        <div className="contain relative z-10 max-w-2xl">{section3}</div>
      </Box>

      {/* CALL TO ACTION */}
      <Box id="call-to-action" className="bg-ocean-100 pt-8 pb-8" data-breakout>
        <div className="contain flex flex-col items-center justify-center">
          <Stack gap="lg" className="max-w-3xl">
            <h2 className="mb-4 text-center font-semibold text-2xl text-gray-800 tracking-wider">
              Take Action Today
            </h2>
            <p className="text-center text-gray-700 text-lg md:text-xl">
              Every person who moves their money to a sustainable bank sends a powerful message.
              Join thousands of others in choosing to support a green future.
            </p>
            <div className="mt-4 flex justify-center">
              <Button
                component="a"
                href="/sustainable-eco-banks"
                size="xl"
                className="button-green"
              >
                Find a Sustainable Bank
              </Button>
            </div>
          </Stack>
        </div>
      </Box>

      {/* FOOTER IMAGE */}
      <Box className="pointer-events-none w-full overflow-hidden bg-ocean-100" data-breakout>
        <div className="-mt-24 sm:-mt-16 lg:-mt-32 pointer-events-none w-full overflow-hidden">
          {/* Lottie animation placeholder - fishes.json */}
        </div>
      </Box>

      {/* FOOTER */}
      <Box className="bg-sky-800" data-breakout>
        <div className="contain flex w-full flex-wrap items-center py-4 text-gray-100 md:flex-nowrap md:py-8">
          <div className="flex w-full flex-col items-center p-6 md:p-8">
            <h2 className="mb-4 w-full text-center font-semibold text-2xl text-gray-100 tracking-wider">
              How do we derive our results?
            </h2>
            <Anchor href="/methodology" className="button-green inline-block w-max">
              Find out more
            </Anchor>
          </div>
        </div>
      </Box>
    </div>
  )
}
