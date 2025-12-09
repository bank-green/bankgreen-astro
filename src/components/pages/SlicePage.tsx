import { PageContent } from '@components/PageContent'
import type { PrismicDocument } from '@prismicio/client'
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
  const slices = page?.data?.slices

  return (
    <PageContent>
      <article className="prose sm:prose-lg xl:prose-xl mx-auto max-w-4xl xl:max-w-5xl">
        <header>
          <h1>{title}</h1>
        </header>

        {intro}

        <section>{slices ? <SliceZone slices={slices} /> : <p>Content loading...</p>}</section>

        {footer}
      </article>
    </PageContent>
  )
}
