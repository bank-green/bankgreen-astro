import { PageContent } from "@components/PageContent";
import { SliceZone } from "@slices";
import { renderRichText } from "@lib/prismicHelpers";
import type { PrismicDocument, RichTextField } from "@prismicio/client";

interface Props {
  page: PrismicDocument | null;
}

export function FaqPage({ page }: Props) {
  const introduction = page?.data?.introduction as RichTextField | undefined;
  const slices = page?.data?.slices;

  return (
    <PageContent>
      <article>
        <header>
          {introduction && introduction.length > 0 ? (
            renderRichText(introduction)
          ) : (
            <h1>Frequently Asked Questions</h1>
          )}
        </header>

        <section>
          {slices ? <SliceZone slices={slices} /> : <p>Error loading content.</p>}
        </section>

        <section>
          <h2>Take Action with Bank.Green</h2>
          {/* Newsletter signup form placeholder */}
        </section>
      </article>
    </PageContent>
  );
}
