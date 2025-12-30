import { PageContent } from '@components/PageContent'
import { Box, Stack, Title } from '@mantine/core'
import type { PrismicDocument } from '@prismicio/client'
import type { Slice } from '@slices'
import { SliceZone } from '@slices'

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
    <PageContent>
      <Stack className="mx-auto mb-16">
        <Title order={1}>{title}</Title>
        <Title order={4}>
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
        </Title>
      </Stack>
      <Stack className="[&_h2]:text-2xl">{slices && <SliceZone slices={slices} />}</Stack>

      {/* Footer section with call to action */}
      <Box className="bg-arctic-blue text-gray-800">
        <Box className="contain">
          <Stack className="items-center">
            {/* Call to action component will go here */}
            <Box className="max-w-5xl">
              <Title order={2}>Start to Bank Green Today</Title>
            </Box>
          </Stack>
        </Box>
      </Box>
    </PageContent>
  )
}
