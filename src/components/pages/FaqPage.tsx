import { PageContent } from "@components/PageContent";
import { SliceZone } from "@slices";
import type { PrismicDocument } from "@prismicio/client";

interface Props {
  page: PrismicDocument | null;
}

export function FaqPage({ page }: Props) {
  const introduction = page?.data?.introduction;
  const slices = page?.data?.slices;

  return (
    <PageContent>
      <article>
        <header>
          {introduction ? (
            // TODO: Use Mantine Typography components
            <div>{/* Rich text rendering */}</div>
          ) : (
            <h1>Frequently Asked Questions</h1>
          )}
        </header>

        <section>
          {slices ? (
            <SliceZone slices={slices} />
          ) : (
            <p>Content loading...</p>
          )}
        </section>

        <section>
          <h2>Take Action with Bank.Green</h2>
          {/* Newsletter signup form */}
        </section>
      </article>
    </PageContent>
  );
}
