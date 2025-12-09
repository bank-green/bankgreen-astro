import { PageContent } from '@components/PageContent'
import type { PrismicDocument } from '@prismicio/client'
import * as prismic from '@prismicio/client'

interface Props {
  posts: PrismicDocument[]
}

export function BlogIndexPage({ posts }: Props) {
  const getImageSrc = (post: PrismicDocument): string => {
    // Try cardimage first
    if (post.data.cardimage?.url) {
      return post.data.cardimage.url
    }
    // Fall back to first image slice
    const imageSlice = post.data.slices?.find(
      (s: { slice_type: string }) => s.slice_type === 'image_slice'
    )
    return imageSlice?.primary?.image?.url || ''
  }

  const getDescription = (post: PrismicDocument): string => {
    const description = post.data.description
    if (!description) return ''
    return prismic.asText(description) ?? ''
  }

  return (
    <PageContent>
      <article>
        <header>
          <h1>Bank.Green Blog: Stories and Tips for Divesting From Fossil Fuels</h1>
        </header>

        <section>
          {posts.length > 0 ? (
            <ul>
              {posts.map((post) => {
                const imageSrc = getImageSrc(post)
                const description = getDescription(post)
                const publicationDate = post.data.publicationdate as string | undefined

                return (
                  <li key={post.uid}>
                    <article>
                      {imageSrc && <img src={imageSrc} alt="" loading="lazy" />}
                      {publicationDate && <time dateTime={publicationDate}>{publicationDate}</time>}
                      <h2>
                        <a href={`/blog/${post.uid}`}>{post.data.title as string}</a>
                      </h2>
                      {description && <p>{description}</p>}
                      <a href={`/blog/${post.uid}`}>Read full story</a>
                    </article>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p>No blog posts available.</p>
          )}
        </section>
      </article>
    </PageContent>
  )
}
