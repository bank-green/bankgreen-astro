import { PageContent } from "@components/PageContent";
import { SliceZone } from "@slices";
import type { PrismicDocument } from "@prismicio/client";

interface ThanksPageFallback {
  title: string;
  description?: string;
}

interface Props {
  page: PrismicDocument | null;
  fallback: ThanksPageFallback;
  pageType: string;
}

export function ThanksPage({ page, fallback, pageType }: Props) {
  const title = page?.data?.head_helper_title || fallback.title;
  const showExplore = pageType !== "donate-cancelled" && pageType !== "updates-no";

  return (
    <PageContent>
      <article>
        <header>
          <h1>{title}</h1>
          {fallback.description && <p>{fallback.description}</p>}
        </header>

        <section>
          {page?.data?.slices && <SliceZone slices={page.data.slices} />}
        </section>

        {showExplore && (
          <section>
            <h2>Explore More</h2>
            <ul>
              <li><a href="/sustainable-eco-banks">Find a sustainable bank</a></li>
              <li><a href="/blog">Read our blog</a></li>
              <li><a href="/take-action">Take action</a></li>
            </ul>
          </section>
        )}
      </article>
    </PageContent>
  );
}
