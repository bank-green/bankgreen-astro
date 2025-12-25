import { ATMAnimation, MoneySmokeAnimation } from '@components/animations'
import BankLocationSearch from '@components/forms/BankLocationSearch'
import { Swoosh } from '@components/Swoosh'
import { renderRichText } from '@lib/prismicHelpers'
import {
  Anchor,
  Box,
  Grid,
  Group,
  List,
  MantineProvider,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core'
import { CheckIcon } from '@phosphor-icons/react'
import type { PrismicDocument, RichTextField } from '@prismicio/client'
import type { Slice } from '@slices'
import { SliceZone } from '@slices'
import theme from '@styles/theme'
import cx from 'clsx'
import type { Bank } from '../../lib/banks'
import ArrowDown from '../animations/ArrowDown'

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
    <MantineProvider theme={theme}>
      {/* Hero section with green gradient background - breaks out of container */}
      <Box data-breakout className="bg-linear-to-b from-sushi-100 to-sushi-200">
        <Group className="mx-auto max-w-6xl items-end justify-between gap-12 px-6 pt-20 pb-12 md:px-0 lg:gap-0 lg:pb-18">
          <Title
            order={1}
            className="mx-auto block max-w-3xl bg-linear-to-tr from-sky-800 to-sky-500 bg-clip-text text-center text-transparent sm:text-5xl lg:max-w-1/2 lg:pr-6 lg:text-left"
          >
            {title}
          </Title>
          <Box className="mx-auto flex w-full max-w-lg grow justify-start lg:max-w-1/2">
            <BankLocationSearch onBankSelect={handleBankSelect} />
          </Box>
        </Group>

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
                <Stack className="items-center gap-0">
                  <Anchor
                    href="https://www.banktrack.org/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <img
                      src="/img/logos/banktrack.svg"
                      alt="BankTrack"
                      className="-mb-1 h-18 rounded-xl bg-white p-6 mix-blend-luminosity grayscale"
                    />
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
            <Group className="mx-auto items-center gap-1 text-4xl text-gray-700 leading-4 lg:mt-16">
              Why{' '}
              <img
                className="mt-2 ml-2 inline-block h-10 px-0.5"
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
        <Grid className="mx-auto flex max-w-6xl flex-col items-center justify-center px-12 py-16 md:flex-row lg:px-0">
          <Grid.Col span={{ base: 12, md: 6 }} className="flex flex-col">
            <Stack className="my-auto md:pr-12">
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
          <Grid className="z-10 mx-auto max-w-6xl items-center justify-center px-12 pt-8 pb-4 md:pb-16 lg:px-0">
            {/* Bank illustration - on left for desktop */}
            <Grid.Col span={{ base: 12, md: 7 }} className="md:w-5/8 md:pr-8">
              <Box className="mx-auto h-auto w-full max-w-xl">
                <img
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
              <Stack className="my-auto md:pl-1 md:text-right">
                {description3 &&
                  description3.length > 0 &&
                  renderRichText(description3, 'text-xl md:text-2xl')}
                {description4 &&
                  description4.length > 0 &&
                  renderRichText(description4, 'md:text-xl')}
              </Stack>
            </Grid.Col>
          </Grid>

          {/* Lead gen form section - dark blue card */}
          <Box id="join" className="mx-auto max-w-6xl px-6 pb-8 lg:px-0">
            <Paper className="rounded-2xl bg-primaryDark p-8 text-white md:p-12">
              <Grid gutter={0}>
                {/* Left side - title and benefits */}
                <Grid.Col span={{ base: 12, md: 6 }} className="pb-12">
                  <Title order={2} className="mb-6 text-2xl text-textInverse md:text-3xl">
                    Start to Bank Green Today
                  </Title>
                  <List
                    spacing="sm"
                    className="space-y-3 pl-0"
                    icon={
                      <ThemeIcon
                        color="transparent"
                        size={20}
                        radius="xl"
                        className="ml-0 shrink-0"
                      >
                        <CheckIcon size={20} weight="bold" className="-mb-2 text-green-500" />
                      </ThemeIcon>
                    }
                  >
                    <List.Item>
                      <Text component="span">Learn how to take action on fossil fuel finance.</Text>
                    </List.Item>
                    <List.Item>
                      <Text component="span">
                        Discover green banking and how easy it is to switch.
                      </Text>
                    </List.Item>
                    <List.Item>
                      <Text component="span">Stay up to date with climate finance news.</Text>
                    </List.Item>
                  </List>
                </Grid.Col>

                {/* Right side - form placeholder */}
                <Grid.Col
                  span={{ base: 12, md: 6 }}
                  className="h-full min-h-48 items-center justify-center rounded-xl bg-white/10 p-6"
                >
                  <Text className="text-white/60">[Lead Gen Form]</Text>
                </Grid.Col>
              </Grid>
            </Paper>
          </Box>
        </Box>

        {/* Smokestack animation */}
        <Stack className="mx-auto aspect-690/340 max-w-[690px] justify-end object-cover object-bottom">
          <MoneySmokeAnimation className="-mb-1 w-full" />
        </Stack>
      </Box>
    </MantineProvider>
  )
}
