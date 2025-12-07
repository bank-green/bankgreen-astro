import { PageContent } from "@components/PageContent";
import { renderRichText } from "@lib/prismicHelpers";
import type { PrismicDocument, RichTextField } from "@prismicio/client";

interface Props {
  page: PrismicDocument | null;
}

export function EmbracePage({ page }: Props) {
  const title = (page?.data?.title as string) || "Encourage Real Policy Implementation!";
  const subtitle = (page?.data?.subtitle as string) || "Together for sustainability";
  const description1 = page?.data?.description1 as RichTextField | undefined;

  return (
    <PageContent>
      <article>
        <header>
          <h1>{title}</h1>
          <h3>{subtitle}</h3>

          {description1 && description1.length > 0 ? (
            renderRichText(description1)
          ) : (
            <p>Share your concerns and suggestions in the form below.</p>
          )}
        </header>

        <section>
          {/* Embrace form component will be implemented here */}
        </section>
      </article>
    </PageContent>
  );
}
