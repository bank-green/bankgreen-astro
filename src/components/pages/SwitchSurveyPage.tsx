import { PageContent } from '@components/PageContent'
import { renderRichText } from '@lib/prismicHelpers'
import { Grid, Stack } from '@mantine/core'
import type { PrismicDocument, RichTextField } from '@prismicio/client'
import { CornerLogoContainer } from '../CornerLogo'
import { TypeformEmbed } from '../TypeformEmbed'

interface Props {
  page: PrismicDocument | null
}

export function SwitchSurveyPage({ page }: Props) {
  const text1 = page?.data?.text1 as RichTextField | undefined
  const text2 = page?.data?.text2 as RichTextField | undefined
  const text3 = page?.data?.text3 as RichTextField | undefined

  return (
    <PageContent fullWidth>
      <CornerLogoContainer className="mb-24">
        <Grid className="p-8" gutter="4rem">
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Stack className="gap-12 text-textInverse md:p-8 [&_h1]:text-textInverse [&_h2]:text-textInverse">
              {text1 && text1.length > 0 && renderRichText(text1)}
              {text2 && text2.length > 0 && renderRichText(text2)}
              {text3 && text3.length > 0 && renderRichText(text3)}
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TypeformEmbed />
          </Grid.Col>
        </Grid>
      </CornerLogoContainer>
    </PageContent>
  )
}
