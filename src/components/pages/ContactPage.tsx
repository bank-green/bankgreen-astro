import { PageContent } from '@components/PageContent'
import { renderRichText } from '@lib/prismicHelpers'
import { Box, Button, Checkbox, Stack, Textarea, TextInput } from '@mantine/core'
import type { PrismicDocument, RichTextField } from '@prismicio/client'
import { CornerLogoContainer } from '../CornerLogo'

interface Props {
  page: PrismicDocument | null
}

export function ContactPage({ page }: Props) {
  const description = page?.data?.description as RichTextField | undefined

  return (
    <PageContent fullWidth>
      <CornerLogoContainer className="mx-0 mt-8 p-8 pb-16 md:mx-8 lg:mx-0 lg:p-16">
        <Stack className="items-center justify-between gap-12 md:flex-row md:items-start">
          <Stack className="max-w-md gap-6 text-center md:text-left lg:basis-1/2 [&_p]:text-left lg:[&_p]:text-xl">
            {description && description.length > 0 && renderRichText(description)}
          </Stack>

          <Box className="mx-auto w-full max-w-md">
            <form onSubmit={(e) => e.preventDefault()}>
              <Stack>
                <TextInput
                  label="Your first name (optional)"
                  id="firstName"
                  name="firstName"
                  placeholder="First name, so we can say hi"
                />

                <TextInput
                  label="Your email address"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email address"
                  required
                />

                <TextInput
                  label="Subject"
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                  required
                />

                <Textarea
                  label="Your message"
                  id="message"
                  name="message"
                  placeholder="Your message"
                  rows={3}
                  required
                />

                <Checkbox
                  name="isAgreeMarketing"
                  label="I wish to receive more information via email from Bank.Green."
                />

                <Checkbox
                  name="isAgreeTerms"
                  label={
                    <>
                      I have read and understood Bank.Green's <a href="/privacy">privacy policy</a>.
                    </>
                  }
                  required
                />

                <Button type="submit">Send message</Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </CornerLogoContainer>
    </PageContent>
  )
}
