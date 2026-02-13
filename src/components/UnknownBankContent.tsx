import { Box, Center, Grid, Image, Stack, Text, Title } from '@mantine/core'
import type { PrismicDocument, RichTextField } from '@prismicio/client'
import * as prismic from '@prismicio/client'
import { CTAChecklist } from './CTAChecklist'
import ContactFormContainer from './forms/ContactFormContainer'

const CHECK_LIST = [
  'Learn about the issues via our blog updates',
  'Join our campaigns to take action against fossil finance',
  'Discover other ways to divest from fossil fuels',
]

interface Props {
  page: PrismicDocument | null
}

export function UnknownBankContent({ page }: Props) {
  const text3 = page?.data?.text3 as RichTextField | undefined
  const text4 = page?.data?.text4 as RichTextField | undefined
  const text5 = page?.data?.text5 as RichTextField | undefined
  const text6 = page?.data?.text6 as RichTextField | undefined

  const text3Str = text3 ? prismic.asText(text3) : ''
  const text4Str = text4 ? prismic.asText(text4) : ''
  const text5Str = text5 ? prismic.asText(text5) : ''
  const text6Str = text6 ? prismic.asText(text6) : ''

  return (
    <>
      <Box data-breakout className="bg-white">
        <Grid className="contain py-24" gutter={32}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image src="/img/illustrations/dig.svg" />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack className="h-full justify-center gap-6 pt-8">
              {text3 && text4 && (
                <Text>
                  <Text span className="font-bold text-lg md:text-2xl">
                    {text3Str}
                  </Text>{' '}
                  <Text span className="text-lg md:text-2xl">
                    {text4Str}
                  </Text>{' '}
                </Text>
              )}
              <Text className="md:text-xl">{text5Str}</Text>
            </Stack>
          </Grid.Col>
        </Grid>
      </Box>

      <Box data-breakout className="swoosh swoosh-tl bg-arcticBlue">
        <Stack className="mb-32 gap-12">
          <Title className="mx-auto">Join the Money Movement</Title>
          <Grid className="contain w-full" gutter={48}>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Center className="h-full">
                <Text span className="text-lg md:text-xl lg:max-w-lg">
                  {text6Str}
                </Text>
              </Center>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <CTAChecklist items={CHECK_LIST} />
            </Grid.Col>
          </Grid>
          <ContactFormContainer
            title="Sign up to Bank.Green. We'll take the fight to the banks together."
            showList={false}
            tag="not listed bottom"
            className="mx-auto w-full"
            labels={{ submit: 'Submit' }}
            fields={{
              firstName: true,
              email: true,
              bank: true,
              subject: false,
              message: false,
              isAgreeMarketing: true,
              isAgreeTerms: true,
            }}
          />
        </Stack>
      </Box>
    </>
  )
}
export default UnknownBankContent
