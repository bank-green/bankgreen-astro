import { PageContent } from "@components/PageContent";
import type { PrismicDocument } from "@prismicio/client";

interface Props {
  page: PrismicDocument | null;
}

export function VolunteersPage({ page }: Props) {
  return (
    <PageContent>
      <article>
        <header>
          <h1>Volunteering at Bank.Green</h1>
        </header>

        <section>
          <p>Bank.Green is a volunteer-led organization.</p>
          <p>Contact: <a href="mailto:volunteers@bank.green">volunteers@bank.green</a></p>
        </section>

        <section>
          <h2>Open Roles</h2>
          <ul>
            <li>
              <h3>Business Accreditation Program Volunteer</h3>
              <p>5-10 hours per week</p>
            </li>
            <li>
              <h3>Data Scientist</h3>
              <p>Hours vary</p>
            </li>
            <li>
              <h3>Front-End Engineers</h3>
              <p>10-20 hours per week</p>
            </li>
            <li>
              <h3>Content Writer</h3>
              <p>3+ hours per week</p>
            </li>
          </ul>
        </section>

        <section>
          <p>To apply, email your CV and availability to <a href="mailto:volunteers@bank.green">volunteers@bank.green</a></p>
        </section>
      </article>
    </PageContent>
  );
}
