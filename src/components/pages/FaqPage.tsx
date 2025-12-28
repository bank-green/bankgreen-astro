import { PageContent } from '@components/PageContent'
import { renderRichText } from '@lib/prismicHelpers'
import { Stack } from '@mantine/core'
import type { PrismicDocument, RichTextField } from '@prismicio/client'
import type { Slice } from '@slices'
import { SliceZone } from '@slices'
import ContactFormContainer from '../forms/ContactFormContainer'

interface Props {
  page: PrismicDocument | null
}

export function FaqPage({ page }: Props) {
  const introduction = page?.data?.introduction as RichTextField | undefined
  const slices = (page?.data?.slices || []) as Slice[]

  return (
    <PageContent fullWidth>
      <Stack data-breakout>
        <Stack className="contain gap-8 bg-white p-8 lg:rounded-2xl">
          {introduction && introduction.length > 0 && renderRichText(introduction)}
          <Stack>{slices ? <SliceZone slices={slices} /> : <p>Error loading content.</p>}</Stack>
        </Stack>

        <ContactFormContainer
          title="Take action with Bank.Green"
          tag="FAQ bottom"
          successRedirect="/thanks"
          labels={{ submit: 'Join the Money Movement' }}
          className="my-18"
          fields={{
            firstName: true,
            email: true,
            bank: false,
            subject: false,
            message: false,
            status: false,
            isAgreeMarketing: true,
            isAgreeTerms: true,
          }}
        />
      </Stack>
    </PageContent>
  )
}
