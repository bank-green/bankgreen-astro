import { PageContent } from '@components/PageContent'
import { asImageSrc, renderRichText } from '@lib/prismicHelpers'
import { Box, Button, Card, Group, Image, Stack, Tabs, Text, Title } from '@mantine/core'
import { CheckCircleIcon } from '@phosphor-icons/react'
import type { ImageField, PrismicDocument } from '@prismicio/client'
import type { Slice } from '@slices'
import { SliceZone } from '@slices'
import { useState } from 'react'

interface SustainableBullet {
  description: string
  icon?: ImageField
}

interface MethodologyPageProps {
  page: PrismicDocument | null
}

export function MethodologyPage({ page }: MethodologyPageProps) {
  const [activeTab, setActiveTab] = useState<string | null>('lending')

  if (!page) {
    return (
      <PageContent>
        <Stack className="min-h-screen items-center justify-center pt-36">
          <Text className="text-center">Content not available</Text>
        </Stack>
      </PageContent>
    )
  }

  const {
    hero_title,
    hero_description,
    hero_image,
    target_title,
    target_description,
    target_image,
    factors_title,
    lending_tab_name,
    emissions_tab_name,
    policy_tab_name,
    slices2,
    slices3,
    slices4,
    sustainable_title,
    sustainable_description,
    sustainable_bullets,
    sustainable_call_out_image,
    sustainable_call_out,
    sources_title,
    sources_description,
    sources_image,
    questions_title,
    questions_description,
    questions_button_title,
  } = page.data

  return (
    <PageContent fullWidth>
      {/* Hero Section */}
      <Box data-breakout className="swoosh swoosh-br">
        <Stack className="contain mx-auto max-w-3xl gap-10 pt-16">
          <Title order={1}>{hero_title || 'How We Rate Banks'}</Title>
          <Box className="">
            {hero_description && <Box>{renderRichText(hero_description)}</Box>}
          </Box>
          {hero_image && (
            <Image
              src={asImageSrc(hero_image as ImageField) || undefined}
              alt={(hero_image as ImageField).alt || ''}
              className="h-full w-full max-w-3xl rounded-3xl bg-white object-contain object-top"
            />
          )}
        </Stack>
      </Box>

      {/* Target Section */}
      <Box data-breakout className="bg-white">
        <Stack id="target" className="contain mx-auto flex max-w-6xl flex-col gap-8 py-16">
          <Title order={2}>
            {target_title ||
              'Our Rating Methodology Caters for Different Types of Financial Institutions'}
          </Title>
          <Group className="flex-col items-center gap-6 lg:flex-row lg:flex-nowrap">
            <Box>
              {target_description ? (
                renderRichText(target_description)
              ) : (
                <Text>
                  The methodology has been designed in such a way so as to accommodate unique
                  circumstances of banks (large and small), credit unions and building societies. We
                  also take into account memberships of climate organizations (e.g., Global Alliance
                  on Banking Values) and certifications (e.g., B Corp certification).
                  <br />
                  If a bank, or a bank-like institution, provides services to its customers or for
                  its own banking needs via a banking partner that we have rated <b>Worst</b> or{' '}
                  <b>Bad</b>, it will negatively impact the primary bank's rating.
                </Text>
              )}
            </Box>
            {target_image && (
              <Image
                src={asImageSrc(target_image as ImageField) || undefined}
                alt={(target_image as ImageField).alt || ''}
                className="h-full w-full max-w-lg object-contain object-top"
              />
            )}
          </Group>
        </Stack>
      </Box>

      {/* Factors Section with Tabs */}
      <Box data-breakout className="swoosh swoosh-tl bg-blue-100">
        <Stack className="contain gap-8 py-12">
          <Title order={2}>{factors_title || "What Factors Affect a Bank's Rating?"}</Title>

          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.List>
              <Tabs.Tab value="lending">{lending_tab_name || 'Lending'}</Tabs.Tab>
              <Tabs.Tab value="emissions">{emissions_tab_name || 'Emissions'}</Tabs.Tab>
              <Tabs.Tab value="policy">{policy_tab_name || 'Policy'}</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="lending">
              <SliceZone slices={(slices2 ?? []) as Slice[]} />
            </Tabs.Panel>
            <Tabs.Panel value="emissions">
              <SliceZone slices={(slices3 ?? []) as Slice[]} />
            </Tabs.Panel>
            <Tabs.Panel value="policy">
              <SliceZone slices={(slices4 ?? []) as Slice[]} />
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Box>

      {/* Sustainable Banks Section */}
      <Box
        data-breakout
        className="swoosh swoosh-tr max-w-screen [--swoosh-color:var(--color-blue-100)]"
      >
        <Stack className="contain mx-auto flex max-w-6xl flex-col items-center justify-center gap-10 pb-8">
          <Title order={2}>{sustainable_title || 'Sustainable Banks'}</Title>
          {sustainable_description && <Box>{renderRichText(sustainable_description)}</Box>}
          {sustainable_bullets && (
            <Group className="flex-col gap-4 md:flex-row">
              {(sustainable_bullets as SustainableBullet[]).map(
                (bullet: SustainableBullet, index: number) => (
                  <Card
                    key={`${bullet.description}-${index}`}
                    className="h-48 w-full max-w-sm flex-1 grow items-start gap-4 rounded-lg p-8 shadow-md"
                  >
                    <CheckCircleIcon size={32} className="text-green-500" />
                    <Text>{bullet.description}</Text>
                  </Card>
                )
              )}
            </Group>
          )}
          <Group className="w-full flex-col items-center gap-8 md:flex-row">
            {sustainable_call_out_image && (
              <Image
                src={asImageSrc(sustainable_call_out_image as ImageField) || undefined}
                alt={(sustainable_call_out_image as ImageField).alt || ''}
                className="h-full w-full max-w-xs object-contain object-top"
              />
            )}
            {sustainable_call_out && (
              <Box className="h-full flex-1 items-start rounded-lg bg-sushi-600 p-8 text-white">
                {renderRichText(sustainable_call_out)}
              </Box>
            )}
          </Group>
        </Stack>
      </Box>

      {/* Sources Section */}
      <Box
        data-breakout
        className="swoosh swoosh-tl bg-white [--swoosh-color:var(--color-sushi-100)]"
      >
        <Stack id="sources" className="contain gap-12 py-8">
          <Title order={2}>{sources_title || 'Data sources we use'}</Title>
          {sources_description && <Box>{renderRichText(sources_description)}</Box>}
        </Stack>

        {sources_image && (
          <Image
            src={asImageSrc(sources_image as ImageField) || undefined}
            alt={(sources_image as ImageField).alt || ''}
            className="h-full w-full object-contain object-top"
          />
        )}
      </Box>

      {/* Questions Section */}
      <Box data-breakout className="bg-sky-800 text-textInverse">
        <Stack className="contain items-center gap-6 py-10 lg:py-16">
          <Title order={2}>{questions_title || 'Still have questions?'}</Title>
          {questions_description && <Box>{renderRichText(questions_description)}</Box>}
          <Button
            component="a"
            href="/contact"
            className="w-full max-w-xs"
            variant="filled"
            size="lg"
          >
            {questions_button_title || 'Contact us'}
          </Button>
        </Stack>
      </Box>
    </PageContent>
  )
}
