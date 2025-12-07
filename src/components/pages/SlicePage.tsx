import { PageContent } from "@components/PageContent";
import { SliceZone } from "@slices";
import type { PrismicDocument } from "@prismicio/client";
import type { ReactNode } from "react";

interface Props {
  /** Page title */
  title: string;
  /** Prismic page document */
  page: PrismicDocument | null;
  /** Optional intro content before slices */
  intro?: ReactNode;
  /** Optional content after slices */
  footer?: ReactNode;
}

/**
 * Generic page component for simple Prismic pages that primarily render slices.
 * Use this for pages like disclaimer, privacy, methodology, etc.
 */
export function SlicePage({ title, page, intro, footer }: Props) {
  const slices = page?.data?.slices;

  return (
    <PageContent>
      <article>
        <header>
          <h1>{title}</h1>
        </header>

        {intro}

        <section>
          {slices ? (
            <SliceZone slices={slices} />
          ) : (
            <p>Content loading...</p>
          )}
        </section>

        {footer}
      </article>
    </PageContent>
  );
}
