import { Box, Spoiler, Stack } from '@mantine/core'
import type { PrismicDocument } from '@prismicio/client'
import type { Slice } from '@slices'
import { SliceZone } from '@slices'
import { MoneySmokeAnimation } from '../animations'
import { CornerLogoContainer } from '../CornerLogo'
import EcoBankDirectory from '../forms/EcoBankDirectory'
import { PageContent } from '../PageContent'

interface Props {
  page: PrismicDocument | null
}

export function EcoBanksPage({ page }: Props) {
  const slices = (page?.data?.slices || []) as Slice[]
  const slices1 = (page?.data?.slices1 || []) as Slice[]
  const introductory = (page?.data?.introductory || []) as Slice[]
  const footerBanner = (page?.data?.footerBanner || []) as Slice[]

  return (
    <PageContent fullWidth>
      <Box className="contain">
        {/* Main intro content from Prismic slices */}
        {slices && (
          <Stack className="gap-8 [&_h1]:mb-2 [&_p]:text-xl">
            <SliceZone slices={slices} />
          </Stack>
        )}

        <Box className="mt-12 mb-24 w-full">
          <EcoBankDirectory />
        </Box>
      </Box>

      <Box data-breakout className="bg-linear-to-b from-white to-blue-100 pt-24">
        {/* Introductory section (Why Find a Green Bank? + What is the Fossil Free Alliance?) */}
        {introductory && introductory.length > 0 && (
          <Stack className="contain gap-8 pb-18 [&_h1]:mb-0 [&_h1]:text-center">
            {/* Why Find a Green Bank? - First item in introductory */}
            {introductory[0]?.slice_type === 'text_slice' && (
              <Spoiler
                showLabel="Read more"
                hideLabel="Read less"
                className="[--spoiler-bg-color:white]"
              >
                {/* Note: this is calling Array.slice, not referring to a Prismic slice object! */}
                <SliceZone slices={introductory.slice(0, 1)} />
              </Spoiler>
            )}

            {/* What is the Fossil Free Alliance? - Rest of introductory items */}
            {introductory.length > 1 && (
              <Spoiler
                showLabel="Read more"
                hideLabel="Read less"
                className="[--spoiler-bg-color:white]"
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
            <Stack className="bg-white p-8 md:rounded-xl [&_a]:inline">
              <SliceZone slices={slices1} />
            </Stack>
          )}
        </Stack>

        {/* Footer banner - Happy banking stories */}
        {footerBanner && footerBanner.length > 0 && (
          <CornerLogoContainer className="contain mt-18 w-full p-8 md:p-24 lg:rounded-4xl [&_h4]:text-3xl [&_li]:ml-4">
            <SliceZone slices={footerBanner} />
          </CornerLogoContainer>
        )}

        {/* Smokestack animation */}
        <Stack className="mx-auto aspect-690/340 max-w-[690px] justify-end object-cover object-bottom">
          <MoneySmokeAnimation className="-mb-1 w-full" />
        </Stack>
      </Box>
    </PageContent>
  )
}
