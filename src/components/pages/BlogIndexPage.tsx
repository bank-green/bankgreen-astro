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
      <div className="page-fade-in contain pb-16">
        <h1 className="mb-4 whitespace-pre-line font-semibold text-2xl">
          Bank.Green Blog: Stories and Tips for Divesting From Fossil Fuels
        </h1>

        {posts.length > 0 ? (
          <div className="-mx-4 mt-6 grid gap-16 pt-10 md:grid-cols-2 md:gap-x-5 md:gap-y-12">
            {posts.map((post) => {
              const imageSrc = getImageSrc(post)
              const description = getDescription(post)
              const publicationDate = post.data.publicationdate as string | undefined

              return (
                <a
                  key={post.uid}
                  href={`/blog/${post.uid}`}
                  className="overflow-hidden rounded-xl border bg-white shadow-soft transition duration-150 ease-in-out hover:border-sushi-500 hover:bg-gray-50"
                >
                  {imageSrc && (
                    <span className="minimal relative inline-block h-52 w-full sm:h-64">
                      <img
                        src={imageSrc}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </span>
                  )}
                  <span className="inline-block p-4">
                    {publicationDate && (
                      <p className="text-gray-500 text-sm">
                        <time dateTime={publicationDate}>{publicationDate}</time>
                      </p>
                    )}
                    <span className="mt-2 block">
                      <p className="font-semibold text-gray-900 text-xl">
                        {post.data.title as string}
                      </p>
                      {description && <p className="mt-3 text-base text-gray-500">{description}</p>}
                    </span>
                    <div className="mt-3">
                      <span className="font-semibold text-base text-sushi-600 hover:text-sushi-500">
                        Read full story
                      </span>
                    </div>
                  </span>
                </a>
              )
            })}
          </div>
        ) : (
          <h3>Error Loading Content.</h3>
        )}
      </div>
    </PageContent>
  )
}
