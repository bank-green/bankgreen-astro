import { Box, MantineProvider, Spoiler, Stack } from '@mantine/core'
import type { PrismicDocument } from '@prismicio/client'
import type { Slice } from '@slices'
import { SliceZone } from '@slices'
import theme from '@styles/theme'
import { useState } from 'react'
import { MoneySmokeAnimation } from '../animations'
import BankDirectory from '../forms/BankDirectory'
import { PageContent } from '../PageContent'

interface Props {
  page: PrismicDocument | null
}

export function SustainableBanksPage({ page }: Props) {
  const slices = (page?.data?.slices || []) as Slice[]
  const slices1 = (page?.data?.slices1 || []) as Slice[]
  const introductory = (page?.data?.introductory || []) as Slice[]
  const footerBanner = (page?.data?.footerBanner || []) as Slice[]

  const [_readMoreP1, _setReadMoreP11] = useState(false)
  const [_readMoreP2, _setReadMoreP22] = useState(false)

  return (
    <MantineProvider theme={theme}>
      <PageContent fullWidth>
        <Stack className="px-6 md:px-0">
          {/* Main intro content from Prismic slices */}
          {slices && (
            <Stack className="gap-8 **:text-balance [&_h1]:mb-2 [&_p]:text-xl">
              <SliceZone slices={slices} />
            </Stack>
          )}

          <Box className="mt-12 mb-24 w-full">
            <BankDirectory />
          </Box>
        </Stack>

        <Box data-breakout className="bg-blue-100 pt-24">
          {/* Introductory section (Why Find a Green Bank? + What is the Fossil Free Alliance?) */}
          {introductory && introductory.length > 0 && (
            <Stack className="mx-auto max-w-6xl gap-8 pb-18 [&_h1]:mb-0 [&_h1]:text-center">
              {/* Why Find a Green Bank? - First item in introductory */}
              {introductory[0]?.slice_type === 'text_slice' && (
                <Spoiler
                  showLabel="Read more"
                  hideLabel="Read less"
                  className="[--spoiler-bg-color:var(--color-blue-100)]"
                >
                  {/* Note: this is calling Array.slice, not referring to a slice object! */}
                  <SliceZone slices={introductory.slice(0, 1)} />
                </Spoiler>
              )}

              {/* What is the Fossil Free Alliance? - Rest of introductory items */}
              {introductory.length > 1 && (
                <Spoiler
                  showLabel="Read more"
                  hideLabel="Read less"
                  className="[--spoiler-bg-color:var(--color-blue-100)]"
                >
                  <Stack className="[&>figure]:mx-auto [&>figure]:w-32">
                    <SliceZone slices={introductory.slice(1)} />
                  </Stack>
                </Spoiler>
              )}
            </Stack>
          )}

          <Stack className="mx-auto w-full max-w-4xl gap-12">
            {/* FAQ section */}
            {slices1 && slices1.length > 0 && (
              <Stack className="rounded-lg bg-white p-4 [&_a]:inline">
                <SliceZone slices={slices1} />
              </Stack>
            )}
          </Stack>

          {/* Footer banner - Happy banking stories */}
          {footerBanner && footerBanner.length > 0 && (
            <Box className="mx-auto mt-12 w-full max-w-6xl rounded-2xl bg-sky-800 p-12 text-textInverse [&_h4]:text-3xl [&_li]:ml-4">
              <SliceZone slices={footerBanner} />
            </Box>
          )}
          {/* Smokestack animation */}
          <Stack className="mx-auto aspect-690/340 max-w-[690px] justify-end object-cover object-bottom">
            <MoneySmokeAnimation className="-mb-1 w-full" />
          </Stack>
        </Box>
      </PageContent>
    </MantineProvider>
  )
}
