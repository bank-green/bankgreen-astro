import { PageContent } from '@components/PageContent'
import { renderRichText } from '@lib/prismicHelpers'
import type { PrismicDocument, RichTextField } from '@prismicio/client'
import { SliceZone } from '@slices'
import { useState } from 'react'

interface Props {
  page: PrismicDocument | null
}

const TABS = ['Pressure', 'Switch', 'Share', 'Learn'] as const

export function TakeActionPage({ page }: Props) {
  const [selectedTab, setSelectedTab] = useState<(typeof TABS)[number]>('Pressure')

  const introduction = page?.data?.introduction as RichTextField | undefined
  const slices1 = page?.data?.slices1 // Pressure tab
  const slices2 = page?.data?.slices2 // Switch tab
  const slices3 = page?.data?.slices3 // Share tab
  const slices4 = page?.data?.slices4 // Learn tab

  const getSlicesForTab = () => {
    switch (selectedTab) {
      case 'Pressure':
        return slices1
      case 'Switch':
        return slices2
      case 'Share':
        return slices3
      case 'Learn':
        return slices4
      default:
        return null
    }
  }

  return (
    <PageContent>
      <article>
        <header className="prose sm:prose-lg xl:prose-xl mx-auto max-w-4xl xl:max-w-5xl">
          {introduction && introduction.length > 0 ? (
            renderRichText(introduction)
          ) : (
            <>
              <h2>Take action</h2>
              <p>
                Do you watch or read climate crisis news and think: "Ok, this is bad, but what now?
                What can I do about this?" We do too. Even this website, as it alerts you to the
                destructive cycle that our money is stuck in, might be making you feel overwhelmed
                and powerless. Well, no more! It's time to take action:
              </p>
            </>
          )}
        </header>

        {/* Tab navigation */}
        <nav>
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setSelectedTab(tab)}
              aria-selected={selectedTab === tab}
              data-selected={selectedTab === tab}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Tab content */}
        <section className="prose md:prose-lg px-4">
          {getSlicesForTab() ? <SliceZone slices={getSlicesForTab()} /> : <p>Content loading...</p>}
        </section>

        {/* Call to action */}
        <section>
          <h2>Start to Bank Green Today</h2>
          <a href="/sustainable-eco-banks">Move Your Money Today</a>
        </section>
      </article>
    </PageContent>
  )
}
