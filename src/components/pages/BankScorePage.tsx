import { BankHeadline, BankLayoutBad, BankLayoutGood, LastReviewed } from '@components/bank'
import { SafeHtml } from '@components/SafeHtml'
import type { DefaultFields } from '@lib/banks'
import { MantineProvider, Typography } from '@mantine/core'
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
    <>
      <BankHeadline
        name={bank.name}
        website={bank.website}
        subtitle={subtitle}
        inheritBrandRating={bank.commentary?.inheritBrandRating}
      />
      <div className="relative col-span-2 flex flex-row justify-center md:col-span-1 md:row-span-2 md:mt-8 md:justify-start">
        <div className="flex w-full flex-col items-center justify-start">
          {/* BankCircle placeholder - will be replaced with actual component later */}
          <div className="mb-4 flex h-64 w-64 max-w-sm items-center justify-center rounded-full bg-gray-200">
            <span className="font-bold text-4xl text-gray-700">{rating.toUpperCase()}</span>
          </div>
          {/* SocialSharer placeholder */}
          <a
            href="/methodology"
            className="mt-6 text-center text-sm underline hover:text-sushi-500"
          >
            How Bank.Green rates institutions
          </a>
          <LastReviewed lastReviewed={bank.commentary?.lastReviewed} />
        </div>
      </div>
      <div className="col-span-2 md:col-span-1">
        {bank.commentary?.fossilFreeAlliance && (
          <div className="mb-8 flex w-full justify-center md:block">
            <img
              className="w-32"
              src="/img/certification/fossil-free-certified.png"
              alt="Fossil Free Certification"
            />
          </div>
        )}
        <Typography>
          <SafeHtml
            html={headline}
            className="mb-2 font-semibold text-2xl text-gray-800 md:mb-6 md:text-4xl"
          />
          <SafeHtml html={description1} className="max-w-none" />
        </Typography>
      </div>
    </>
  )

  const section2Content = (
    <>
      <div className="flex w-full flex-col pt-8 pb-16 md:flex-row md:items-start md:justify-between">
        {/* Text Container */}
        <div className={rating === 'good' || rating === 'great' ? 'md:w-3/6' : 'w-full'}>
          <SafeHtml html={description2} className="prose max-w-none" />
          <SafeHtml html={description3} className="prose mt-4 max-w-none" />

          <div className="mt-6 flex justify-center">
            <a href="#section-three">
              <svg
                className="inline-block w-10 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Scroll to next section</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Image Container - only for good banks */}
        {(rating === 'good' || rating === 'great') && (
          <img
            className="mt-8 md:order-first md:mt-0 md:ml-4 md:w-2/6"
            src="/img/illustrations/dig.svg"
            alt="Digging for change illustration"
          />
        )}
      </div>
    </>
  )

  const section3Content = description4 ? (
    <SafeHtml
      html={description4}
      className="prose sm:prose-md xl:prose-lg mx-auto text-center text-blue-900 text-lg leading-loose"
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
