import { PageContent } from '@components/PageContent'
import { renderRichText } from '@lib/prismicHelpers'
import { Anchor, Center, Divider, Group, Stack, Text, Title } from '@mantine/core'
import type { PrismicDocument, RichTextField } from '@prismicio/client'
import { SliceZone } from '@slices'

interface Props {
  page: PrismicDocument | null
}

export function HomePage({ page }: Props) {
  const title = (page?.data?.title as string) || 'Is your money being used to fund climate chaos?'
  const slices1 = page?.data?.slices1 as Array<{ slice_type: string; [key: string]: unknown }> // "As featured in" logos
  const description1 = page?.data?.description1 as RichTextField | undefined
  const description2 = page?.data?.description2 as RichTextField | undefined
  const description3 = page?.data?.description3 as RichTextField | undefined
  const description4 = page?.data?.description4 as RichTextField | undefined

  return (
    <PageContent>
      <Stack className="items-center gap-12">
        <Title order={1}>{title}</Title>

        <Center className="h-48 w-96 bg-green-300">
          <Stack>
            <Text>Check if your bank is funding fossil fuels</Text>
            <Text>[FORM]</Text>
          </Stack>
        </Center>

        <Divider className="mx-auto w-full max-w-4xl" />
        <Stack className="w-full items-center justify-between rounded-xl px-8 py-8 lg:flex-row lg:gap-36 lg:px-24">
          <Title order={5}>As featured in</Title>
          <Stack className="grow items-center justify-between gap-4 opacity-70 bg-blend-multiply grayscale lg:flex-row">
            {slices1 && <SliceZone slices={slices1} />}
          </Stack>
        </Stack>

        <Stack className="items-center">
          <Group className="items-start gap-2">
            <Title order={5}>In association with</Title>
            <Anchor href="https://www.banktrack.org/" rel="noopener noreferrer" target="_blank">
              <img src="/img/logos/banktrack.svg" alt="BankTrack" className="w-36" />
            </Anchor>
          </Group>
          <Anchor href="/partners">See our partners</Anchor>
        </Stack>

        {/* Why Bank.Green section */}
        <section>
          <Title order={2}>Why Bank.Green?</Title>
          {description1 && description1.length > 0 ? (
            renderRichText(description1)
          ) : (
            <Text>
              The fight for a habitable planet is the fight for our lives. But while we look at ways
              to make our lives more sustainable, most of us are also funding environmental
              catastrophe.
            </Text>
          )}
          {description2 && description2.length > 0 ? (
            renderRichText(description2)
          ) : (
            <Text>
              During the 7 years following the Paris Agreement, the world's top 60 private-sector
              banks pumped $5.5 trillion into fossil fuels.
            </Text>
          )}
        </section>

        {/* Call to action section */}
        <section>
          {description3 && description3.length > 0 ? (
            renderRichText(description3)
          ) : (
            <Text>
              We have the power to change our banking system because it will not change itself. Mass
              pressure from customers will force our banks to defund fossil fuels.
            </Text>
          )}
          {description4 && description4.length > 0 ? (
            renderRichText(description4)
          ) : (
            <Text>
              Bank.Green and our partners are leading a global reckoning with the world's most
              powerful driver of environmental destruction. But we need your help.
            </Text>
          )}
        </section>

        {/* Lead gen form section */}
        <section>
          <Title order={2}>Start to Bank Green today</Title>
          {/* LeadGen form - will be a separate component */}
        </section>
      </Stack>
    </PageContent>
  )
}
