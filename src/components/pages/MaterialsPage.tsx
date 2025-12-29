import { PageContent } from '@components/PageContent'
import { asLinkHref, renderRichText } from '@lib/prismicHelpers'
import { Box, Button, Group, Image, Stack, Text, Title } from '@mantine/core'
import { DownloadSimpleIcon } from '@phosphor-icons/react'
import type { PrismicDocument } from '@prismicio/client'

interface MaterialsPageProps {
  page: PrismicDocument | null
}

export function MaterialsPage({ page }: MaterialsPageProps) {
  if (!page) {
    return (
      <PageContent>
        <Stack className="min-h-screen items-center justify-center bg-linear-to-b pt-36">
          <Text className="text-center text-xl">Content not available</Text>
        </Stack>
      </PageContent>
    )
  }

  const { title, description, url_1, button_1, url_2, button_2 } = page.data

  return (
    <PageContent>
      <Stack className="contain mt-16 text-center">
        <Title order={1}>{title || 'Thank you for your interest in our work.'}</Title>

        {description && (
          <Box className="mx-auto max-w-3xl">
            <Text className="text-center text-xl lg:text-2xl">{renderRichText(description)}</Text>
          </Box>
        )}

        <Group className="mx-auto flex-nowrap">
          {url_1 && (
            <Button
              component="a"
              href={asLinkHref(url_1) || '#'}
              target="_blank"
              rel="noopener"
              size="lg"
              leftSection={<DownloadSimpleIcon />}
              className="w-full"
            >
              {button_1 || 'One Pager'}
            </Button>
          )}

          {url_2 && (
            <Button
              component="a"
              href={asLinkHref(url_2) || '#'}
              target="_blank"
              rel="noopener"
              size="lg"
              leftSection={<DownloadSimpleIcon />}
              className="w-full"
            >
              {button_2 || 'Organizational Deck'}
            </Button>
          )}
        </Group>

        <Image src="/img/illustrations/dig.svg" className="mx-auto w-full max-w-3xl" />
      </Stack>
    </PageContent>
  )
}
