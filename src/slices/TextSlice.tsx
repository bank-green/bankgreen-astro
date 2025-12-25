/**
 * TextSlice - Renders rich text content from Prismic.
 *
 * Variations: default
 */

import { renderRichText } from '@lib/prismicHelpers'
import { Stack } from '@mantine/core'
import type { TextSlice as TextSliceType } from './types'

interface Props {
  slice: TextSliceType
  className?: string
}

export function TextSlice({ slice, className }: Props) {
  return (
    <Stack component="section" data-slice-type={slice.slice_type} className={`gap-6 ${className}`}>
      {renderRichText(slice.primary.text)}
    </Stack>
  )
}
