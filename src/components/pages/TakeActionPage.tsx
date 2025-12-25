import { PageContent } from '@components/PageContent'
import { renderRichText } from '@lib/prismicHelpers'
import { Anchor, Loader, Stack, Tabs, Title } from '@mantine/core'
import type { PrismicDocument, RichTextField } from '@prismicio/client'
import type { Slice } from '@slices'
import { SliceZone } from '@slices'

interface Props {
  page: PrismicDocument | null
}

export function TakeActionPage({ page }: Props) {
  const introduction = page?.data?.introduction as RichTextField | undefined

  type TabData = {
    id: string
    slice: Slice[]
  }

  const slices: TabData[] = [
    { id: 'pressure', slice: (page?.data?.slices1 || []) as Slice[] },
    { id: 'switch', slice: (page?.data?.slices2 || []) as Slice[] },
    { id: 'share', slice: (page?.data?.slices3 || []) as Slice[] },
    { id: 'learn', slice: (page?.data?.slices4 || []) as Slice[] },
  ]

  const renderTabButton = (data: TabData) => (
    <Tabs.Tab key={data.id} value={data.id}>
      {data.id.charAt(0).toUpperCase() + data.id.slice(1)}
    </Tabs.Tab>
  )

  const renderTabPanel = (data: TabData) => (
    <Tabs.Panel value={data.id} key={data.id}>
      <Stack className="px-4 py-8">
        {data.slice ? <SliceZone slices={data.slice} /> : <Loader />}
      </Stack>
    </Tabs.Panel>
  )

  return (
    <PageContent>
      <Stack className="gap-12">
        <Stack className="[&_h3]:text-4xl [&_p]:m-0 [&_p]:text-lg">
          {introduction && introduction.length > 0 && renderRichText(introduction)}
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
