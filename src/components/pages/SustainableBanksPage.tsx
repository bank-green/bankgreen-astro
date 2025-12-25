import { Box, MantineProvider, Spoiler, Stack } from '@mantine/core'
import type { PrismicDocument } from '@prismicio/client'
import type { Slice } from '@slices'
import { SliceZone } from '@slices'
import theme from '@styles/theme'
import { useState } from 'react'
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
            <Stack className="gap-8 **:text-balance [&_h1]:mb-6 [&_p]:text-xl">
              <SliceZone slices={slices} />
            </Stack>
          )}

          <Box className="mb-24 h-36 w-full rounded bg-white">[Bank directory with filtering]</Box>
          {/* Bank directory with filtering - will be a separate component */}
          {/* This will include:
              - LocationSearch for country selection
              - EcoBankFilters for filtering
              - EcoBankCards to display results
              - slices2 shown when no results/error
              */}
        </Stack>

        <Stack data-breakout className="bg-blue-100 py-24">
          {/* Introductory section (Why Find a Green Bank? + What is the Fossil Free Alliance?) */}
          {introductory && introductory.length > 0 && (
            <Stack className="mx-auto max-w-6xl gap-12 pb-18 [&_h1]:text-center">
              {/* Why Find a Green Bank? - First item in introductory */}
              {introductory[0]?.slice_type === 'text_slice' && (
                <Spoiler showLabel="Read more" hideLabel="Read less">
                  {/* Note: this is calling Array.slice, not referring to a slice object! */}
                  <SliceZone slices={introductory.slice(0, 1)} />
                </Spoiler>
              )}

              {/* What is the Fossil Free Alliance? - Rest of introductory items */}
              {introductory.length > 1 && (
                <Spoiler showLabel="Read more" hideLabel="Read less">
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

            {/* Footer banner - Happy banking stories */}
            {footerBanner && footerBanner.length > 0 && (
              <Box className="mt-12 rounded-lg bg-sky-800 p-4 text-textInverse">
                <SliceZone slices={footerBanner} />
              </Box>
            )}
          </Stack>
        </Stack>
      </PageContent>
    </MantineProvider>
  )
}
