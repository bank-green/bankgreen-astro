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
      style={{ maxWidth: '100%' }}
      className={className}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Container>
  )
}
