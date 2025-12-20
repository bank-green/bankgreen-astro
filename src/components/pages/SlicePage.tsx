import { PageContent } from '@components/PageContent'
import { Loader, Stack, Title } from '@mantine/core'
import type { PrismicDocument } from '@prismicio/client'
import type { Slice } from '@slices'
import { SliceZone } from '@slices'
import type { ReactNode } from 'react'

interface Props {
  /** Page title */
  title: string
  /** Prismic page document */
  page: PrismicDocument | null
  /** Optional intro content before slices */
  intro?: ReactNode
  /** Optional content after slices */
  footer?: ReactNode
}

/**
 * Generic page component for simple Prismic pages that primarily render slices.
 * Use this for pages like disclaimer, privacy, methodology, etc.
 */
export function SlicePage({ title, page, intro, footer }: Props) {
  const slices = (page?.data?.slices || []) as Slice[]

  return (
    <PageContent>
      <Stack className="prose sm:prose-lg xl:prose-xl mx-auto max-w-6xl xl:max-w-7xl">
        <Title order={1}>{title}</Title>

        {intro}

        <section>{slices ? <SliceZone slices={slices} /> : <Loader />}</section>

        {footer}
      </Stack>
    </PageContent>
  )
}
