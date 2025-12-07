import { PageContent } from "@components/PageContent";
import type { PrismicDocument } from "@prismicio/client";

interface Props {
  posts: PrismicDocument[];
}

export function BlogIndexPage({ posts }: Props) {
  return (
    <PageContent>
      <article>
        <header>
          <h1>Bank.Green Blog</h1>
          <p>Stories and Tips for Divesting From Fossil Fuels</p>
        </header>

        <section>
          {posts.length > 0 ? (
            <ul>
              {posts.map((post) => (
                <li key={post.uid}>
                  <article>
                    {/* Featured image */}
                    <time dateTime={post.first_publication_date || undefined}>
                      {new Date(post.first_publication_date || "").toLocaleDateString()}
                    </time>
                    <h2>
                      <a href={`/blog/${post.uid}`}>{post.data.title}</a>
                    </h2>
                    {/* Excerpt */}
                    <a href={`/blog/${post.uid}`}>Read full story</a>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <p>No blog posts available.</p>
          )}
        </section>
      </article>
    </PageContent>
  );
}
