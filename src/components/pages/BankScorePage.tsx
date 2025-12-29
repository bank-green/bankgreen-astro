import { FishesAnimation, PiggyAnimation, WindmillAnimation } from '@components/animations'
import { BankCircle, LastReviewed } from '@components/bank'
import { SafeHtml } from '@components/SafeHtml'
import { Swoosh } from '@components/Swoosh'
import type { DefaultFields } from '@lib/banks'
import { Anchor, Box, Button, Grid, Group, Image, Stack, Text, Title } from '@mantine/core'
import type { PrismicDocument } from '@prismicio/client'
import { type Slice, SliceZone } from '@slices'
import BankLogo from '../bank/BankLogo'
import { PageContent } from '../PageContent'
import UnknownBankContent from '../UnknownBankContent'

interface BankData {
  tag: string
  name: string
  website?: string | null
  commentary?: {
    rating?: string | null
    lastReviewed?: string | null
    headline?: string | null
    subtitle?: string | null
    description1?: string | null
    description2?: string | null
    description3?: string | null
    fossilFreeAlliance?: boolean | null
    inheritBrandRating?: {
      tag: string
      name: string
    } | null
  } | null
}

interface Props {
  bank: BankData | null
  prismicDefaults: DefaultFields
  prismicPage: PrismicDocument | null
  prismicNotListed: PrismicDocument | null
}

export function BankScorePage({ bank, prismicDefaults, prismicPage, prismicNotListed }: Props) {
  if (!bank) {
    return (
      <PageContent>
        <Box className="contain max-w-5xl py-24">
          <Title order={1} className="text-3xl">
            Bank not found
          </Title>
        </Box>
      </PageContent>
    )
  }

  const rating = bank.commentary?.rating || 'unknown'
  const isBadBank = ['worst', 'bad', 'ok'].includes(rating)
  const isGoodBank = ['good', 'great'].includes(rating)

  // Merge GraphQL data with Prismic defaults
  const headline = bank.commentary?.headline || prismicDefaults.headline
  const subtitle = bank.commentary?.subtitle || prismicDefaults.subtitle
  const description1 = bank.commentary?.description1 || prismicDefaults.description1
  const description2 = bank.commentary?.description2 || prismicDefaults.description2
  const description3 = bank.commentary?.description3 || prismicDefaults.description3
  const description4 = prismicDefaults.description4

  const ctaSlices = prismicPage?.data?.slices ? (prismicPage.data.slices as Slice[]) : []
  const websiteUrl = bank.website ? new URL(bank.website).hostname : ''
  const inheritBrandRating = bank.commentary?.inheritBrandRating

  return (
    <PageContent fullWidth>
      {/* SECTION ONE - Header with bank info */}
      <Box className="pt-16" data-breakout>
        <Stack className="contain items-center pb-8 md:min-h-128">
          <Grid className="mx-auto mb-16 w-full max-w-5xl md:mb-12" gutter={48}>
            <Grid.Col span={{ base: 12, md: 7 }}>
              <Stack className="mx-auto items-center gap-6 px-6 md:px-0">
                <Stack className="items-start">
                  <Group className="items-center gap-4">
                    {websiteUrl && (
                      <BankLogo
                        brandDomain={websiteUrl}
                        imgClass="rounded object-contain"
                        size={64}
                      />
                    )}
                    <Title order={3} className="mb-0 text-2xl md:text-3xl">
                      {bank.name}
                    </Title>
                  </Group>

                  {subtitle && <SafeHtml html={subtitle} className="font-medium text-xl" />}

                  {inheritBrandRating && (
                    <Text>
                      This brand is rated based on{' '}
                      <Anchor href={`/banks/${inheritBrandRating.tag}`}>
                        {inheritBrandRating.name}
                      </Anchor>
                    </Text>
                  )}
                  <Stack className="gap-8">
                    <SafeHtml html={headline} className="mb-0 font-semibold text-3xl" />
                    <Stack>
                      <SafeHtml className="mb-0 max-w-lg text-xl" html={description1} />
                      {bank.commentary?.fossilFreeAlliance && (
                        <Image
                          className="float-left mr-6 w-20 md:w-24 lg:w-36"
                          src="/img/certification/fossil-free-certified.png"
                          alt="Fossil Free Certification"
                          style={{
                            shapeOutside: 'circle(50%)',
                          }}
                        />
                      )}
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Grid.Col>

            <Grid.Col span="auto" className="items-end">
              <Stack className="items-center">
                <Box className="w-full max-w-88 lg:w-88">
                  <BankCircle
                    rating={rating as 'great' | 'good' | 'ok' | 'bad' | 'worst' | 'unknown'}
                  />
                </Box>
                <Stack className="items-center gap-0">
                  <Anchor href="/methodology">How Bank.Green rates institutions</Anchor>
                  <LastReviewed lastReviewed={bank.commentary?.lastReviewed} />
                </Stack>
              </Stack>
            </Grid.Col>
          </Grid>
          {isBadBank && (
            <Button
              component="a"
              href="/sustainable-eco-banks"
              size="lg"
              className="mx-auto max-w-fit"
            >
              Move Your Money
            </Button>
          )}
        </Stack>
        <Swoosh color="white" />
      </Box>

      <Box data-breakout className="overflow-hidden bg-white">
        {isBadBank && (
          <Stack className="contain gap-0 pt-8">
            <Group className="flex-col-reverse items-center justify-center gap-8 md:flex-row md:gap-24">
              <Box className="max-h-[901px] w-full max-w-sm md:w-1/2">
                <PiggyAnimation />
              </Box>
              <Stack className="gap-4 md:w-1/2">
                <SafeHtml html={description2} className="prose max-w-none text-2xl" />
                <SafeHtml html={description3} className="prose mt-4 max-w-none text-md" />
              </Stack>
            </Group>
            <Group className="flex-col items-center gap-4 md:flex-row md:justify-center md:gap-8">
              <Button component="a" href="/sustainable-eco-banks" size="lg">
                Move Your Money
              </Button>
            </Group>
          </Stack>
        )}
        {isGoodBank && (
          <Grid className="mx-auto mb-16 w-full max-w-6xl px-12 md:mb-12 lg:px-0" gutter={48}>
            <Grid.Col span={{ base: 12, md: 7 }}>
              <Image
                className="mx-auto mt-8 max-w-xl md:mt-0"
                src="/img/illustrations/dig.svg"
                alt="Digging for change illustration"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 5 }}>
              <SafeHtml html={description2} className="prose max-w-none text-2xl" />
              <SafeHtml html={description3} className="prose mt-4 max-w-none text-lg" />
            </Grid.Col>
          </Grid>
        )}
      </Box>

      {/* SECTION THREE - Only for bad banks */}
      {isBadBank && description4 && (
        <Box className="bg-ocean-100" data-breakout>
          <Swoosh direction="down" color="white" />
          <Image
            className="mb-4 inline-block max-w-sm"
            src="/img/illustrations/fishes.svg"
            alt="Fish illustration"
          />
          <Stack className="contain items-center gap-4">
            <Stack className="max-w-2xl text-lg">
              <SafeHtml html={description4} className="mx-auto text-center" />
            </Stack>
          </Stack>
        </Box>
      )}

      {/* CALL TO ACTION */}
      {isBadBank ? (
        <Box className="bg-ocean-100" data-breakout>
          <Stack className="contain items-center gap-8 py-16">
            <Title order={2} className="text-center">
              Take Action Today
            </Title>
            <Text className="max-w-3xl text-center text-lg md:text-xl">
              Every person who moves their money to a sustainable bank sends a powerful message.
              Join thousands of others in choosing to support a green future.
            </Text>
            <Button component="a" href="/sustainable-eco-banks" size="lg" className="max-w-fit">
              Find a Sustainable Bank
            </Button>
          </Stack>
        </Box>
      ) : ctaSlices && ctaSlices.length > 0 ? (
        <Box className="bg-ocean-100" data-breakout>
          <Swoosh direction="down" color="white" />
          <Box className="contain pt-32 pb-16">
            <Box className="mx-auto max-w-5xl rounded-3xl bg-sky-800 p-12 text-textInverse">
              <SliceZone slices={ctaSlices} />
            </Box>
          </Box>
        </Box>
      ) : (
        <UnknownBankContent page={prismicNotListed} />
      )}

      {/* FOOTER ANIMATION */}
      <Box data-breakout className="pointer-events-none flex items-end justify-end bg-ocean-100">
        {isBadBank ? (
          <Stack className="w-full justify-end">
            <FishesAnimation className="flex flex-col justify-end" />
          </Stack>
        ) : (
          <Box className="w-full">
            <WindmillAnimation className="mx-auto w-full" />
          </Box>
        )}
      </Box>

      {/* FOOTER */}
      <Box className="bg-sky-800" data-breakout>
        <Group className="contain w-full flex-wrap items-center py-4 text-gray-100 md:flex-nowrap md:py-8">
          <Stack className="w-full items-center p-6 md:p-8">
            <Title order={2} className="mb-4 w-full text-center text-gray-100">
              How do we derive our results?
            </Title>
            <Button component="a" href="/methodology" className="max-w-fit" size="lg">
              Find out more
            </Button>
          </Stack>
        </Group>
      </Box>
    </PageContent>
  )
}
