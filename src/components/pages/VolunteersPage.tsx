import { PageContent } from '@components/PageContent'
import { Stack } from '@mantine/core'
import type { PrismicDocument } from '@prismicio/client'
import type { Slice } from '@slices'
import { SliceZone } from '@slices'
import Article from '../Article'

interface Props {
  page: PrismicDocument | null
}

export function VolunteersPage({ page }: Props) {
  const slices = (page?.data?.slices || []) as Slice[]

  return (
    <PageContent fullWidth>
      <Article>
        <Stack>{slices && <SliceZone slices={slices} />}</Stack>
      </Article>
    </PageContent>
  )
}
