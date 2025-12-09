import { PageContent } from '@components/PageContent'
import type { PrismicDocument } from '@prismicio/client'
import { SliceZone } from '@slices'

interface ThanksPageFallback {
  title: string
  description?: string
}

interface Props {
  page: PrismicDocument | null
  fallback: ThanksPageFallback
  pageType: string
}

export function ThanksPage({ page, fallback, pageType }: Props) {
  const slices = page?.data?.slices
  const showExplore = pageType !== 'donate-cancelled' && pageType !== 'updates-no'

  return (
    <PageContent>
      <article>
        {slices ? (
          <section>
            <SliceZone slices={slices} />
          </section>
        ) : (
          <section>
            <h1>{fallback.title}</h1>
            {fallback.description && <p>{fallback.description}</p>}
          </section>
        )}

        {showExplore && (
          <section>
            <h2>Explore More</h2>
            <ul>
              <li>
                <a href="/sustainable-eco-banks">Find a sustainable bank</a>
              </li>
              <li>
                <a href="/blog">Read our blog</a>
              </li>
              <li>
                <a href="/take-action">Take action</a>
              </li>
            </ul>
          </section>
        )}
      </article>
    </PageContent>
  )
}
