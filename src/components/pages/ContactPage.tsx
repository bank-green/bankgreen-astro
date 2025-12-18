import { PageContent } from '@components/PageContent'
import { renderRichText } from '@lib/prismicHelpers'
import { Button, Checkbox, Stack, TextInput, Textarea } from '@mantine/core'
import type { PrismicDocument, RichTextField } from '@prismicio/client'

interface Props {
  page: PrismicDocument | null
}

export function ContactPage({ page }: Props) {
  const description = page?.data?.description as RichTextField | undefined

  return (
    <PageContent>
      <article>
        <header>
          {description && description.length > 0 ? (
            renderRichText(description)
          ) : (
            <>
              <h1>Contact us</h1>
              <p>
                Unfortunately we are not currently accepting requests to research new banks, but we
                encourage you to <a href="/take-action">reach out to your own bank</a> to establish
                whether or not they are financing fossil fuels.{' '}
                <a href="/volunteers">You can also volunteer</a> 😄
              </p>
            </>
          )}
        </header>

        <section>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack gap="md">
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
                    I have read and understood Bank.Green's{' '}
                    <a href="/privacy">privacy policy</a>.
                  </>
                }
                required
              />

              <Button type="submit" fullWidth>
                Send message
              </Button>
            </Stack>
          </form>
        </section>
      </article>
    </PageContent>
  )
}
