import { PageContent } from "@components/PageContent";
import { SliceZone } from "@slices";
import type { PrismicDocument } from "@prismicio/client";

interface Props {
  page: PrismicDocument | null;
}

export function TakeActionPage({ page }: Props) {
  return (
    <PageContent>
      <article>
        <header>
          <h1>Take Action!</h1>
        </header>

        <section>
          <p>You have the power to make a difference.</p>
        </section>

        <nav>
          <ul>
            <li><a href="#pressure">Apply Pressure</a></li>
            <li><a href="#switch">Switch Banks</a></li>
            <li><a href="#share">Share</a></li>
            <li><a href="#learn">Learn</a></li>
          </ul>
        </nav>

        <section id="pressure">
          <h2>Apply Pressure</h2>
          <p>Sign our pledge and start a conversation with fossil fuel banks.</p>
          {/* Pledge form */}

          <h3>Contact Methods</h3>
          <details>
            <summary>Make a phone call</summary>
            <p>Call your bank's customer service line.</p>
          </details>
          <details>
            <summary>Send an email or letter</summary>
            <p>Write to your bank expressing your concerns.</p>
          </details>
          <details>
            <summary>Visit a local branch</summary>
            <p>Speak with a representative in person.</p>
          </details>
        </section>

        <section>
          {page?.data?.slices && <SliceZone slices={page.data.slices} />}
        </section>

        <section>
          <h2>Start to Bank Green Today</h2>
          <a href="/sustainable-eco-banks">Move Your Money Today</a>
        </section>
      </article>
    </PageContent>
  );
}
