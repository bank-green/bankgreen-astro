import { PageContent } from '@components/PageContent'
import { Anchor, Card, Grid, Image, Stack, Text, Title } from '@mantine/core'
import type { PrismicDocument } from '@prismicio/client'
import * as prismic from '@prismicio/client'

interface Partner {
  name?: string
  url?: prismic.LinkField
  img?: prismic.ImageField
}

interface Props {
  page: PrismicDocument | null
}

export function PartnersPage({ page }: Props) {
  const title = (page?.data?.title as string) || 'Our Partners'
  const description =
    (page?.data?.description as string) ||
    'Below is a list of our amazing partners, together with whom we are reshaping finance.'
  const partners = (page?.data?.partners || []) as Partner[]

  return (
    <PageContent>
      <Stack className="gap-8">
        <Stack className="gap-4">
          <Title order={1}>{title}</Title>
          <Text className="text-lg">{description}</Text>
        </Stack>

        <Grid gutter="lg">
          {partners.map((partner, index) => {
            const href = prismic.asLink(partner.url)
            const imgSrc = partner.img?.url

            return (
              <Grid.Col key={partner.name || index} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                {href ? (
                  <Anchor href={href} underline="never" target="_blank" rel="noopener noreferrer">
                    <Card variant="color-hover">
                      {imgSrc ? (
                        <Card.Section>
                          <Image
                            src={imgSrc}
                            alt={partner.name || 'Partner logo'}
                            fit="contain"
                            height={150}
                            className="p-4"
                          />
                        </Card.Section>
                      ) : (
                        <Stack className="min-h-[150px] items-center justify-center gap-2">
                          <Text className="text-center font-semibold">{partner.name}</Text>
                        </Stack>
                      )}
                    </Card>
                  </Anchor>
                ) : (
                  <Card shadow="sm" padding="lg" radius="md" withBorder className="h-full">
                    {imgSrc ? (
                      <Card.Section>
                        <Image
                          src={imgSrc}
                          alt={partner.name || 'Partner logo'}
                          fit="contain"
                          height={150}
                          className="p-4"
                        />
                      </Card.Section>
                    ) : (
                      <Stack className="min-h-[150px] items-center justify-center gap-2">
                        <Text className="text-center font-semibold">{partner.name}</Text>
                      </Stack>
                    )}
                  </Card>
                )}
              </Grid.Col>
            )
          })}
        </Grid>

        <Stack className="mt-12 gap-4">{/* Newsletter signup form placeholder */}</Stack>
      </Stack>
    </PageContent>
  )
}
