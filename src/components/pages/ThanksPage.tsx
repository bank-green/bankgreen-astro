import { PageContent } from '@components/PageContent'
import { Anchor, List, Stack, Text, Title } from '@mantine/core'
import type { PrismicDocument } from '@prismicio/client'
import type { Slice } from '@slices'
import { SliceZone } from '@slices'

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
  const showExplore = pageType !== 'donate-cancelled' && pageType !== 'updates-no'

  return (
    <PageContent>
      {slices ? (
        <SliceZone slices={slices} />
      ) : (
        <Stack className="gap-8">
          <Title order={1} className="text-gray-900">
            {fallback.title}
          </Title>
          {fallback.description && <Text className="text-lg">{fallback.description}</Text>}
        </Stack>
      )}

      {showExplore && (
        <Stack className="mt-12 gap-6">
          <Title order={2} className="text-gray-900">
            Explore More
          </Title>
          <List>
            <List.Item>
              <Anchor href="/sustainable-eco-banks">Find a sustainable bank</Anchor>
            </List.Item>
            <List.Item>
              <Anchor href="/blog">Read our blog</Anchor>
            </List.Item>
            <List.Item>
              <Anchor href="/take-action">Take action</Anchor>
            </List.Item>
          </List>
        </Stack>
      )}
    </PageContent>
  )
}
