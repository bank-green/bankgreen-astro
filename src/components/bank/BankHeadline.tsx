import { SafeHtml } from '@components/SafeHtml'
import { Typography } from '@mantine/core'

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
    <div className="col-span-2 md:col-span-1">
      <div className="mb-4 flex items-center gap-4">
        {logoUrl && (
          <img
            src={logoUrl}
            alt={`${name} logo`}
            className="h-12 w-12 rounded object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        )}
        <h1 className="font-bold text-3xl text-gray-800 md:text-5xl">{name}</h1>
      </div>

      {subtitle && (
        <Typography>
          <SafeHtml html={subtitle} className="text-gray-700 text-lg md:text-xl" />
        </Typography>
      )}

      {inheritBrandRating && (
        <p className="mt-4 text-gray-600 text-sm">
          This brand is rated based on{' '}
          <a href={`/banks/${inheritBrandRating.tag}`} className="underline hover:text-sushi-500">
            {inheritBrandRating.name}
          </a>
        </p>
      )}
    </div>
  )
}
