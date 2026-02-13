import { PageContent } from '@components/PageContent'
import { Anchor, Box, Group, Stack, Text } from '@mantine/core'
import type { PrismicDocument } from '@prismicio/client'
import type { Slice } from '@slices'
import { SliceZone } from '@slices'
import Article from '../Article'

interface Props {
  release: PrismicDocument
}

export function PressReleasePage({ release }: Props) {
  const title = (release.data.title as string) || 'Press Release'
  const author = release.data.author as string | undefined
  const email = release.data.email as string | undefined
  const phone = release.data.phone as string | undefined
  const releaseDate = release.data.releasedate as string | undefined
  const slices = (release.data.slices || []) as Slice[]

  return (
    <PageContent fullWidth>
      <Article title={title}>
        <Group className="mx-auto mb-12 w-fit items-start justify-between gap-12">
          {(author || email || phone) && (
            <Stack className="gap-0 text-center *:text-sm">
              <Text className="font-semibold uppercase">Contact</Text>
              {author && <Text>{author}</Text>}
              {email && (
                <Text>
                  <Anchor href={`mailto:${email}`} className="text-sm">
                    {email}
                  </Anchor>
                </Text>
              )}
              {phone && <Text>{phone}</Text>}
            </Stack>
          )}

          {releaseDate && (
            <Stack className="gap-0 text-center *:text-sm">
              <Text className="font-semibold uppercase">For immediate release</Text>
              <Text>{releaseDate}</Text>
            </Stack>
          )}
        </Group>

        <Box className="w-full max-w-3xl">{slices && <SliceZone slices={slices} />}</Box>
      </Article>
    </PageContent>
  )
}
