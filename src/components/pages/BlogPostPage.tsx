import { PageContent } from "@components/PageContent";
import { SliceZone } from "@slices";
import type { PrismicDocument } from "@prismicio/client";

interface Props {
  post: PrismicDocument;
}

export function BlogPostPage({ post }: Props) {
  const title = post.data.title || "Blog Post";
  const slices = post.data.slices;

  return (
    <PageContent>
      <article>
        <header>
          {/* Featured image */}
          <h1>{title}</h1>
          <time dateTime={post.first_publication_date || undefined}>
            {new Date(post.first_publication_date || "").toLocaleDateString()}
          </time>
          {/* Author if available */}
        </header>

        <section>
          {slices && <SliceZone slices={slices} />}
        </section>

        <footer>
          <section>
            <h2>Start to Bank Green Today</h2>
            {/* Newsletter signup or action buttons */}
          </section>
        </footer>
      </article>
    </PageContent>
  );
}
