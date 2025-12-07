import { PageContent } from "@components/PageContent";
import { SliceZone } from "@slices";
import type { PrismicDocument } from "@prismicio/client";

interface Props {
  page: PrismicDocument | null;
}

export function TeamAlumniPage({ page }: Props) {
  return (
    <PageContent>
      <article>
        <header>
          <h1>Team Alumni</h1>
        </header>

        <section>
          {page?.data?.slices && <SliceZone slices={page.data.slices} />}
        </section>

        <a href="/team">Back to Current Team</a>
      </article>
    </PageContent>
  );
}
