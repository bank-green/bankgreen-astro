import { PageContent } from "@components/PageContent";
import { renderRichText } from "@lib/prismicHelpers";
import * as prismic from "@prismicio/client";
import type { PrismicDocument, RichTextField } from "@prismicio/client";

interface Props {
  page: PrismicDocument | null;
}

export function NotFoundPage({ page }: Props) {
  const text1 = page?.data?.text1 as RichTextField | undefined;
  const text2 = page?.data?.text2 as RichTextField | undefined;

  const text1Display = text1 && text1.length > 0 ? renderRichText(text1) : <h2>Page not Found</h2>;
  const text2Str = text2 ? prismic.asText(text2) : "Go Back";

  return (
    <PageContent>
      <article>
        <header>{text1Display}</header>

        <section>
          <a href="/">← {text2Str}</a>
        </section>
      </article>
    </PageContent>
  );
}
