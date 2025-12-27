import { PageContent } from '@components/PageContent'
import { renderRichText } from '@lib/prismicHelpers'
import { Box, Grid, Image, Stack, Title } from '@mantine/core'
import type { ImageField, PrismicDocument, RichTextField } from '@prismicio/client'
import * as prismic from '@prismicio/client'
import { CornerLogoContainer } from '../CornerLogo'
import { RaiselyEmbed } from '../RaiselyEmbed'

interface Props {
  page: PrismicDocument | null
}

export function DonatePage({ page }: Props) {
  const photo = page?.data?.photo as ImageField | undefined
  const title = page?.data?.title as RichTextField | undefined
  const description = page?.data?.description as RichTextField | undefined
  const donationTitle = page?.data?.donation_title as RichTextField | undefined
  const donationDescription = page?.data?.donation_description as RichTextField | undefined

  const titleText = title ? prismic.asText(title) : 'Help us build a greener future!'
  const donationTitleText = donationTitle ? prismic.asText(donationTitle) : 'Donate to Bank.Green'

  return (
    <PageContent fullWidth>
      <Grid gutter={{ base: 'lg' }}>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Stack className="px-6 pb-8 lg:px-0">
            {photo?.url && <Image src={photo.url} alt="donation" fit="cover" radius="lg" mb="lg" />}
            <Title order={2}>{titleText}</Title>
            {description && description.length > 0 && renderRichText(description, 'text-lg')}
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <CornerLogoContainer className="gap-6 p-8 pt-6 text-center sm:rounded-xl md:px-12">
            <Title order={1} className="text-textInverse">
              {donationTitleText}
            </Title>
            <Box className="mx-auto max-w-lg">
              {donationDescription &&
                donationDescription.length > 0 &&
                renderRichText(donationDescription)}
            </Box>

            <RaiselyEmbed />
          </CornerLogoContainer>
        </Grid.Col>
      </Grid>
    </PageContent>
  )
}
