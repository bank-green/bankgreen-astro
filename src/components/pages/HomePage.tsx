import { PageContent } from '@components/PageContent'
import { Swoosh } from '@components/Swoosh'
import { renderRichText } from '@lib/prismicHelpers'
import { Anchor, Box, Group, Stack, Text, Title } from '@mantine/core'
import type { PrismicDocument, RichTextField } from '@prismicio/client'
import { SliceZone } from '@slices'
import cx from 'clsx'

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

  return (
    <PageContent>
      {/* Hero section with green gradient background - breaks out of container */}
      <Box data-breakout className="bg-linear-to-b from-sushi-100 to-sushi-200">
        <Group className="mx-auto max-w-6xl items-center gap-12 px-6 pt-4 pb-24 lg:gap-0 lg:pr-12 lg:pb-30">
          <Title
            order={1}
            className="block bg-linear-to-r from-sky-600 via-sushi-500 to-green-600 bg-clip-text text-center font-medium text-4xl text-transparent sm:text-5xl lg:max-w-1/2 lg:text-left"
          >
            {title}
          </Title>

          <Box className="mx-auto flex h-48 w-full max-w-2xl grow items-center justify-center rounded-2xl bg-white lg:max-w-1/2">
            <Stack className="items-center">
              <Text>Check if your bank is funding fossil fuels</Text>
              <Text className="text-gray-500">[FORM]</Text>
            </Stack>
          </Box>
        </Group>

        {/* As featured in */}
        <Stack
          data-breakout
          className="-mb-24 w-full bg-radial-[ellipse_at_top_center] from-green-200 to-sushi-100 py-6 pb-24"
        >
          <Stack className="hidden md:flex">
            <Stack className="lg:no-wrap mx-auto mb-8 hidden max-w-4xl flex-col items-center pt-10 md:flex md:pt-8 lg:flex-row">
              <Text className="mb-8 inline-block whitespace-nowrap text-center font-semibold text-xl md:mr-2 md:mb-0 lg:mr-6">
                As featured in
              </Text>
              <Stack
                className={cx(
                  'items-center justify-between md:flex md:flex-row md:space-y-0',
                  '[&>img]:relative [&>img]:h-16 [&>img]:w-auto [&>img]:rounded-xl [&>img]:bg-white [&>img]:px-6 [&>img]:py-4 [&>img]:opacity-80 [&>img]:grayscale'
                )}
              >
                {slices1 && <SliceZone slices={slices1} />}
              </Stack>
            </Stack>
            <Stack className="items-center gap-1">
              <Text className="mb-2 text-center font-semibold text-lg">In association with</Text>
              <Anchor
                href="https://www.banktrack.org/"
                rel="noopener noreferrer"
                target="_blank"
                className="rounded-xl bg-white p-5"
              >
                <img src="/img/logos/banktrack.svg" alt="BankTrack" className="w-36" />
              </Anchor>

              <Anchor href="/partners" className="mt-2 text-sm underline">
                See our partners
              </Anchor>
            </Stack>
          </Stack>
          <Stack>
            {/* In association with */}

            {/* Why Bank.Green? teaser */}
            <Group className="mx-auto mt-16 items-center gap-1 text-4xl text-gray-700 leading-4">
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
        </Stack>

        {/* Swoosh transitions from green gradient to white */}
        <Swoosh color="var(--color-white)" />
      </Box>

      {/* Why Bank.Green section - white background with ATM illustration */}
      <Box data-breakout className="bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-16 md:flex-row">
          <div className="max-w-sm md:w-1/2">
            <div className="mb-4 text-lg tracking-wide md:text-2xl [&_strong]:font-semibold [&_strong]:text-gray-800">
              {description1 && description1.length > 0 ? (
                renderRichText(description1)
              ) : (
                <p>
                  <strong>The fight for a habitable planet is the fight for our lives.</strong> But
                  while we look at ways to make our lives more sustainable, most of us are also
                  funding environmental catastrophe.
                </p>
              )}
            </div>
            <div className="mb-12 whitespace-pre-line text-gray-600 tracking-wide md:mb-0 md:text-xl">
              {description2 && description2.length > 0 ? (
                renderRichText(description2)
              ) : (
                <p>
                  In the 10 years since the landmark Paris Agreement on climate change, the world's
                  top 60 private-sector banks poured $7.9 trillion into the fossil fuel industry.
                </p>
              )}
            </div>
          </div>

          {/* ATM illustration */}
          <div className="max-w-full md:ml-24 md:w-3/8">
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
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-6 pt-8 pb-4 md:flex-row md:pb-16">
              {/* Bank illustration - on left for desktop */}
              <div className="-ml-48 md:mr-24 md:w-5/8">
                <img
                  src="/img/illustrations/bank.svg"
                  alt="Bank building illustration"
                  className="w-full"
                  width={450}
                  height={450}
                />
              </div>

              <div className="-ml-36 max-w-sm md:w-3/8">
                <div className="mb-4 text-lg tracking-wide md:text-2xl [&_strong]:font-semibold [&_strong]:text-gray-800">
                  {description3 && description3.length > 0 ? (
                    renderRichText(description3)
                  ) : (
                    <p>
                      <strong>We have the power to change our banking system</strong> because it
                      will not change itself. Mass pressure from customers will force our banks to
                      defund fossil fuels.
                    </p>
                  )}
                </div>
                <div className="mb-12 whitespace-pre-line text-gray-600 tracking-wide md:mb-0 md:text-xl">
                  {description4 && description4.length > 0 ? (
                    renderRichText(description4)
                  ) : (
                    <p>
                      Bank.Green and our partners are leading a global reckoning with the world's
                      most powerful driver of environmental destruction.
                      <br />
                      <br />
                      But we need your help.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Lead gen form section - dark blue card */}
            <div id="join" className="mx-auto max-w-6xl px-6 pb-8">
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
    </PageContent>
  )
}
