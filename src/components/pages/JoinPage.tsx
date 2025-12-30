import { PageContent } from '@components/PageContent'
import { Box, List, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import { CheckCircleIcon } from '@phosphor-icons/react'
import type { PrismicDocument, RichTextField } from '@prismicio/client'
import * as prismic from '@prismicio/client'
import { ContactForm } from '@/components/forms/ContactForm'
import { CornerLogoContainer } from '../CornerLogo'

interface Props {
  page: PrismicDocument | null
}

const CHECK_LIST = [
  'Learn about the issues via our blog updates',
  'Join our campaigns to take action against fossil finance',
  'Discover other ways to divest from fossil fuels',
]

export function JoinPage({ page }: Props) {
  const text1 = page?.data?.text1 as RichTextField | undefined
  const text2 = page?.data?.text2 as RichTextField | undefined
  const text3 = page?.data?.text3 as RichTextField | undefined

  const title = text1 ? prismic.asText(text1) : 'Join the Money Movement'
  const boldText = text2
    ? prismic.asText(text2)
    : 'Bank.Green was founded on the belief that banks have had an easy time from their customers for too long'
  const regularText = text3
    ? prismic.asText(text3)
    : ". Mass movements will pull us out of the climate crisis – and they'll pull your bank out, too."

  return (
    <PageContent fullWidth>
      <CornerLogoContainer className="mx-0 mt-8 p-8 pb-16 md:mx-8 lg:mx-0 lg:p-16">
        <Stack className="items-center justify-between gap-12 md:flex-row md:items-start">
          <Stack className="max-w-md gap-6 text-center md:text-left lg:basis-1/2">
            <Title order={2}>{title}</Title>

            <Text>
              <strong>{boldText}</strong>
              {regularText}
            </Text>

            <List
              classNames={{
                root: 'space-y-1 pl-0',
                item: 'md:text-lg',
                itemWrapper: 'items-start',
              }}
              icon={
                <ThemeIcon color="transparent" size={24} radius="xl" className="ml-0 shrink-0 pl-0">
                  <CheckCircleIcon size={24} className="-mb-2 text-green-500" />
                </ThemeIcon>
              }
            >
              {CHECK_LIST.map((item) => (
                <List.Item key={item}>{item}</List.Item>
              ))}
            </List>

            <Title order={3} className="mt-4">
              Sign up to Bank.Green. We'll take the fight to the banks together.
            </Title>
          </Stack>

          <Box className="mx-auto w-full max-w-md">
            <ContactForm
              tag="join form"
              successRedirect="/thanks/join"
              labels={{ submit: 'Join the movement' }}
              fields={{
                firstName: true,
                email: true,
                isAgreeMarketing: true,
                isAgreeTerms: true,
              }}
            />
          </Box>
        </Stack>
      </CornerLogoContainer>
    </PageContent>
  )
}
