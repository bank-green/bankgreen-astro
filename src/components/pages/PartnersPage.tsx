import { PageContent } from '@components/PageContent'
import type { PrismicDocument } from '@prismicio/client'
import * as prismic from '@prismicio/client'

interface Partner {
  name?: string
  url?: prismic.LinkField
  img?: prismic.ImageField
}

interface Props {
  page: PrismicDocument | null
}

export function PartnersPage({ page }: Props) {
  const title = (page?.data?.title as string) || 'Our Partners'
  const description =
    (page?.data?.description as string) ||
    'Below is a list of our amazing partners, together with whom we are reshaping finance.'
  const partners = (page?.data?.partners || []) as Partner[]

  return (
    <PageContent>
      <article>
        <header>
          <h1>{title}</h1>
          <p>{description}</p>
        </header>

        <section>
          <ul>
            {partners.map((partner, index) => {
              const href = prismic.asLink(partner.url)
              const imgSrc = partner.img?.url

              return (
                <li key={partner.name || index}>
                  {href ? (
                    <a href={href} rel="noopener noreferrer" target="_blank">
                      {imgSrc && (
                        <img src={imgSrc} alt={partner.name || 'Partner logo'} loading="lazy" />
                      )}
                      {!imgSrc && <span>{partner.name}</span>}
                    </a>
                  ) : (
                    <>
                      {imgSrc && (
                        <img src={imgSrc} alt={partner.name || 'Partner logo'} loading="lazy" />
                      )}
                      {!imgSrc && <span>{partner.name}</span>}
                    </>
                  )}
                </li>
              )
            })}
          </ul>
        </section>

        <section>{/* Newsletter signup form placeholder */}</section>
      </article>
    </PageContent>
  )
}
