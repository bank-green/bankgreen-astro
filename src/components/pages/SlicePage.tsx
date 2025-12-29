import { PageContent } from '@components/PageContent'
import { Loader, Stack } from '@mantine/core'
import type { PrismicDocument } from '@prismicio/client'
import type { Slice } from '@slices'
import { SliceZone } from '@slices'
import type { ReactNode } from 'react'

interface Props {
  /** Prismic page document */
  page: PrismicDocument | null
  /** Optional intro content before slices */
  intro?: ReactNode
  /** Optional content after slices */
  footer?: ReactNode
}

/**
 * Generic page component for simple Prismic pages that primarily render slices.
 * Use this for pages like disclaimer, privacy, etc.
 */
export function SlicePage({ page, intro, footer }: Props) {
  const slices = (page?.data?.slices || []) as Slice[]

  return (
    <PageContent>
      <Stack className="contain bg-white p-8 lg:rounded-2xl">
        {intro}

        <section>{slices ? <SliceZone slices={slices} /> : <Loader />}</section>

        {footer}
      </Stack>
    </PageContent>
  )
}
