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

  type TabData = {
    id: string
    slice: Array<{ slice_type: string; [key: string]: unknown }> | undefined
  }

  const slices: TabData[] = [
    { id: 'pressure', slice: page?.data?.slices1 },
    { id: 'switch', slice: page?.data?.slices2 },
    { id: 'share', slice: page?.data?.slices3 },
    { id: 'learn', slice: page?.data?.slices4 },
  ]

  const renderTabButton = (data: TabData) => (
    <Tabs.Tab value={data.id}>{data.id.charAt(0).toUpperCase() + data.id.slice(1)}</Tabs.Tab>
  )

  const renderTabPanel = (data: TabData) => (
    <Tabs.Panel value={data.id}>
      <Stack className="prose md:prose-lg px-4">
        {data.slice ? <SliceZone slices={data.slice} /> : <Loader />}
      </Stack>
    </Tabs.Panel>
  )

  return (
    <PageContent>
      <Stack className="gap-12">
        <Stack>
          {introduction && introduction.length > 0 ? (
            renderRichText(introduction)
          ) : (
            <>
              <Title order={1}>Take action</Title>
              <Text>
                Do you watch or read climate crisis news and think: "Ok, this is bad, but what now?
                What can I do about this?" We do too. Even this website, as it alerts you to the
                destructive cycle that our money is stuck in, might be making you feel overwhelmed
                and powerless. Well, no more! It's time to take action:
              </Text>
            </>
          )}
        </Stack>

        <Tabs defaultValue="pressure" variant="outline">
          <Tabs.List>{slices.map((slice) => renderTabButton(slice))}</Tabs.List>
          {slices.map((slice) => renderTabPanel(slice))}
        </Tabs>

        {/* Call to action */}
        <section>
          <Title order={2}>Start to Bank Green Today</Title>
          <Anchor href="/sustainable-eco-banks">Move Your Money Today</Anchor>
        </section>
      </Stack>
    </PageContent>
  )
}
