/**
 * EmbedSlice - Renders embedded content (YouTube, Instagram, etc.)
 *
 * Variations: default
 */
import { Container } from '@mantine/core'
import type { EmbedSlice as EmbedSliceType } from './types'

interface Props {
  slice: EmbedSliceType
  className?: string
}

/**
 * Sanitizes embed HTML content for safe rendering.
 * Prismic oEmbed content is from trusted providers (YouTube, Vimeo, etc.)
 * and has already been validated by Prismic, so we only do basic safety checks.
 */
function sanitizeEmbedHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, 'data-removed=')
}

export function EmbedSlice({ slice, className }: Props) {
  const embed = slice.primary.target

  if (!embed?.html) {
    return null
  }

  // Make YouTube embeds responsive by replacing fixed dimensions
  let html = embed.html
  if (embed.provider_name === 'YouTube') {
    html = html.replace(/width="\d+"/, 'width="100%"').replace(/height="\d+"/, 'height="100%"')
  }

  return (
    <Container
      component="figure"
      data-slice-type={slice.slice_type}
      data-provider={embed.provider_name}
      className={`w-full ${className}`}
    >
      <div className="relative aspect-video w-full">
        <div
          className="absolute inset-0 [&_iframe]:h-full [&_iframe]:w-full"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Sanitized embed content from Prismic oEmbed
          dangerouslySetInnerHTML={{ __html: sanitizeEmbedHtml(html) }}
        />
      </div>
    </Container>
  )
}
