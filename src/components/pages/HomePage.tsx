import { PageContent } from "@components/PageContent";
import { SliceZone } from "@slices";
import type { PrismicDocument } from "@prismicio/client";

interface Props {
  page: PrismicDocument | null;
}

export function HomePage({ page }: Props) {
  const title = page?.data?.title || "Is your money being used to fund climate chaos?";

  return (
    <PageContent>
      <article>
        <section>
          <h1>{title}</h1>
          {/* Bank lookup form - will be a separate component */}
          <p>Check if your bank is funding fossil fuels</p>
        </section>

        <section>
          <h2>As Featured In</h2>
          {page?.data?.slices1 && <SliceZone slices={page.data.slices1} />}
        </section>

        <section>
          <h2>Why Bank.Green?</h2>
          {/* Rich text from page?.data?.description1, description2, etc. */}
        </section>

        <section>
          <h2>Start to Bank Green Today</h2>
          {/* LeadGen form */}
        </section>
      </article>
    </PageContent>
  );
}
