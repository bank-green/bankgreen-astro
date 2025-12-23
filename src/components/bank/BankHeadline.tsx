import { SafeHtml } from '@components/SafeHtml'
import { Anchor, Group, Stack, Text, Title } from '@mantine/core'

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
  const logoUrl = `https://cdn.brandfetch.io/${websiteUrl}/icon/fallback/lettermark/h/112/w/112`

  return (
    <Stack>
      <Group className="items-center gap-4">
        {logoUrl && (
          <img
            src={logoUrl}
            alt={`${name} logo`}
            className="h-16 w-16 rounded border border-borderDefault object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
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
