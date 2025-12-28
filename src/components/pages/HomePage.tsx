import { ATMAnimation, MoneySmokeAnimation } from '@components/animations'
import BankLocationSearch from '@components/forms/BankLocationSearch'
import { Swoosh } from '@components/Swoosh'
import { renderRichText } from '@lib/prismicHelpers'
import { Anchor, Box, Card, Grid, Group, Image, Stack, Text, Title } from '@mantine/core'

import type { PrismicDocument, RichTextField } from '@prismicio/client'
import type { Slice } from '@slices'
import { SliceZone } from '@slices'
import cx from 'clsx'
import type { Bank } from '../../lib/banks'
import ArrowDown from '../animations/ArrowDown'
import ContactFormContainer from '../forms/ContactFormContainer'
import { PageContent } from '../PageContent'

interface Props {
  page: PrismicDocument | null
}

export function HomePage({ page }: Props) {
  const title = (page?.data?.title as string) || 'Is your money being used to fund climate chaos?'
  const slices1 = (page?.data?.slices1 || []) as Slice[] // "As featured in" logos
  const description1 = page?.data?.description1 as RichTextField | undefined
  const description2 = page?.data?.description2 as RichTextField | undefined
  const description3 = page?.data?.description3 as RichTextField | undefined
  const description4 = page?.data?.description4 as RichTextField | undefined

  function handleBankSelect(bank: Bank | null) {
    if (bank) {
      window.location.href = `/banks/${bank ? bank.tag : ''}`
    }
  }

  return (
    <PageContent fullWidth>
      {/* Hero section with green gradient background - breaks out of container */}
      <Box data-breakout className="bg-linear-to-b from-sushi-100 to-sushi-200">
        <Grid className="contain items-end gap-12 pt-8 pb-12 md:pt-20 lg:pb-18">
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Title
              order={1}
              className={cx(
                'mx-auto block max-w-xl text-center md:text-left',
                'md:mx-0 md:text-6xl lg:pr-6',
                'bg-linear-to-tr from-sky-800 to-sky-500',
                'bg-clip-text text-transparent'
              )}
            >
              {title}
            </Title>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Box className="mx-auto flex w-full justify-start">
              <BankLocationSearch onBankSelect={handleBankSelect} />
            </Box>
          </Grid.Col>
        </Grid>

        {/* As featured in */}
        <Stack className="-mb-24 w-full py-6 pb-24">
          <Box className="mx-auto hidden w-full max-w-6xl bg-linear-to-br px-12 lg:flex lg:rounded-3xl lg:px-0">
            <Stack className="mx-auto w-full max-w-6xl items-center justify-between px-6 md:flex md:px-0 lg:flex-row lg:items-start">
              <Stack className="lg:no-wrap mx-auto mb-8 items-center justify-between gap-4 lg:mx-0 lg:items-start">
                <Text className="mb-8 inline-block w-full grow whitespace-nowrap text-center font-semibold text-sky-700 text-xl md:mb-0">
                  As featured in
                </Text>
                <Stack
                  className={cx(
                    'grow items-center justify-between md:flex md:flex-row md:space-y-0',
                    '[&>img]:rounded-xl [&>img]:bg-white [&>img]:mix-blend-luminosity [&>img]:grayscale',
                    '[&>img]:relative [&>img]:h-16 [&>img]:min-h-16 [&>img]:w-auto [&>img]:min-w-48 [&>img]:px-6 [&>img]:py-4',
                    'lg:[&>img]:min-h-18 lg:[&>img]:px-8 lg:[&>img]:py-5'
                  )}
                >
                  {slices1 && <SliceZone slices={slices1} />}
                </Stack>
              </Stack>
              <Stack className="items-center gap-4">
                <Text className="mb-0 text-center font-semibold text-sky-700 text-xl">
                  In association with
                </Text>
                <Stack className="items-center gap-2">
                  <Anchor
                    href="https://www.banktrack.org/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Card variant="color-hover" className="-mb-1 h-18 w-auto">
                      <Image
                        src="/img/logos/banktrack.svg"
                        alt="BankTrack"
                        className="h-full w-auto"
                      />
                    </Card>
                  </Anchor>
                  <Anchor href="/partners" className="text-sm">
                    See our partners
                  </Anchor>
                </Stack>
              </Stack>
            </Stack>
          </Box>
          <Stack>
            {/* Why Bank.Green? teaser */}
            <Group className="mx-auto items-center gap-1 text-2xl text-gray-700 leading-4 sm:text-4xl lg:mt-16">
              Why{' '}
              <Image
                className="mt-2 ml-2 inline-block h-6 w-auto px-0.5 sm:h-10"
                src="/img/trim-hor-light.svg"
                alt="Bank.Green"
              />
              ?
            </Group>
            {/* Arrow down bounce animation */}
            <ArrowDown className="mx-auto mt-4" />
          </Stack>
          {/* Swoosh transitions from green gradient to white */}
          <Swoosh color="var(--color-white)" />
        </Stack>
      </Box>

      {/* Why Bank.Green section - white background with ATM illustration */}
      <Box data-breakout className="bg-white">
        <Grid className="contain flex flex-col items-center justify-center py-16 md:flex-row">
          <Grid.Col span={{ base: 12, md: 6 }} className="flex flex-col">
            <Stack className="mx-auto my-auto max-w-xl md:pr-12">
              {description1 &&
                description1.length > 0 &&
                renderRichText(description1, 'text-xl md:text-3xl')}
              {description2 &&
                description2.length > 0 &&
                renderRichText(description2, 'text-xl md:text-2xl')}
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            {/* ATM animation */}
            <Box className="mx-auto aspect-450/400 w-full max-w-xl md:pl-12">
              <ATMAnimation />
            </Box>
          </Grid.Col>
        </Grid>
      </Box>

      {/* Arctic blue section with bank illustration and lead gen form - breaks out of container */}
      <Box data-breakout className="bg-arcticBlue">
        {/* Swoosh transitions from white down into arctic blue */}
        <Swoosh direction="down" color="var(--color-white)" />

        <Box data-container>
          {/* Bank illustration section */}
          <Grid className="contain z-10 items-center justify-center pt-8 pb-4 md:pb-16">
            {/* Bank illustration - on left for desktop */}
            <Grid.Col span={{ base: 12, md: 7 }} className="md:w-5/8 md:pr-8">
              <Box className="mx-auto h-auto w-full max-w-xl">
                <Image
                  src="/img/illustrations/bank.svg"
                  alt="Bank building illustration"
                  width="100%"
                  height="auto"
                />
              </Box>
            </Grid.Col>
            <Grid.Col
              span={{ base: 12, md: 5 }}
              className="flex flex-col py-8 md:pl-1 md:text-right"
            >
              <Stack className="mx-auto my-auto max-w-xl md:pr-4 md:pl-1 md:text-right">
                {description3 &&
                  description3.length > 0 &&
                  renderRichText(description3, 'text-xl md:text-2xl')}
                {description4 &&
                  description4.length > 0 &&
                  renderRichText(description4, 'md:text-xl')}
              </Stack>
            </Grid.Col>
          </Grid>
        </Box>

        <ContactFormContainer
          title="Start to Bank Green Today"
          tag="index bottom"
          successRedirect="/thanks"
          labels={{ submit: 'Complete Sign Up' }}
          className="bg-arcticBlue"
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

        {/* Smokestack animation */}
        <Stack className="mx-auto aspect-690/340 max-w-[690px] justify-end object-cover object-bottom">
          <MoneySmokeAnimation className="-mb-1 w-full" />
        </Stack>
      </Box>
    </PageContent>
  )
}
