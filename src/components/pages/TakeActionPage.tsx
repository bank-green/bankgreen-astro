import { PageContent } from '@components/PageContent'
import { renderRichText } from '@lib/prismicHelpers'
import { Anchor, Loader, Stack, Tabs, Text, Title } from '@mantine/core'
import type { PrismicDocument, RichTextField } from '@prismicio/client'
import { SliceZone } from '@slices'

interface Props {
  page: PrismicDocument | null
}

export function TakeActionPage({ page }: Props) {
  const introduction = page?.data?.introduction as RichTextField | undefined
  const slices1 = page?.data?.slices1 // Pressure tab
  const slices2 = page?.data?.slices2 // Switch tab
  const slices3 = page?.data?.slices3 // Share tab
  const slices4 = page?.data?.slices4 // Learn tab

  return (
    <PageContent>
      <Stack>
        {introduction && introduction.length > 0 ? (
          renderRichText(introduction)
        ) : (
          <>
            <Title order={1}>Take action</Title>
            <Text>
              Do you watch or read climate crisis news and think: "Ok, this is bad, but what now?
              What can I do about this?" We do too. Even this website, as it alerts you to the
              destructive cycle that our money is stuck in, might be making you feel overwhelmed and
              powerless. Well, no more! It's time to take action:
            </Text>
          </>
        )}
      </Stack>

      <Tabs defaultValue="pressure">
        <Tabs.List>
          <Tabs.Tab value="pressure">Pressure</Tabs.Tab>
          <Tabs.Tab value="switch">Switch</Tabs.Tab>
          <Tabs.Tab value="share">Share</Tabs.Tab>
          <Tabs.Tab value="learn">Learn</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="pressure" className="prose md:prose-lg px-4">
          {slices1 ? <SliceZone slices={slices1} /> : <Loader />}
        </Tabs.Panel>

        <Tabs.Panel value="switch" className="prose md:prose-lg px-4">
          {slices2 ? <SliceZone slices={slices2} /> : <Loader />}
        </Tabs.Panel>

        <Tabs.Panel value="share" className="prose md:prose-lg px-4">
          {slices3 ? <SliceZone slices={slices3} /> : <Loader />}
        </Tabs.Panel>

        <Tabs.Panel value="learn" className="prose md:prose-lg px-4">
          {slices4 ? <SliceZone slices={slices4} /> : <Loader />}
        </Tabs.Panel>
      </Tabs>

      {/* Call to action */}
      <section>
        <Title order={2}>Start to Bank Green Today</Title>
        <Anchor href="/sustainable-eco-banks">Move Your Money Today</Anchor>
      </section>
    </PageContent>
  )
}
