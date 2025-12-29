import { ThanksTopEcoBanksWidget } from '@components/bank/ThanksTopEcoBanksWidget'
import { PageContent } from '@components/PageContent'
import { Image, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import type { PrismicDocument, RichTextField } from '@prismicio/client'
import * as prismic from '@prismicio/client'
import type { Slice } from '@slices'
import { SliceZone } from '@slices'
import { CornerLogoContainer } from '../CornerLogo'

interface ThanksPageFallback {
  title: string
  description?: string
}

interface Props {
  page: PrismicDocument | null
  fallback: ThanksPageFallback
  pageType: string
}

export function ThanksPage({ page, fallback, pageType }: Props) {
  const slices = (page?.data?.slices || []) as Slice[]
  const hasSlices = slices.length > 0

  // textonlypages structure: text1, text2, text3 fields
  const text1 = page?.data?.text1 as RichTextField | undefined
  const text2 = page?.data?.text2 as RichTextField | undefined
  const hasTextFields = text1 || text2

  const showExplore = pageType !== 'donate-cancelled' && pageType !== 'updates-no'

  return (
    <PageContent>
      <CornerLogoContainer className="p-24">
        <SimpleGrid cols={{ base: 1, md: 2 }} className="gap-12">
          <Image src="/img/illustrations/dig.svg" />
          <Stack className="justify-center">
            {hasSlices ? (
              <SliceZone slices={slices} />
            ) : hasTextFields ? (
              <Stack className="gap-8">
                {text1 && <Title order={1}>{prismic.asText(text1)}</Title>}
                {text2 && <Text className="text-lg">{prismic.asText(text2)}</Text>}
              </Stack>
            ) : (
              <Stack className="gap-8">
                <Title order={1}>{fallback.title}</Title>
                {fallback.description && <Text className="text-lg">{fallback.description}</Text>}
              </Stack>
            )}
          </Stack>
        </SimpleGrid>
        {showExplore && (
          <Stack className="mt-12 w-full gap-6 text-center">
            <Title order={2}>Top sustainable banks near you</Title>
            <Text>Based on your location, here are highly-rated sustainable banks:</Text>
            <ThanksTopEcoBanksWidget />
          </Stack>
        )}
      </CornerLogoContainer>
    </PageContent>
  )
}
