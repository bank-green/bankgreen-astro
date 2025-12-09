import { PageContent } from '@components/PageContent'

interface BankData {
  tag: string
  name: string
  rating?: string
  // Add more fields as needed from GraphQL schema
}

interface Props {
  bank: BankData | null
}

export function BankScorePage({ bank }: Props) {
  const name = bank?.name || 'Bank'
  const title = `${name}'s Climate Score`

  return (
    <PageContent>
      <article>
        <header>
          <h1>{title}</h1>
          {/* Rating badge */}
          <a href="/methodology">How we rate banks</a>
          {/* Last rated date */}
        </header>

        {/* Conditional content based on rating - this shows BAD bank structure */}
        <section>
          <p>Your bank is failing on climate responsibility.</p>
          {/* Fossil fuel financing stats */}
        </section>

        <section>
          <h2>Move Your Money</h2>
          <a href="/sustainable-eco-banks">Find a sustainable bank</a>
        </section>

        <section>
          <h2>Detailed Financing Information</h2>
          {/* Specific financing activities */}
        </section>

        <section>
          <h2>The Paris Agreement</h2>
          <p>Explanation of climate goals and IPCC warnings.</p>
        </section>

        <section>
          <h2>Start to Bank Green Today</h2>
          <a href="/sustainable-eco-banks">Move Your Money Today</a>
        </section>

        <footer>
          <a href="/methodology">How do we derive our results?</a>
        </footer>
      </article>
    </PageContent>
  )
}
