import { PageContent } from '@components/PageContent'
import type { PrismicDocument } from '@prismicio/client'
import type { Slice } from '@slices'
import { SliceZone } from '@slices'

interface Props {
  post: PrismicDocument
}

export function BlogPostPage({ post }: Props) {
  const title = (post.data.title as string) || 'Blog Post'
  const author = post.data.author as string | undefined
  const slices = (post.data.slices || []) as Slice[]

  const publishedDate = post.first_publication_date
    ? new Date(post.first_publication_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  const modifiedDate = post.last_publication_date
    ? new Date(post.last_publication_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  const isUpdated = post.first_publication_date !== post.last_publication_date

  return (
    <PageContent>
      <div className="page-fade-in contain pt-24 pb-8 sm:pt-32 sm:pb-10 md:pb-12">
        <div className="mx-auto mt-4 mb-8 max-w-3xl sm:text-center">
          <h1 className="mb-4 font-extrabold text-2xl text-sushi-900 sm:text-5xl">{title}</h1>
          {isUpdated && modifiedDate ? (
            <span className="font-semibold text-base text-gray-700">
              Updated {modifiedDate}
              {author && ` by ${author}`}
            </span>
          ) : (
            publishedDate && (
              <span className="font-semibold text-base text-gray-700">
                Posted {publishedDate}
                {author && ` by ${author}`}
              </span>
            )
          )}
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="prose sm:prose-lg xl:prose-xl wrap-break-word w-full">
            {slices && <SliceZone slices={slices} />}
          </div>
        </div>
      </div>

      {/* Footer section with call to action */}
      <div className="bg-arctic-blue text-gray-800">
        <div className="contain">
          <div className="flex justify-center">
            {/* Call to action component will go here */}
            <div className="max-w-5xl">
              <h2>Start to Bank Green Today</h2>
            </div>
          </div>
        </div>
      </div>
    </PageContent>
  )
}
