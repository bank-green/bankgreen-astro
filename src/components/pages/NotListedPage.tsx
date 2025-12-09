import { PageContent } from '@components/PageContent'
import { renderRichText } from '@lib/prismicHelpers'
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

export function NotListedPage({ page }: Props) {
  const text1 = page?.data?.text1 as RichTextField | undefined
  const text2 = page?.data?.text2 as RichTextField | undefined
  const text3 = page?.data?.text3 as RichTextField | undefined
  const text4 = page?.data?.text4 as RichTextField | undefined
  const text5 = page?.data?.text5 as RichTextField | undefined
  const text6 = page?.data?.text6 as RichTextField | undefined

  const text3Str = text3 ? prismic.asText(text3) : ''
  const text4Str = text4 ? prismic.asText(text4) : ''

  return (
    <PageContent>
      <article>
        <header>
          {text1 && text1.length > 0 ? (
            renderRichText(text1)
          ) : (
            <h1>Sorry, we haven't listed your bank yet.</h1>
          )}

          {text2 && text2.length > 0 ? (
            renderRichText(text2)
          ) : (
            <p>
              We're working hard to increase the number of banks we provide data on. If you{' '}
              <a href="/contact">tell us your bank's name</a>, we'll try to include it as soon as
              possible. In the meantime, we encourage you to consider contacting your bank to ask
              them whether they fund fossil fuels. But that's not all you can do. To take further
              positive action, keep on scrolling…
            </p>
          )}
        </header>

        <section>
          {text3 && text4 ? (
            <p>
              <strong>{text3Str}</strong> {text4Str}
            </p>
          ) : (
            <p>
              <strong>
                Bank.Green was founded on the belief that banks have had an easy time from their
                customers for too long
              </strong>
              . Mass movements will pull us out of the climate crisis – and they'll pull your bank
              out, too.
            </p>
          )}

          {text5 && text5.length > 0 ? (
            renderRichText(text5)
          ) : (
            <p>
              Our mission is to encourage as many people as possible to take a stand - to refuse to
              let their money fuel environmental destruction any longer. Considering who you bank
              with, we think you probably agree. This is your chance to spread the word with us.
            </p>
          )}
        </section>

        <section>
          {text6 && text6.length > 0 ? (
            renderRichText(text6)
          ) : (
            <p>
              We can't say it better than environmentalist Bill McKibben: "Money is the oxygen on
              which the fire of global warming burns." But don't wait for the fire department to
              turn up – join us!
            </p>
          )}

          <ul>
            {CHECK_LIST.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>{/* Submit bank form placeholder */}</section>
      </article>
    </PageContent>
  )
}
