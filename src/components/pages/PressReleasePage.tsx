import { PageContent } from "@components/PageContent";
import { SliceZone } from "@slices";
import type { PrismicDocument } from "@prismicio/client";

interface Props {
  release: PrismicDocument;
}

export function PressReleasePage({ release }: Props) {
  const title = release.data.title || "Press Release";
  const slices = release.data.slices;

  return (
    <PageContent>
      <article>
        <header>
          <time dateTime={release.first_publication_date || undefined}>
            {new Date(release.first_publication_date || "").toLocaleDateString()}
          </time>
          <h1>{title}</h1>
        </header>

        <section>
          {slices && <SliceZone slices={slices} />}
        </section>

        <footer>
          <h2>About Bank.Green</h2>
          {/* About section */}
          <p>Contact: <a href="mailto:hello@bank.green">hello@bank.green</a></p>
        </footer>
      </article>
    </PageContent>
  );
}
