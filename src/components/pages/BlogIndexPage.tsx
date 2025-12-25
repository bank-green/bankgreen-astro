import { PageContent } from '@components/PageContent'
import { Anchor, Card, Grid, Image, Stack, Text, Title } from '@mantine/core'
import type { PrismicDocument } from '@prismicio/client'
import * as prismic from '@prismicio/client'

interface Props {
  posts: PrismicDocument[]
}

export function BlogIndexPage({ posts }: Props) {
  const getImageSrc = (post: PrismicDocument): string => {
    // Try cardimage first
    if (post.data.cardimage?.url) {
      return post.data.cardimage.url
    }
    // Fall back to first image slice
    const imageSlice = post.data.slices?.find(
      (s: { slice_type: string }) => s.slice_type === 'image_slice'
    )
    return imageSlice?.primary?.image?.url || ''
  }

  const getDescription = (post: PrismicDocument): string => {
    const description = post.data.description
    if (!description) return ''
    return prismic.asText(description) ?? ''
  }

  return (
    <PageContent>
      <Stack className="mb-8 gap-0">
        <Title order={1} className="mb-0">
          Bank.Green Blog:
        </Title>
        <Title order={3}>Stories and Tips for Divesting From Fossil Fuels</Title>
      </Stack>

      {posts.length > 0 ? (
        <Grid gutter="lg">
          {posts.map((post) => {
            const imageSrc = getImageSrc(post)
            const description = getDescription(post)
            const publicationDate = post.data.publicationdate as string | undefined

            return (
              <Grid.Col key={post.uid} span={{ base: 12, sm: 6 }}>
                <Anchor href={`/blog/${post.uid}`} underline="never">
                  <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
                    {imageSrc && (
                      <Card.Section>
                        <Image src={imageSrc} alt="" loading="lazy" height={250} fit="cover" />
                      </Card.Section>
                    )}
                    <Stack gap="sm" pt="md">
                      {publicationDate && (
                        <Text size="sm" c="dimmed">
                          <time dateTime={publicationDate}>{publicationDate}</time>
                        </Text>
                      )}
                      <Title order={3}>{post.data.title as string}</Title>
                      {description && (
                        <Text size="sm" c="dimmed" lineClamp={3}>
                          {description}
                        </Text>
                      )}
                      <Text size="sm" fw={600} c="var(--color-sushi-600)">
                        Read full story →
                      </Text>
                    </Stack>
                  </Card>
                </Anchor>
              </Grid.Col>
            )
          })}
        </Grid>
      ) : (
        <Title order={3}>Error Loading Content.</Title>
      )}
    </PageContent>
  )
}
