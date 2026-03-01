import { PageContent } from '@components/PageContent'
import { renderRichText } from '@lib/prismicHelpers'
import { Box, Stack } from '@mantine/core'
import type { PrismicDocument, RichTextField } from '@prismicio/client'
import { ContactForm } from '@/components/forms/ContactForm'
import { CornerLogoContainer } from '../CornerLogo'

interface Props {
  page: PrismicDocument | null
}

export function ContactPage({ page }: Props) {
  const description = page?.data?.description as RichTextField | undefined

  return (
    <PageContent fullWidth className="pb-16">
      <CornerLogoContainer className="mx-0 mt-8 p-8 pb-16 md:mx-8 lg:mx-0 lg:p-16">
        <Stack className="items-center justify-between gap-12 md:flex-row md:items-start">
          <Stack className="max-w-md gap-6 text-center md:text-left lg:basis-1/2 [&_p]:text-left lg:[&_p]:text-xl">
            {description && description.length > 0 && renderRichText(description)}
          </Stack>

          <Box className="mx-auto mb-16 w-full max-w-md">
            <ContactForm
              tag="contact page form"
              successRedirect="/thanks/contact"
              labels={{ submit: 'Send message' }}
              fields={{
                firstName: true,
                email: true,
                subject: true,
                message: true,
                isAgreeMarketing: true,
                isAgreeTerms: true,
              }}
            />
          </Box>
        </Stack>
      </CornerLogoContainer>
    </PageContent>
  )
}
