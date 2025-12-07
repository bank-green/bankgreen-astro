import { PageContent } from "@components/PageContent";
import type { PrismicDocument } from "@prismicio/client";

interface Props {
  page: PrismicDocument | null;
}

export function CertificationPage({ page }: Props) {
  return (
    <PageContent>
      <article>
        <header>
          <h1>Fossil Free Certification</h1>
          {/* Certification badge image */}
        </header>

        <section>
          <a href="/sustainable-eco-banks">View Alliance Members</a>
        </section>

        <section>
          <h2>Benefits of Certification</h2>
          <ul>
            <li>Attract customers and employees who care about climate</li>
            <li>Access networks of sustainable finance leaders</li>
            <li>Public relations benefits</li>
            <li>Join a movement for change</li>
          </ul>
        </section>

        <section>
          <h2>Steps to Certification</h2>
          <ol>
            <li><strong>Connect</strong> - Reach out to us</li>
            <li><strong>Submit</strong> - Provide documentation</li>
            <li><strong>Review</strong> - We assess your policies</li>
            <li><strong>Certify</strong> - Receive certification</li>
          </ol>
        </section>

        <section>
          <h2>Contact</h2>
          <p>Email: <a href="mailto:hello@bank.green">hello@bank.green</a></p>
        </section>

        <section>
          <h2>FAQ</h2>
          {/* AccordionSlice items from page?.data?.slices */}
        </section>
      </article>
    </PageContent>
  );
}
