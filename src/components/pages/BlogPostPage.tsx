import { PageContent } from "@components/PageContent";
import { SliceZone } from "@slices";
import type { PrismicDocument } from "@prismicio/client";

interface Props {
  post: PrismicDocument;
}

export function BlogPostPage({ post }: Props) {
  const title = (post.data.title as string) || "Blog Post";
  const author = post.data.author as string | undefined;
  const slices = post.data.slices;

  const publishedDate = post.first_publication_date
    ? new Date(post.first_publication_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const modifiedDate = post.last_publication_date
    ? new Date(post.last_publication_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const isUpdated = post.first_publication_date !== post.last_publication_date;

  return (
    <PageContent>
      <article>
        <header>
          <h1>{title}</h1>
          {isUpdated && modifiedDate ? (
            <p>
              Updated {modifiedDate}
              {author && ` by ${author}`}
            </p>
          ) : (
            publishedDate && (
              <p>
                Posted {publishedDate}
                {author && ` by ${author}`}
              </p>
            )
          )}
        </header>

        <section>{slices && <SliceZone slices={slices} />}</section>

        <footer>
          <section>
            <h2>Start to Bank Green Today</h2>
            {/* Call to action / newsletter signup */}
          </section>
        </footer>
      </article>
    </PageContent>
  );
}
