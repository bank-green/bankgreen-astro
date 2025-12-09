import { PageContent } from '@components/PageContent'
import type { PrismicDocument } from '@prismicio/client'
import { SliceZone } from '@slices'

interface Props {
  release: PrismicDocument
}

export function PressReleasePage({ release }: Props) {
  const title = (release.data.title as string) || 'Press Release'
  const author = release.data.author as string | undefined
  const email = release.data.email as string | undefined
  const phone = release.data.phone as string | undefined
  const releaseDate = release.data.releasedate as string | undefined
  const slices = release.data.slices

  return (
    <PageContent>
      <article>
        <header>
          <h1>{title}</h1>

          <div>
            {(author || email || phone) && (
              <div>
                <p>Contact</p>
                {author && <p>{author}</p>}
                {email && (
                  <p>
                    <a href={`mailto:${email}`}>{email}</a>
                  </p>
                )}
                {phone && <p>{phone}</p>}
              </div>
            )}

            {releaseDate && (
              <div>
                <p>For immediate release</p>
                <p>{releaseDate}</p>
              </div>
            )}
          </div>
        </header>

        <section>{slices && <SliceZone slices={slices} />}</section>

        <footer>
          <h2>About Bank.Green</h2>
          <p>
            Contact: <a href="mailto:hello@bank.green">hello@bank.green</a>
          </p>
        </footer>
      </article>
    </PageContent>
  )
}
