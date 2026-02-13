import { PageContent } from '@components/PageContent'
import { Box, Button, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import type { PrismicDocument } from '@prismicio/client'
import type { Slice } from '@slices'
import { SliceZone } from '@slices'
import Article from '../Article'
import { CTAChecklist } from '../CTAChecklist'

interface Props {
  post: PrismicDocument
}

export function BlogPostPage({ post }: Props) {
  const title = (post.data.title as string) || 'Blog Post'
  const author = post.data.author as string | undefined
  const slices = (post.data.slices || []) as Slice[]

  const publishedDate = post.first_publication_date
    ? new Date(post.first_publication_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  const modifiedDate = post.last_publication_date
    ? new Date(post.last_publication_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  const isUpdated = post.first_publication_date !== post.last_publication_date

  return (
    <PageContent fullWidth>
      <Article title={title}>
        <Stack className="mx-auto mb-16">
          <Text className="text-center text-sm uppercase">
            {isUpdated && modifiedDate ? (
              <>
                Updated {modifiedDate}
                {author && ` by ${author}`}
              </>
            ) : (
              publishedDate && (
                <>
                  Posted {publishedDate}
                  {author && ` by ${author}`}
                </>
              )
            )}
          </Text>
        </Stack>
        <Stack className="[&_h2]:text-2xl">{slices && <SliceZone slices={slices} />}</Stack>
      </Article>

      {/* Footer section with call to action */}
      <Box
        data-breakout
        className="swoosh swoosh-tr bg-linear-to-b from-white via-white to-arcticBlue pb-16 text-center [--swoosh-color:var(--color-sushi-100)]"
      >
        <Box data-container>
          {/* Call to action */}
          <Stack className="mx-auto p-8 md:rounded-2xl md:pb-16">
            <Title order={2}>Start to Bank Green Today</Title>
            <SimpleGrid cols={{ md: 2 }} className="gap-4 rounded-xl p-8 md:gap-16">
              <Stack className="text-left text-xl md:p-8 md:text-2xl">
                <b>Banks live and die on their reputations.</b> Mass movements of money to
                fossil-free competitors puts those reputations at grave risk. By moving your money
                to a sustainable financial institution, you will:
              </Stack>
              <Stack>
                <CTAChecklist
                  items={[
                    'Send a message to your bank that it must defund fossil fuels',
                    'Join a fast-growing movement of consumers standing up for their future',
                    'Take a critical climate action with profound effects',
                  ]}
                />
              </Stack>
            </SimpleGrid>
            <Button
              component="a"
              className="mx-auto max-w-fit"
              size="lg"
              href="/sustainable-eco-banks"
            >
              Move Your Money Today
            </Button>
          </Stack>
        </Box>
      </Box>
    </PageContent>
  )
}
