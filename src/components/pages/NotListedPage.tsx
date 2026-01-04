import { PageContent } from '@components/PageContent'
import { renderRichText } from '@lib/prismicHelpers'
import { Box, Stack, Title } from '@mantine/core'
import { SmileySadIcon } from '@phosphor-icons/react'
import type { PrismicDocument, RichTextField } from '@prismicio/client'
import * as prismic from '@prismicio/client'
import type { Slice } from '@slices'
import { SliceZone } from '@slices'
import UnknownBankContent from '../UnknownBankContent'

interface Props {
  page: PrismicDocument | null
}

export function NotListedPage({ page }: Props) {
  const slices = (page?.data?.slices || []) as Slice[]

  if (slices && slices.length > 0) {
    return (
      <PageContent>
        <Stack className="gap-6">
          <SliceZone slices={slices} />
        </Stack>
      </PageContent>
    )
  }

  const text1 = page?.data?.text1 as RichTextField | undefined
  const text2 = page?.data?.text2 as RichTextField | undefined
  const titleText = text1 ? prismic.asText(text1) : ''

  return (
    <PageContent fullWidth>
      <Box data-breakout className="swoosh swoosh-br">
        <Stack className="contain z-10 mx-auto mt-16 max-w-2xl gap-12">
          <Stack className="items-center gap-8">
            <SmileySadIcon size={64} className="text-green-600" />
            {titleText && (
              <Title order={1} className="text-center">
                {titleText}
              </Title>
            )}

            <Stack className="">
              {text2 && text2.length > 0 && renderRichText(text2, 'text-lg')}
            </Stack>
          </Stack>
        </Stack>
      </Box>

      <UnknownBankContent page={page} />
    </PageContent>
  )
}
