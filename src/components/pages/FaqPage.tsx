import { PageContent } from '@components/PageContent'
import { renderRichText } from '@lib/prismicHelpers'
import { Stack, Title } from '@mantine/core'
import type { PrismicDocument, RichTextField } from '@prismicio/client'
import { SliceZone } from '@slices'

interface Props {
  page: PrismicDocument | null
}

export function FaqPage({ page }: Props) {
  const introduction = page?.data?.introduction as RichTextField | undefined
  const slices = page?.data?.slices

  return (
    <PageContent>
      <Stack>
        {introduction && introduction.length > 0 ? (
          renderRichText(introduction)
        ) : (
          <Title order={1}>Frequently Asked Questions</Title>
        )}

        <Stack className="rounded-lg bg-white p-4">
          {slices ? <SliceZone slices={slices} /> : <p>Error loading content.</p>}
        </Stack>

        <section>
          <h2>Take Action with Bank.Green</h2>
          {/* Newsletter signup form placeholder */}
        </section>
      </Stack>
    </PageContent>
  )
}
