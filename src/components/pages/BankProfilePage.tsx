import { PageContent } from "@components/PageContent";

interface BankData {
  tag: string;
  name: string;
  // Add more fields as needed from GraphQL schema
}

interface Props {
  bank: BankData | null;
}

export function BankProfilePage({ bank }: Props) {
  const name = bank?.name || "Bank";
  const title = `${name} Review and Service Offering`;

  return (
    <PageContent>
      <article>
        <header>
          {/* Bank logo */}
          <h1>{title}</h1>
          <a href="/methodology">How we rate banks</a>
          {/* Last rated date */}
        </header>

        <section>
          <h2>Our Take</h2>
          {/* Editorial description */}
        </section>

        <nav>
          <ul>
            <li><a href="#overview">Overview</a></li>
            <li><a href="#personal">Personal</a></li>
            <li><a href="#nonprofit">Nonprofit</a></li>
            <li><a href="#government">Government</a></li>
            <li><a href="#smes">SMEs</a></li>
            <li><a href="#corporate">Corporate</a></li>
          </ul>
        </nav>

        <section id="overview">
          <h2>Overview</h2>
          <dl>
            <dt>Founded</dt>
            <dd>{/* Founded date */}</dd>

            <dt>Policies</dt>
            <dd>{/* Environmental Policy, Deposit Protection badges */}</dd>

            <dt>Customers Served</dt>
            <dd>{/* Retail/Individual, etc. */}</dd>

            <dt>Services</dt>
            <dd>{/* Mobile Banking, ATM Network, etc. */}</dd>

            <dt>Fees</dt>
            <dd>{/* Fee summary */}</dd>
          </dl>
        </section>

        <section id="personal">
          <h2>Personal Banking</h2>
          {/* Accounts, rates, fees, loans */}
        </section>

        <section id="nonprofit">
          <h2>Nonprofit Banking</h2>
        </section>

        <section id="government">
          <h2>Government Banking</h2>
        </section>

        <section id="smes">
          <h2>SME Banking</h2>
        </section>

        <section id="corporate">
          <h2>Corporate Banking</h2>
        </section>

        <section>
          <h2>Curious about switching to a green bank?</h2>
          {/* Lead generation form */}
        </section>
      </article>
    </PageContent>
  );
}
