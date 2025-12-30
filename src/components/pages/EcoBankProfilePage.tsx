import { BankCircle, BankOverview, BankProducts } from '@components/bank'
import BankLogo from '@components/bank/BankLogo'
import { LastReviewed } from '@components/bank/LastReviewed'
import { PageContent } from '@components/PageContent'
import { SafeHtml } from '@components/SafeHtml'
import { SocialSharer } from '@components/SocialSharer'
import { renderRichText } from '@lib/prismicHelpers'
import type { HarvestData } from '@lib/queries/brands'
import {
  Anchor,
  Box,
  Button,
  Card,
  Grid,
  Group,
  Image,
  MantineProvider,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import type { PrismicDocument } from '@prismicio/client'
import theme from '@styles/theme'
import ContactFormContainer from '../forms/ContactFormContainer'

interface BankData {
  tag: string
  name: string
  website?: string | null
  commentary?: {
    rating?: string | null
    ratingInherited?: boolean | null
    lastReviewed?: string | null
    headline?: string | null
    subtitle?: string | null
    description1?: string | null
    description2?: string | null
    description3?: string | null
    fossilFreeAlliance?: boolean | null
    topPick?: boolean | null
    inheritBrandRating?: {
      tag: string
      name: string
    } | null
    institutionType?: {
      name: string
    } | null
    institutionCredentials?: Array<{
      name: string
      prismicApiId: string
    }> | null
  } | null
  countries?: Array<{ code: string }> | null
}

interface Props {
  bank: BankData | null
  harvestData?: HarvestData | null
  prismicData?: PrismicDocument | null
  prismicDefaults?: PrismicDocument | null
}

// Extract first paragraph from HTML string
function getFirstParagraph(html: string): string {
  const match = html.match(/<p[^>]*>(.*?)<\/p>/s)
  return match ? match[0] : html
}

export function EcoBankProfilePage({ bank, harvestData, prismicData, prismicDefaults }: Props) {
  if (!bank) {
    return (
      <MantineProvider theme={theme}>
        <PageContent>
          <Stack className="py-24">
            <Title order={1} className="text-3xl">
              Bank not found
            </Title>
          </Stack>
        </PageContent>
      </MantineProvider>
    )
  }

  const rating = bank.commentary?.rating || 'unknown'
  const websiteUrl = bank.website ? new URL(bank.website).hostname : ''
  const inheritBrandRating = bank.commentary?.inheritBrandRating
  const institutionCredentials = bank.commentary?.institutionCredentials || []

  // Get "Our take" content - prioritize Prismic, fallback to GraphQL
  const ourTakeContent = prismicData?.data?.our_take
  const hasOurTake = ourTakeContent && ourTakeContent.length > 0

  // Fallback to GraphQL if no Prismic content
  const descriptionText = bank.commentary?.headline || bank.commentary?.description1 || null
  const firstParagraph = descriptionText ? getFirstParagraph(descriptionText) : null

  return (
    <PageContent fullWidth>
      <Stack data-breakout className="gap-16 py-16">
        <Box className="contain">
          <Box className="relative overflow-visible from-white via-white to-blue-100 p-8 md:p-12 md:pr-16 lg:rounded-3xl lg:bg-linear-to-tr">
            <SimpleGrid cols={{ base: 1, md: 2 }} className="gap-8">
              {/* Bank Name & Logo */}
              <Stack>
                <Group className="items-center gap-4">
                  {websiteUrl && (
                    <Box className="relative h-14 w-14 rounded-lg">
                      <BankLogo brandDomain={websiteUrl} size={56} imgClass="rounded-lg" />
                    </Box>
                  )}
                  <Stack className="gap-1">
                    <Title order={4}>{bank.name}</Title>
                    {inheritBrandRating && (
                      <Text className="text-textLight text-xs">
                        Deposits or policies controlled by{' '}
                        <Anchor
                          href={`/sustainable-eco-banks/${inheritBrandRating.tag}`}
                          className="underline"
                        >
                          {inheritBrandRating.name}
                        </Anchor>
                      </Text>
                    )}
                  </Stack>
                </Group>
                <Title order={3}>Our take on {bank.name}</Title>
                <Stack className="gap-4">
                  {hasOurTake ? (
                    <Box>{renderRichText(ourTakeContent, 'text-lg  md:text-xl')}</Box>
                  ) : (
                    firstParagraph && (
                      <SafeHtml html={firstParagraph} className="text-lg md:text-xl" />
                    )
                  )}
                </Stack>

                {/* Certifications & Badges - Only show institution credentials */}
                {institutionCredentials.length > 0 && prismicDefaults && (
                  <Group className="mt-4 items-center gap-6">
                    {bank.commentary?.fossilFreeAlliance && (
                      <Image
                        className="h-16 w-16"
                        src="/img/certification/fossil-free-certified.png"
                        alt="Fossil Free Certification"
                      />
                    )}

                    {institutionCredentials
                      .map((credential) => {
                        const imageField = prismicDefaults.data?.[credential.prismicApiId] as
                          | { url?: string; alt?: string | null }
                          | undefined

                        if (!imageField?.url) {
                          return null
                        }

                        return (
                          <Image
                            key={credential.prismicApiId}
                            className="h-16 w-auto"
                            src={imageField.url}
                            alt={imageField.alt || credential.name}
                            title={credential.name}
                          />
                        )
                      })
                      .filter(Boolean)}
                  </Group>
                )}
              </Stack>

              {/* Rating Circle */}

              <Stack className="w-full items-center justify-center md:items-end">
                <Stack className="items-center gap-0 text-center">
                  <Box className="w-88">
                    <BankCircle
                      rating={rating as 'great' | 'good' | 'ok' | 'bad' | 'worst' | 'unknown'}
                    />
                  </Box>
                  <SocialSharer
                    shareText={`Check out ${bank.name}'s environmental rating on Bank.Green!`}
                    shareUrl={`https://bank.green/sustainable-eco-banks/${bank.tag}`}
                    className="mt-4"
                  />
                  <Anchor href="/methodology" className="mt-6">
                    How we rate banks
                  </Anchor>
                  <LastReviewed lastReviewed={bank.commentary?.lastReviewed} />
                </Stack>
              </Stack>

              {/* Our Take Section */}
            </SimpleGrid>
          </Box>
        </Box>

        {/* SWITCH SURVEY / CTA */}
        <Box className="contain">
          <Group className="w-full justify-between">
            <Button component="a" href="#lead-gen" size="lg">
              Get more information
            </Button>
            <Stack className="gap-0 text-right">
              <Text>
                Have you switched to {bank.name}? We'd love to hear about your experience!
              </Text>
              <Anchor href="/impact" rel="noopener noreferrer" className="font-semibold">
                Take our 2-minute survey
              </Anchor>
            </Stack>
          </Group>
        </Box>

        {/* BANK DETAILS */}
        <Stack className="contain">
          <Grid className="w-full">
            <Grid.Col span={{ base: 12, md: 3 }}>
              <Card className="h-full">
                <BankOverview harvestData={harvestData || null} />
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 9 }}>
              {harvestData && <BankProducts harvestData={harvestData} />}
            </Grid.Col>
          </Grid>
        </Stack>

        <ContactFormContainer
          listItems={[
            'Learn how to take action on fossil fuel finance.',
            'Discover green banking and how easy it is to switch.',
            'Stay up to date with climate finance news.',
          ]}
          title="Curious about switching to a green bank?"
          tag="green directory"
          successRedirect="/thanks"
          labels={{ submit: 'Complete Sign Up' }}
          className=""
          fields={{
            firstName: true,
            email: true,
            bank: false,
            subject: false,
            message: false,
            status: true,
            isAgreeMarketing: true,
            isAgreeTerms: true,
          }}
        />
      </Stack>
    </PageContent>
  )
}
