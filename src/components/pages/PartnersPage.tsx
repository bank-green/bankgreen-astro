import { PageContent } from "@components/PageContent";
import type { PrismicDocument } from "@prismicio/client";

interface Props {
  page: PrismicDocument | null;
}

export function PartnersPage({ page }: Props) {
  return (
    <PageContent>
      <article>
        <header>
          <h1>Our Partners</h1>
        </header>

        <section>
          <p>Below is a list of our amazing partners who share our mission.</p>
        </section>

        <section>
          <ul>
            <li><a href="https://www.banktrack.org/" rel="noopener noreferrer" target="_blank">BankTrack</a></li>
            <li><a href="https://reclaimfinance.org/" rel="noopener noreferrer" target="_blank">Reclaim Finance</a></li>
            <li><a href="https://rebellion.global/" rel="noopener noreferrer" target="_blank">Extinction Rebellion</a></li>
            {/* Additional partners from Prismic */}
          </ul>
        </section>

        <section>
          {/* Newsletter signup form */}
        </section>
      </article>
    </PageContent>
  );
}
