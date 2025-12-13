import BankLocationSearch from '@components/forms/BankLocationSearch'
import { Swoosh } from '@components/Swoosh'
import { renderRichText } from '@lib/prismicHelpers'
import { Anchor, Box, Group, MantineProvider, Stack, Text, Title } from '@mantine/core'
import type { PrismicDocument, RichTextField } from '@prismicio/client'
import { SliceZone } from '@slices'
import theme from '@styles/theme'
import cx from 'clsx'
import type { Bank } from '../../lib/banks'

interface Props {
  page: PrismicDocument | null
}

export function HomePage({ page }: Props) {
  const title = (page?.data?.title as string) || 'Is your money being used to fund climate chaos?'
  const slices1 = page?.data?.slices1 as Array<{ slice_type: string; [key: string]: unknown }> // "As featured in" logos
  const description1 = page?.data?.description1 as RichTextField | undefined
  const description2 = page?.data?.description2 as RichTextField | undefined
  const description3 = page?.data?.description3 as RichTextField | undefined
  const description4 = page?.data?.description4 as RichTextField | undefined

  function handleBankSelect(bank: Bank | null) {
    if (bank) {
      window.location.href = `/banks/${bank ? bank.tag : ''}`
    }
  }

  return (
    <MantineProvider theme={theme}>
      {/* Hero section with green gradient background - breaks out of container */}
      <Box data-breakout className="bg-linear-to-b from-sushi-100 to-sushi-200">
        <Group className="mx-auto max-w-6xl items-end justify-between gap-12 px-6 pt-20 pb-12 md:px-0 lg:gap-0 lg:pb-18">
          <Title
            order={1}
            className="mx-auto block max-w-3xl bg-linear-to-tr from-sky-600 via-sushi-500 to-green-500 bg-clip-text text-center font-medium text-4xl text-transparent sm:text-5xl lg:max-w-1/2 lg:pr-6 lg:text-left"
          >
            {title}
          </Title>
          <Box className="mx-auto flex w-full max-w-lg grow justify-start lg:max-w-1/2">
            <BankLocationSearch onBankSelect={handleBankSelect} />
          </Box>
        </Group>

        {/* As featured in */}
        <Stack className="-mb-24 w-full py-6 pb-24">
          <Box className="mx-auto hidden w-full max-w-6xl bg-linear-to-br px-12 md:flex lg:rounded-3xl lg:px-0">
            <Stack className="mx-auto w-full max-w-6xl items-center justify-between px-6 md:flex md:px-0 lg:flex-row lg:items-start">
              <Stack className="lg:no-wrap mx-auto mb-8 items-center justify-between gap-4 lg:mx-0 lg:items-start">
                <Text className="mb-8 inline-block w-full grow whitespace-nowrap text-center font-semibold text-sky-700 text-xl md:mb-0">
                  As featured in
                </Text>
                <Stack
                  className={cx(
                    'grow items-center justify-between md:flex md:flex-row md:space-y-0',
                    '[&>img]:relative [&>img]:h-16 [&>img]:w-auto [&>img]:rounded-xl [&>img]:bg-white [&>img]:px-6 [&>img]:py-4 [&>img]:mix-blend-hard-light [&>img]:grayscale lg:[&>img]:h-18 lg:[&>img]:px-11 lg:[&>img]:py-5'
                  )}
                >
                  {slices1 && <SliceZone slices={slices1} />}
                </Stack>
              </Stack>
              <Stack className="items-center gap-4">
                <Text className="mb-0 text-center font-semibold text-sky-700 text-xl">
                  In association with
                </Text>
                <Stack className="items-center gap-0">
                  <Anchor
                    href="https://www.banktrack.org/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <img
                      src="/img/logos/banktrack.svg"
                      alt="BankTrack"
                      className="-mb-1 h-18 rounded-xl bg-white p-6 mix-blend-hard-light grayscale"
                    />
                  </Anchor>
                  <Anchor href="/partners" className="text-sm">
                    See our partners
                  </Anchor>
                </Stack>
              </Stack>
            </Stack>
          </Box>
          <Stack>
            {/* Why Bank.Green? teaser */}
            <Group className="mx-auto items-center gap-1 text-4xl text-gray-700 leading-4 md:mt-16">
              Why{' '}
              <img
                className="mt-2 ml-2 inline-block h-10 px-0.5"
                src="/img/trim-hor-light.svg"
                alt="Bank.Green"
              />
              ?
            </Group>
            {/* Arrow down bounce animation */}
            <Box className="mx-auto mt-4 flex h-10 w-10 animate-bounce justify-center text-sushi-500">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-8 w-8"
              >
                <title>Scroll down</title>
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </Box>
          </Stack>
          {/* Swoosh transitions from green gradient to white */}
          <Swoosh color="var(--color-white)" />
        </Stack>
      </Box>

      {/* Why Bank.Green section - white background with ATM illustration */}
      <Box data-breakout className="bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-12 py-16 md:flex-row md:px-0">
          <div className="md:w-1/2 md:pr-12">
            <div className="mb-4 text-lg tracking-wide md:text-2xl [&_strong]:font-semibold [&_strong]:text-gray-800">
              {description1 && description1.length > 0 && renderRichText(description1)}
            </div>
            <div className="mb-12 whitespace-pre-line text-gray-600 tracking-wide md:mb-0 md:text-xl">
              {description2 && description2.length > 0 && renderRichText(description2)}
            </div>
          </div>

          {/* ATM illustration */}
          <div className="max-w-full md:w-1/2 md:pl-12">
            <img
              src="/img/illustrations/atm.svg"
              alt="Person at ATM illustration"
              className="w-full"
            />
          </div>
        </div>
      </Box>

      {/* Arctic blue section with bank illustration and lead gen form - breaks out of container */}
      <Box data-breakout className="bg-arcticBlue text-gray-800">
        <div className="overflow-hidden">
          {/* Swoosh transitions from white down into arctic blue */}
          <Swoosh direction="down" color="var(--color-white)" />

          <Box data-container>
            {/* Bank illustration section */}
            <div className="z-10 mx-auto flex max-w-6xl flex-col items-center justify-center px-12 pt-8 pb-4 md:flex-row md:px-0 md:pb-16">
              {/* Bank illustration - on left for desktop */}
              <div className="md:w-9/16 md:pr-24">
                <img
                  src="/img/illustrations/bank.svg"
                  alt="Bank building illustration"
                  className="w-full"
                  width="100%"
                  height="auto"
                />
              </div>

              <div className="text-right md:w-7/16">
                <div className="mb-4 text-balance text-lg tracking-wide md:text-2xl [&_strong]:font-semibold [&_strong]:text-gray-800">
                  {description3 && description3.length > 0 && renderRichText(description3)}
                </div>
                <div className="mb-12 text-balance text-gray-600 tracking-wide md:mb-0 md:text-xl">
                  {description4 && description4.length > 0 && renderRichText(description4)}
                </div>
              </div>
            </div>

            {/* Lead gen form section - dark blue card */}
            <div id="join" className="mx-auto max-w-6xl px-6 pb-8 lg:px-0">
              <div className="rounded-2xl bg-primaryDark p-8 text-white md:p-12">
                <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
                  {/* Left side - title and benefits */}
                  <div className="lg:w-1/2">
                    <h2 className="mb-6 font-semibold text-2xl md:text-3xl">
                      Start to Bank Green Today
                    </h2>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <svg
                          className="mt-0.5 h-5 w-5 shrink-0 text-sushi-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <title>Checkmark</title>
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Learn how to take action on fossil fuel finance.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg
                          className="mt-0.5 h-5 w-5 shrink-0 text-sushi-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <title>Checkmark</title>
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Discover green banking and how easy it is to switch.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg
                          className="mt-0.5 h-5 w-5 shrink-0 text-sushi-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <title>Checkmark</title>
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Stay up to date with climate finance news.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Right side - form placeholder */}
                  <div className="lg:w-1/2">
                    <div className="flex h-full min-h-48 items-center justify-center rounded-xl bg-white/10 p-6">
                      <Text className="text-white/60">[Lead Gen Form]</Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Box>

          {/* Money smoke animation placeholder */}
          <div className="flex flex-row items-center justify-center">
            <div className="h-42 w-full object-cover object-bottom md:max-w-2xl">
              {/* Placeholder for Lottie money_smoke animation */}
              <img src="/img/illustrations/landscape.svg" alt="" className="w-full" />
            </div>
          </div>
        </div>
      </Box>
    </MantineProvider>
  )
}
