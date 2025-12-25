/**
 * ImageSlice - Renders an image with optional caption.
 *
 * Variations: default
 */

import { renderRichText } from '@lib/prismicHelpers'
import { Image, Stack, Text } from '@mantine/core'
import type { ImageSlice as ImageSliceType } from './types'

interface Props {
  slice: ImageSliceType
  className?: string
}

export function ImageSlice({ slice, className }: Props) {
  const { image, caption } = slice.primary

  return (
    <Stack
      component="figure"
      data-slice-type={slice.slice_type}
      align="center"
      className={`m-0 ${className}`}
    >
      {image?.url && <Image src={image.url} alt={image.alt || ''} style={{ maxWidth: '100%' }} />}
      {caption && (
        <Text component="figcaption" ta="center" size="sm">
          {renderRichText(caption)}
        </Text>
      )}
    </Stack>
  )
}
