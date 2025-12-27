import { PageContent } from '@components/PageContent'
import { Anchor, Card, Grid, Stack, Text, Title } from '@mantine/core'
import type { PrismicDocument } from '@prismicio/client'
import * as prismic from '@prismicio/client'
import type { Slice } from '@slices'
import { SliceZone } from '@slices'

interface Props {
  page: PrismicDocument | null
  releases: PrismicDocument[]
}

export function PressIndexPage({ page, releases }: Props) {
  const slices = (page?.data?.slices || []) as Slice[]

  const getDescription = (release: PrismicDocument): string => {
    const description = release.data.description
    if (!description) return ''
    return prismic.asText(description) ?? ''
  }

  return (
    <PageContent>
      <Stack className="gap-8">
        {slices ? (
          <SliceZone slices={slices} />
        ) : (
          <Stack className="gap-4 text-center">
            <Title order={1} className="text-gray-900">
              Press
            </Title>
            <Text className="text-gray-700 text-lg">
              For press or media enquiries, please write to{' '}
              <Anchor href="mailto:hello@bank.green">hello@bank.green</Anchor>
            </Text>
          </Stack>
        )}

        {releases.length > 0 ? (
          <Grid gutter="lg">
            {releases.map((release) => {
              const description = getDescription(release)
              const releaseDate = release.data.releasedate as string | undefined

              return (
                <Grid.Col key={release.uid} span={{ base: 12, sm: 6 }}>
                  <Anchor href={`/press/${release.uid}`} underline="never">
                    <Card className="h-full">
                      <Stack className="h-full">
                        {releaseDate && (
                          <Text size="sm" c="dimmed">
                            <time dateTime={releaseDate}>{releaseDate}</time>
                          </Text>
                        )}
                        <Title order={3}>{release.data.title as string}</Title>
                        {description && (
                          <Text size="sm" c="dimmed" lineClamp={3}>
                            {description}
                          </Text>
                        )}
                        <Text size="sm" fw={600} c="var(--color-sushi-600)">
                          Read full release →
                        </Text>
                      </Stack>
                    </Card>
                  </Anchor>
                </Grid.Col>
              )
            })}
          </Grid>
        ) : (
          <Text className="text-center text-gray-500">No press releases available.</Text>
        )}
      </Stack>
    </PageContent>
  )
}
