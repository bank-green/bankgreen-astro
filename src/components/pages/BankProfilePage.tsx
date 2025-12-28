import { BankCircle, BankOverview, BankProducts } from '@components/bank'
import BankLogo from '@components/bank/BankLogo'
import { LastReviewed } from '@components/bank/LastReviewed'
import { PageContent } from '@components/PageContent'
import { SafeHtml } from '@components/SafeHtml'
import { renderRichText } from '@lib/prismicHelpers'
import type { HarvestData } from '@lib/queries/brands'
import {
  Anchor,
  Box,
  Button,
  Card,
  Grid,
  Group,
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

export function BankProfilePage({ bank, harvestData, prismicData, prismicDefaults }: Props) {
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
    <MantineProvider theme={theme}>
      <Box data-breakout className="py-16">
        <Stack className="gap-16">
          <Box className="contain">
            <Card className="relative overflow-visible p-10">
              <Box className="-top-4 -right-4 absolute drop-shadow-lg">
                <img className="h-20 w-auto" src="/img/logos/bankgreen-logo.png" alt="Bank Green" />
              </Box>

              <SimpleGrid cols={2} className="gap-8">
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
                    <Group className="mt-4 flex-col items-center justify-start gap-6 md:flex-row">
                      {bank.commentary?.fossilFreeAlliance && (
                        <img
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
                            <img
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

                <Stack className="w-full items-center justify-start">
                  <Box className="w-full max-w-sm md:w-88 md:max-w-88">
                    <BankCircle
                      rating={rating as 'great' | 'good' | 'ok' | 'bad' | 'worst' | 'unknown'}
                    />
                  </Box>
                  {/* TODO: Add SocialSharer component when available */}
                  <Stack className="gap-0 text-center">
                    <Anchor href="/methodology" className="mt-6">
                      How we rate banks
                    </Anchor>
                    <LastReviewed lastReviewed={bank.commentary?.lastReviewed} />
                  </Stack>
                </Stack>

                {/* Our Take Section */}
              </SimpleGrid>
            </Card>
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
              <Grid.Col span={3}>
                <Card className="h-full max-w-xs">
                  <BankOverview harvestData={harvestData || null} />
                </Card>
              </Grid.Col>
              <Grid.Col span={9}>
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
            tag="green bank"
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
      </Box>
    </MantineProvider>
  )
}
