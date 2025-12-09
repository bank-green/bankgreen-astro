import { PageContent } from '@components/PageContent'
import { renderRichText } from '@lib/prismicHelpers'
import type { PrismicDocument, RichTextField } from '@prismicio/client'
import { SliceZone } from '@slices'

interface Props {
  page: PrismicDocument | null
}

export function FaqPage({ page }: Props) {
  const introduction = page?.data?.introduction as RichTextField | undefined
  const slices = page?.data?.slices

  return (
    <PageContent>
      <article>
        <header className="prose">
          {introduction && introduction.length > 0 ? (
            renderRichText(introduction)
          ) : (
            <h1>Frequently Asked Questions</h1>
          )}
        </header>

        <section className="prose sm:prose-lg xl:prose-xl mx-auto max-w-4xl xl:max-w-5xl mb-10">
          {slices ? <SliceZone slices={slices} /> : <p>Error loading content.</p>}
        </section>

        <section>
          <h2>Take Action with Bank.Green</h2>
          {/* Newsletter signup form placeholder */}
        </section>
      </article>
    </PageContent>
  )
}
