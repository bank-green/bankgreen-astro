import { Anchor, Box, Stack } from '@mantine/core'
import type { Slice } from '@slices'
import { SliceZone } from '@slices'
import type { ReactNode } from 'react'
import { Swoosh } from '../Swoosh'

interface BankLayoutGoodProps {
  section1: ReactNode
  section2: ReactNode
  section3?: ReactNode
  callToActionSlices?: Slice[]
  showLeadGenSlice?: boolean
}

export function BankLayoutGood({
  section1,
  section2,
  section3,
  callToActionSlices = [],
  showLeadGenSlice = false,
}: BankLayoutGoodProps) {
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
          <div className="relative flex grow flex-col items-center justify-center space-y-4 text-center md:flex-none md:flex-row md:space-y-0">
            <a href="#section-two">
              <svg
                className="mt-8 inline-block w-10 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Scroll down to learn more</title>
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
        <Swoosh />
      </Box>

      {/* SECTION TWO */}
      <Box id="section-two" className="overflow-hidden bg-gray-50 py-16 text-gray-800">
        <div className="contain">{section2}</div>
      </Box>

      {/* SECTION THREE */}
      {section3 && <Box id="section-three">{section3}</Box>}

      {/* CALL TO ACTION */}
      <Box id="call-to-action" className="bg-ocean-100 text-gray-800" data-breakout>
        <Swoosh direction="down" />
        <div className="contain pt-32">
          {showLeadGenSlice && callToActionSlices && callToActionSlices.length > 0 ? (
            <SliceZone slices={callToActionSlices} />
          ) : (
            <Stack gap="lg">
              <h2 className="mb-4 text-center font-semibold text-gray-800 text-lg tracking-wider md:text-2xl">
                Join the Money Movement
              </h2>
              <div className="mx-auto flex max-w-4xl flex-col items-center justify-center md:flex-row md:space-x-8">
                <div className="md:max-w-sm lg:w-1/2">
                  <p className="mb-4 text-lg tracking-wide md:text-2xl">
                    We can't say it better than environmentalist Bill McKibben: "Money is the oxygen
                    on which the fire of global warming burns." But don't wait for the fire
                    department to turn up – join us!
                  </p>
                </div>
                <div className="my-8 w-full lg:w-1/2">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg
                        className="mr-3 h-6 w-6 shrink-0 text-sushi-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <title>Learn about the issues via our blog updates</title>
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Learn about the issues via our blog updates</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="mr-3 h-6 w-6 shrink-0 text-sushi-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <title>Join our campaigns to take action against fossil finance</title>
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Join our campaigns to take action against fossil finance</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="mr-3 h-6 w-6 shrink-0 text-sushi-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <title>Discover other ways to divest from fossil fuels</title>
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Discover other ways to divest from fossil fuels</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center">
                <div className="mt-8 w-full max-w-4xl rounded-lg bg-white p-6 shadow-sm">
                  <p className="mb-4 text-center text-lg">
                    Sign up to Bank.Green. We'll take the fight to the banks together.
                  </p>
                  {/* Placeholder for signup form - will be replaced with actual form */}
                  <form className="mx-auto flex max-w-xl gap-2">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="flex-1 rounded border border-gray-300 px-4 py-2"
                    />
                    <button
                      type="submit"
                      className="rounded bg-sushi-500 px-6 py-2 text-white hover:bg-sushi-600"
                    >
                      Sign Up
                    </button>
                  </form>
                </div>
              </div>
            </Stack>
          )}
        </div>

        {/* Footer Image - Placeholder for Lottie animation */}
        <div className="pointer-events-none flex items-end justify-end">
          <div className="w-11/12">{/* Lottie animation placeholder */}</div>
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
