import { PageContent } from '@components/PageContent'
import { renderRichText } from '@lib/prismicHelpers'
import { Image, Stack, Text, Title } from '@mantine/core'
import type { ImageField, PrismicDocument, RichTextField } from '@prismicio/client'
import * as prismic from '@prismicio/client'

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
    <PageContent>
      <Stack gap="lg">
        {photo?.url && <Image src={photo.url} alt="donation" fit="cover" radius="md" mb="lg" />}

        <Title order={2}>{titleText}</Title>

        <Stack gap="md">
          {description && description.length > 0 && renderRichText(description)}
        </Stack>

        <Title order={1}>{donationTitleText}</Title>

        <Stack gap="md">
          {donationDescription && donationDescription.length > 0 ? (
            renderRichText(donationDescription)
          ) : (
            <Text>
              ...and make a big difference in the world. Your donation will give us greater capacity
              to green the banking sector and protect our collective future.
            </Text>
          )}
        </Stack>

        {/* Raisely donation widget will be embedded here */}
        <div
          className="raisely-donate"
          data-campaign-path="bankgreen-donate"
          data-profile=""
          data-width="100%"
          data-height="800"
        />
      </Stack>
    </PageContent>
  )
}
