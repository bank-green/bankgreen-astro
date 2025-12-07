import { PageContent } from "@components/PageContent";
import { SliceZone } from "@slices";
import type { PrismicDocument } from "@prismicio/client";

interface Props {
  page: PrismicDocument | null;
}

export function TeamPage({ page }: Props) {
  return (
    <PageContent>
      <article>
        <header>
          <h1>Bank.Green Team - Who We Are</h1>
        </header>

        <section>
          <h2>Our Story</h2>
          {/* Origin story content */}
        </section>

        <section>
          <h2>Our Directors</h2>
          {/* Director cards - will come from slices */}
        </section>

        <section>
          <h2>Meet the Team</h2>
          {/* Department filter */}
          <nav>
            <ul>
              <li><button type="button">All</button></li>
              <li><button type="button">Product & Engineering</button></li>
              <li><button type="button">Content</button></li>
              <li><button type="button">Research</button></li>
              <li><button type="button">Development</button></li>
            </ul>
          </nav>
          {/* Team member cards from slices */}
          {page?.data?.slices && <SliceZone slices={page.data.slices} />}
        </section>

        <a href="/team/alumni">View Alumni</a>
      </article>
    </PageContent>
  );
}
