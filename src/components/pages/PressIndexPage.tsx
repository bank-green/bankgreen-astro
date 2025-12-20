import { PageContent } from '@components/PageContent'
import type { PrismicDocument } from '@prismicio/client'
import * as prismic from '@prismicio/client'
import type { Slice } from '@slices'
import { SliceZone } from '@slices'

interface Props {
  page: PrismicDocument | null
  releases: PrismicDocument[]
}

export function PressIndexPage({ page, releases }: Props) {
  const slices = (page?.data?.slices || []) as Slice[]

  const getDescription = (release: PrismicDocument): string => {
    const description = release.data.description
    if (!description) return ''
    return prismic.asText(description)
  }

  return (
    <PageContent>
      <article>
        {slices ? (
          <header>
            <SliceZone slices={slices} />
          </header>
        ) : (
          <header>
            <h1>Press</h1>
            <p>
              For press or media enquiries, please write to{' '}
              <a href="mailto:hello@bank.green">hello@bank.green</a>
            </p>
          </header>
        )}

        <section>
          {releases.length > 0 ? (
            <ul>
              {releases.map((release) => {
                const description = getDescription(release)
                const releaseDate = release.data.releasedate as string | undefined

                return (
                  <li key={release.uid}>
                    <article>
                      {releaseDate && <time dateTime={releaseDate}>{releaseDate}</time>}
                      <h2>
                        <a href={`/press/${release.uid}`}>{release.data.title as string}</a>
                      </h2>
                      {description && <p>{description}</p>}
                    </article>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p>No press releases available.</p>
          )}
        </section>
      </article>
    </PageContent>
  )
}
