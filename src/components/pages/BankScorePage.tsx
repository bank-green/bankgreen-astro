import {
  BankCircle,
  BankHeadline,
  BankLayoutBad,
  BankLayoutGood,
  LastReviewed,
} from '@components/bank'
import { SafeHtml } from '@components/SafeHtml'
import type { DefaultFields } from '@lib/banks'
import { Anchor, Box, Grid, MantineProvider, Stack, Text, Title } from '@mantine/core'
import type { PrismicDocument } from '@prismicio/client'
import type { Slice } from '@slices'
import theme from '@styles/theme'

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
        <div className="contain max-w-5xl py-24">
          <h1 className="font-bold text-3xl">Bank not found</h1>
        </div>
      </MantineProvider>
    )
  }

  const rating = bank.commentary?.rating || 'unknown'

  // Merge GraphQL data with Prismic defaults
  const headline = bank.commentary?.headline || prismicDefaults.headline
  const subtitle = bank.commentary?.subtitle || prismicDefaults.subtitle
  const description1 = bank.commentary?.description1 || prismicDefaults.description1
  const description2 = bank.commentary?.description2 || prismicDefaults.description2
  const description3 = bank.commentary?.description3 || prismicDefaults.description3
  const description4 = prismicDefaults.description4

  // Select layout based on rating
  const LayoutComponent = ['worst', 'bad', 'ok'].includes(rating) ? BankLayoutBad : BankLayoutGood

  // Prepare section content
  const section1Content = (
    <Grid className="mx-auto mb-16 w-full max-w-5xl md:mb-32" gutter={48}>
      <Grid.Col span={{ base: 12, md: 7 }} className="md:mt-8">
        <Stack className="items-center gap-6">
          <BankHeadline
            name={bank.name}
            website={bank.website}
            subtitle={subtitle}
            inheritBrandRating={bank.commentary?.inheritBrandRating}
          />
          <Stack className="items-center gap-8">
            <Title order={2} className="text-center text-3xl md:text-4xl">
              <SafeHtml html={headline} className="mb-0 leading-tight" />
            </Title>
            <Box>
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
              <Text className="mb-0 text-lg md:text-xl">
                <SafeHtml className="max-w-lg" html={description1} />
              </Text>
            </Box>
          </Stack>
        </Stack>
      </Grid.Col>

      <Grid.Col span="auto" className="items-end">
        <Stack className="items-center">
          <Box className="w-full max-w-[20rem] lg:w-[20rem]">
            <BankCircle rating={rating as 'great' | 'good' | 'ok' | 'bad' | 'worst' | 'unknown'} />
          </Box>
          {/* SocialSharer placeholder */}
          <Stack className="items-center gap-0">
            <Anchor href="/methodology">How Bank.Green rates institutions</Anchor>
            <LastReviewed lastReviewed={bank.commentary?.lastReviewed} />
          </Stack>
        </Stack>
      </Grid.Col>
    </Grid>
  )

  const section2Content = (
    <>
      <Stack className="mx-auto w-full max-w-5xl px-8 md:flex-row md:items-start md:justify-between md:px-0">
        {/* Text Container */}
        <div className={rating === 'good' || rating === 'great' ? 'md:w-3/6' : 'w-full'}>
          <SafeHtml html={description2} className="prose max-w-none text-2xl" />
          <SafeHtml html={description3} className="prose mt-4 max-w-none text-lg" />
        </div>

        {/* Image Container - only for good banks */}
        {(rating === 'good' || rating === 'great') && (
          <img
            className="mt-8 md:order-first md:mt-0 md:ml-4 md:w-2/6"
            src="/img/illustrations/dig.svg"
            alt="Digging for change illustration"
          />
        )}
      </Stack>
    </>
  )

  const section3Content = description4 ? (
    <SafeHtml
      html={description4}
      className="prose sm:prose-md xl:prose-lg mx-auto text-center text-blue-900 text-lg"
    />
  ) : undefined

  const ctaSlices = prismicPage?.data?.slices ? (prismicPage.data.slices as Slice[]) : []

  return (
    <MantineProvider theme={theme}>
      <LayoutComponent
        section1={section1Content}
        section2={section2Content}
        section3={section3Content}
        callToActionSlices={ctaSlices}
        showLeadGenSlice={false}
      />
    </MantineProvider>
  )
}
