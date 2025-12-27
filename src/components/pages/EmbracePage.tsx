import { PageContent } from '@components/PageContent'
import { renderRichText } from '@lib/prismicHelpers'
import { Stack, Title } from '@mantine/core'
import type { PrismicDocument, RichTextField } from '@prismicio/client'

interface Props {
  page: PrismicDocument | null
}

export function EmbracePage({ page }: Props) {
  const title = (page?.data?.title as string) || 'Encourage Real Policy Implementation!'
  const subtitle = (page?.data?.subtitle as string) || 'Together for sustainability'
  const description1 = page?.data?.description1 as RichTextField | undefined

  return (
    <PageContent>
      <Stack className="contain">
        <Title order={1}>{title}</Title>
        <Title order={3}>{subtitle}</Title>

        {description1 && description1.length > 0 && renderRichText(description1)}

        <section>{/* Embrace form component will be implemented here */}</section>
      </Stack>
    </PageContent>
  )
}
