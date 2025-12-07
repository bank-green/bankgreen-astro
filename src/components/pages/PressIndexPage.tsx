import { PageContent } from "@components/PageContent";
import type { PrismicDocument } from "@prismicio/client";

interface Props {
  releases: PrismicDocument[];
}

export function PressIndexPage({ releases }: Props) {
  return (
    <PageContent>
      <article>
        <header>
          <h1>Stories about Bank.Green</h1>
        </header>

        <section>
          <h2>Media Contact</h2>
          <p>Email: <a href="mailto:hello@bank.green">hello@bank.green</a></p>
        </section>

        <section>
          <h2>Press Releases</h2>
          {releases.length > 0 ? (
            <ul>
              {releases.map((release) => (
                <li key={release.uid}>
                  <article>
                    <time dateTime={release.first_publication_date || undefined}>
                      {new Date(release.first_publication_date || "").toLocaleDateString()}
                    </time>
                    <h3>
                      <a href={`/press/${release.uid}`}>{release.data.title}</a>
                    </h3>
                    {/* Excerpt */}
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <p>No press releases available.</p>
          )}
        </section>
      </article>
    </PageContent>
  );
}
