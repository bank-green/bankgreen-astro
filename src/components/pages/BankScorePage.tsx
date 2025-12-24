import { FishesAnimation, PiggyAnimation, WindmillAnimation } from '@components/animations'
import { BankCircle, LastReviewed } from '@components/bank'
import { SafeHtml } from '@components/SafeHtml'
import { Swoosh } from '@components/Swoosh'
import type { DefaultFields } from '@lib/banks'
import {
  Anchor,
  Box,
  Button,
  Grid,
  Group,
  List,
  MantineProvider,
  Paper,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from '@mantine/core'
import { CheckIcon } from '@phosphor-icons/react'
import type { PrismicDocument } from '@prismicio/client'
import type { Slice } from '@slices'
import { SliceZone } from '@slices'
import theme from '@styles/theme'
import BankLogo from '../bank/BankLogo'

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
}

export function BankScorePage({ bank, prismicDefaults, prismicPage }: Props) {
  if (!bank) {
    return (
      <MantineProvider theme={theme}>
        <Box className="contain max-w-5xl py-24">
          <Title order={1} className="text-3xl">
            Bank not found
          </Title>
        </Box>
      </MantineProvider>
    )
  }

  const rating = bank.commentary?.rating || 'unknown'
  const isBadBank = ['worst', 'bad', 'ok'].includes(rating)

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
    <MantineProvider theme={theme}>
      <Box className="page">
        {/* SECTION ONE - Header with bank info */}
        <Box
          id="section-one"
          className="bg-linear-to-b from-sushi-50 to-sushi-100 pt-20"
          data-breakout
        >
          <Stack className={isBadBank ? 'items-center pb-8' : 'contain md:min-h-128'}>
            <Grid className="mx-auto mb-16 w-full max-w-5xl md:mb-12" gutter={48}>
              <Grid.Col span={{ base: 12, md: 7 }}>
                <Stack className="gap-6 px-6 md:px-0">
                  <Stack>
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
                  </Stack>{' '}
                  <Stack className="gap-8">
                    <SafeHtml html={headline} className="mb-0 font-semibold text-2xl md:text-3xl" />
                    <Stack>
                      <SafeHtml className="mb-0 max-w-lg text-lg md:text-xl" html={description1} />
                      {bank.commentary?.fossilFreeAlliance && (
                        <img
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
          <Swoosh />
        </Box>

        {/* SECTION TWO - Description content */}
        <Box id="section-two" className="overflow-hidden bg-gray-50 py-8">
          {isBadBank ? (
            <Stack className="contain gap-0">
              <Group className="flex-col-reverse items-center justify-center gap-8 md:flex-row md:gap-24">
                <Box className="w-full max-w-sm md:w-1/2">
                  <PiggyAnimation className="w-full" />
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
          ) : (
            <Stack className="mx-auto w-full max-w-5xl px-8 md:flex-row md:items-start md:justify-between md:px-0">
              <Box className={rating === 'good' || rating === 'great' ? 'md:w-3/6' : 'w-full'}>
                <SafeHtml html={description2} className="prose max-w-none text-2xl" />
                <SafeHtml html={description3} className="prose mt-4 max-w-none text-lg" />
              </Box>
              {(rating === 'good' || rating === 'great') && (
                <img
                  className="mt-8 md:order-first md:mt-0 md:ml-4 md:w-2/6"
                  src="/img/illustrations/dig.svg"
                  alt="Digging for change illustration"
                />
              )}
            </Stack>
          )}
        </Box>

        {/* SECTION THREE - Only for bad banks */}
        {isBadBank && description4 && (
          <Box id="section-three" className="bg-ocean-100" data-breakout>
            <Swoosh direction="down" />
            <Stack className="contain items-center gap-4 pt-32">
              <img
                className="mb-4 inline-block"
                src="/img/illustrations/fishes.svg"
                alt="Fish illustration"
              />
              <Stack className="max-w-2xl text-lg">
                <SafeHtml html={description4} className="mx-auto text-center" />
              </Stack>
            </Stack>
          </Box>
        )}

        {/* CALL TO ACTION */}
        <Box id="call-to-action" className="bg-ocean-100 text-gray-800" data-breakout>
          {isBadBank ? (
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
          ) : (
            <>
              <Swoosh direction="down" />
              <Box className="contain pt-32 pb-16">
                {ctaSlices && ctaSlices.length > 0 ? (
                  <Box className="mx-auto max-w-5xl rounded-3xl bg-sky-800 p-12 text-textInverse">
                    <SliceZone slices={ctaSlices} />
                  </Box>
                ) : (
                  <Stack gap="lg">
                    <Title order={2} className="mb-4 text-center">
                      Join the Money Movement
                    </Title>
                    <Group className="mx-auto max-w-4xl flex-col items-center justify-center md:flex-row md:space-x-8">
                      <Stack className="md:max-w-sm lg:w-1/2">
                        <Text className="mb-4 text-lg md:text-2xl">
                          We can't say it better than environmentalist Bill McKibben: "Money is the
                          oxygen on which the fire of global warming burns." But don't wait for the
                          fire department to turn up – join us!
                        </Text>
                      </Stack>
                      <Stack className="my-8 w-full rounded-2xl bg-white p-8 pl-4 lg:w-1/2">
                        <List
                          spacing="sm"
                          className="space-y-3"
                          icon={
                            <ThemeIcon color="green.1" size={24} radius="xl" className="shrink-0">
                              <CheckIcon size={18} weight="bold" className="text-green-500" />
                            </ThemeIcon>
                          }
                        >
                          <List.Item>Learn about the issues via our blog updates</List.Item>
                          <List.Item>
                            Join our campaigns to take action against fossil finance
                          </List.Item>
                          <List.Item>Discover other ways to divest from fossil fuels</List.Item>
                        </List>
                      </Stack>
                    </Group>
                    <Stack className="items-center">
                      <Paper className="my-8 w-full max-w-4xl rounded-lg bg-sky-800 p-6 shadow-sm">
                        <Stack className="gap-4">
                          <Title order={3} className="mb-4 text-center text-textInverse">
                            Sign up to Bank.Green. We'll take the fight to the banks together.
                          </Title>
                          <form className="mx-auto w-full max-w-160">
                            <Group className="gap-2">
                              <TextInput
                                type="email"
                                placeholder="Your email address"
                                className="flex-1"
                                required
                              />
                              <Button type="submit">Join the Money Movement</Button>
                            </Group>
                          </form>
                        </Stack>
                      </Paper>
                    </Stack>
                  </Stack>
                )}
              </Box>
            </>
          )}
        </Box>

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
      </Box>
    </MantineProvider>
  )
}
