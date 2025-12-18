import { PageContent } from '@components/PageContent'
import type { PrismicDocument } from '@prismicio/client'
import { SliceZone } from '@slices'
import { Anchor, Box, Stack, Text, Title } from '@mantine/core'

interface Props {
  release: PrismicDocument
}

export function PressReleasePage({ release }: Props) {
  const title = (release.data.title as string) || 'Press Release'
  const author = release.data.author as string | undefined
  const email = release.data.email as string | undefined
  const phone = release.data.phone as string | undefined
  const releaseDate = release.data.releasedate as string | undefined
  const slices = release.data.slices

  return (
    <PageContent>
      <article>
        <header>
          <Title order={1} className="mb-6">
            {title}
          </Title>

          <Stack className="gap-6">
            {(author || email || phone) && (
              <Stack className="gap-2">
                <Text className="font-semibold">Contact</Text>
                {author && <Text>{author}</Text>}
                {email && (
                  <Text>
                    <Anchor href={`mailto:${email}`}>{email}</Anchor>
                  </Text>
                )}
                {phone && <Text>{phone}</Text>}
              </Stack>
            )}

            {releaseDate && (
              <Stack className="gap-2">
                <Text className="font-semibold">For immediate release</Text>
                <Text>{releaseDate}</Text>
              </Stack>
            )}
          </Stack>
        </header>

        <section>
          <Box className="prose sm:prose-lg xl:prose-xl w-full wrap-break-word">
            {slices && <SliceZone slices={slices} />}
          </Box>
        </section>

        <footer>
          <Title order={2}>About Bank.Green</Title>
          <Text>
            Contact: <Anchor href="mailto:hello@bank.green">hello@bank.green</Anchor>
          </Text>
        </footer>
      </article>
    </PageContent>
  )
}
