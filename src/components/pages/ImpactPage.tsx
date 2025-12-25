import { PageContent } from '@components/PageContent'
import { renderRichText } from '@lib/prismicHelpers'
import { Grid, Stack } from '@mantine/core'
import type { PrismicDocument, RichTextField } from '@prismicio/client'
import { TypeformEmbed } from '../TypeformEmbed'

interface Props {
  page: PrismicDocument | null
}

export function ImpactPage({ page }: Props) {
  const text1 = page?.data?.text1 as RichTextField | undefined
  const text2 = page?.data?.text2 as RichTextField | undefined
  const text3 = page?.data?.text3 as RichTextField | undefined

  return (
    <PageContent fullWidth>
      <Grid className="mb-24 bg-leaf-700 p-8 lg:rounded-2xl" gutter="4rem">
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Stack className="gap-12 text-textInverse [&_h1]:text-textInverse [&_h2]:text-textInverse">
            {text1 && text1.length > 0 && renderRichText(text1)}
            {text2 && text2.length > 0 && renderRichText(text2)}
            {text3 && text3.length > 0 && renderRichText(text3)}
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <TypeformEmbed />
        </Grid.Col>
      </Grid>
    </PageContent>
  )
}
