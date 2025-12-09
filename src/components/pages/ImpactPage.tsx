import { PageContent } from '@components/PageContent'
import { renderRichText } from '@lib/prismicHelpers'
import type { PrismicDocument, RichTextField } from '@prismicio/client'

interface Props {
  page: PrismicDocument | null
}

export function ImpactPage({ page }: Props) {
  const text1 = page?.data?.text1 as RichTextField | undefined
  const text2 = page?.data?.text2 as RichTextField | undefined
  const text3 = page?.data?.text3 as RichTextField | undefined

  return (
    <PageContent>
      <article>
        <header>
          {text1 && text1.length > 0 ? (
            renderRichText(text1)
          ) : (
            <h1>Opened an account with a bank that doesn't finance fossil fuels?</h1>
          )}

          {text2 && text2.length > 0 ? (
            renderRichText(text2)
          ) : (
            <h2>Maximise your impact by letting us know.</h2>
          )}

          {text3 && text3.length > 0 ? (
            renderRichText(text3)
          ) : (
            <p>
              Taking this survey helps advocate for change. Bank.Green uses your response to push
              fossil banks to divest, push sustainable eco banks to improve their customer
              experience, and encourage other people to join you in greening their finances.
            </p>
          )}
        </header>

        <section>{/* Switch survey form will be embedded here */}</section>
      </article>
    </PageContent>
  )
}
