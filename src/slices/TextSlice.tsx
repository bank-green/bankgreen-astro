/**
 * TextSlice - Renders rich text content from Prismic.
 *
 * Variations: default
 */

import { renderRichText } from '@lib/prismicHelpers'
import { Container } from '@mantine/core'
import type { TextSlice as TextSliceType } from './types'

interface Props {
  slice: TextSliceType
  className?: string
}

export function TextSlice({ slice, className }: Props) {
  return (
    <Container component="section" data-slice-type={slice.slice_type} className={className}>
      {renderRichText(slice.primary.text)}
    </Container>
  )
}
