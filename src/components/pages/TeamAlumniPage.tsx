import { PageContent } from '@components/PageContent'
import { Anchor, SimpleGrid, Stack, Title } from '@mantine/core'
import type { PrismicDocument } from '@prismicio/client'
import { SliceZone } from '@slices'

interface Props {
  page: PrismicDocument | null
}

export function TeamAlumniPage({ page }: Props) {
  // Filter slices1 for Alumni department members
  const alumniSlices =
    page?.data?.slices1?.filter(
      (slice: { primary?: { department?: string } }) => slice.primary?.department === 'Alumni'
    ) || []

  return (
    <PageContent>
      <Stack className="gap-12">
        <Title order={1}>Our Alumni Members</Title>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {alumniSlices.length > 0 ? (
            <SliceZone slices={alumniSlices} />
          ) : (
            <p>No alumni members to display.</p>
          )}
        </SimpleGrid>

        <Anchor href="/team">Back to Current Contributors</Anchor>
      </Stack>
    </PageContent>
  )
}
