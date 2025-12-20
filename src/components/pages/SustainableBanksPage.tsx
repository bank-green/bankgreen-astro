import { PageContent } from '@components/PageContent'
import { renderRichText } from '@lib/prismicHelpers'
import { Box, Spoiler, Stack, Title } from '@mantine/core'
import type { PrismicDocument } from '@prismicio/client'
import type { Slice } from '@slices'
import { SliceZone } from '@slices'
import { useState } from 'react'

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
    <PageContent>
      <Stack className="gap-12">
        {/* Main intro content from Prismic slices */}
        {slices && (
          <Stack className="prose">
            <SliceZone slices={slices} />
          </Stack>
        )}

        <section>
          <Title order={2}>Bank Directory</Title>
          <Box className="h-36 w-full rounded bg-white">[Bank directory with filtering]</Box>
          {/* Bank directory with filtering - will be a separate component */}
          {/* This will include:
              - LocationSearch for country selection
              - EcoBankFilters for filtering
              - EcoBankCards to display results
              - slices2 shown when no results/error
          */}
        </section>

        {/* Introductory section (Why Find a Green Bank? + What is the Fossil Free Alliance?) */}
        {introductory && introductory.length > 0 && (
          <>
            {/* Why Find a Green Bank? - First item in introductory */}
            {introductory[0]?.slice_type === 'text_slice' && (
              <Spoiler maxHeight={200} showLabel="Read more" hideLabel="Read less">
                <Stack>
                  {renderRichText(
                    (introductory[0] as Extract<Slice, { slice_type: 'text_slice' }>).primary.text
                  )}
                </Stack>
              </Spoiler>
            )}

            {/* What is the Fossil Free Alliance? - Rest of introductory items */}
            {introductory.length > 1 && (
              <Spoiler maxHeight={200} showLabel="Read more" hideLabel="Read less">
                <Stack>
                  <SliceZone slices={introductory.slice(1)} />
                </Stack>
              </Spoiler>
            )}
          </>
        )}

        {/* FAQ section */}
        {slices1 && slices1.length > 0 && (
          <Stack className="rounded-lg bg-white p-4">
            <SliceZone slices={slices1} />
          </Stack>
        )}

        {/* Footer banner - Happy banking stories */}
        {footerBanner && footerBanner.length > 0 && (
          <section>
            <SliceZone slices={footerBanner} />
          </section>
        )}
      </Stack>
    </PageContent>
  )
}
