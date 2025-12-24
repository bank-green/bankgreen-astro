import { SafeHtml } from '@components/SafeHtml'
import { Anchor, Group, Stack, Text, Title } from '@mantine/core'
import BankLogo from './BankLogo'

interface BankHeadlineProps {
  name: string
  website?: string | null
  subtitle?: string
  inheritBrandRating?: {
    tag: string
    name: string
  } | null
}

export function BankHeadline({ name, website, subtitle, inheritBrandRating }: BankHeadlineProps) {
  const websiteUrl = website ? new URL(website).hostname : ''

  return (
    <Stack>
      <Group className="items-center gap-4">
        {websiteUrl && (
          <BankLogo brandDomain={websiteUrl} imgClass="rounded object-contain" size={64} />
        )}
        <Title order={3} className="mb-0 text-2xl text-sky-600 md:text-3xl">
          {name}
        </Title>
      </Group>

      {subtitle && (
        <Title order={4}>
          <SafeHtml html={subtitle} />
        </Title>
      )}

      {inheritBrandRating && (
        <Text>
          This brand is rated based on{' '}
          <Anchor href={`/banks/${inheritBrandRating.tag}`}>{inheritBrandRating.name}</Anchor>
        </Text>
      )}
    </Stack>
  )
}
