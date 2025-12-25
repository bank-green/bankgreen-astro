import { PageContent } from '@components/PageContent'
import { Stack } from '@mantine/core'
import type { PrismicDocument } from '@prismicio/client'
import type { Slice } from '@slices'
import { SliceZone } from '@slices'

interface Props {
  page: PrismicDocument | null
}

export function VolunteersPage({ page }: Props) {
  const slices = (page?.data?.slices || []) as Slice[]

  return (
    <PageContent>
      <Stack>{slices && <SliceZone slices={slices} />}</Stack>
    </PageContent>
  )
}
