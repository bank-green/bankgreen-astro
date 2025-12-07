import { PageContent } from "@components/PageContent";
import { SliceZone } from "@slices";
import type { PrismicDocument } from "@prismicio/client";

interface Props {
  page: PrismicDocument | null;
}

export function TeamAlumniPage({ page }: Props) {
  // Filter slices1 for Alumni department members
  const alumniSlices = page?.data?.slices1?.filter(
    (slice: { primary?: { department?: string } }) => slice.primary?.department === "Alumni"
  ) || [];

  return (
    <PageContent>
      <article>
        <header>
          <h1>Our Alumni Members</h1>
        </header>

        <section>
          {alumniSlices.length > 0 ? (
            <SliceZone slices={alumniSlices} />
          ) : (
            <p>No alumni members to display.</p>
          )}
        </section>

        <footer>
          <a href="/team">Back to Current Contributors</a>
        </footer>
      </article>
    </PageContent>
  );
}
