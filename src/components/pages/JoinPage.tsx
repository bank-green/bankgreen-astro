import { PageContent } from '@components/PageContent'
import type { PrismicDocument, RichTextField } from '@prismicio/client'
import * as prismic from '@prismicio/client'

interface Props {
  page: PrismicDocument | null
}

const CHECK_LIST = [
  'Learn about the issues via our blog updates',
  'Join our campaigns to take action against fossil finance',
  'Discover other ways to divest from fossil fuels',
]

export function JoinPage({ page }: Props) {
  const text1 = page?.data?.text1 as RichTextField | undefined
  const text2 = page?.data?.text2 as RichTextField | undefined
  const text3 = page?.data?.text3 as RichTextField | undefined

  const title = text1 ? prismic.asText(text1) : 'Join the Money Movement'
  const boldText = text2
    ? prismic.asText(text2)
    : 'Bank.Green was founded on the belief that banks have had an easy time from their customers for too long'
  const regularText = text3
    ? prismic.asText(text3)
    : ". Mass movements will pull us out of the climate crisis – and they'll pull your bank out, too."

  return (
    <PageContent>
      <article>
        <header>
          <h2>{title}</h2>
        </header>

        <section>
          <p>
            <strong>{boldText}</strong>
            {regularText}
          </p>

          <ul>
            {CHECK_LIST.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3>Sign up to Bank.Green. We'll take the fight to the banks together.</h3>
          {/* Newsletter signup form placeholder */}
        </section>
      </article>
    </PageContent>
  )
}
